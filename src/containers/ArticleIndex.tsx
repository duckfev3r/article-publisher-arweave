import React from 'react';
import ApiService from '../services/ApiService'
import ArticleListCard from '../components/ArticleListCard';
import './ArticleIndex.css'
import CachingService from '../services/CachingService';
import LoadingComponent from '../components/LoadingComponent';
import ErrorComponent from '../components/ErrorComonent';

type State = {
	list: any[],
	err: any
}

class ArticleIndex extends React.Component {
	state: State
	api: ApiService
	cache: CachingService

	constructor(props: any) {
		super(props)

		this.api = new ApiService
		this.cache = new CachingService

		this.state = {
			list: [],
			err: ''
		}
	}

	async getArticles() {
		const cachedDocuments = this.cache.getDocument('index')
		if (cachedDocuments) {
			this.setState({ list: cachedDocuments })
		}
		this.api.getAllArticles().then((articles: any) => {
			console.log(articles)
			articles = articles.sort((a: any, b: any) => {
				return b.unixTime - a.unixTime
			})
			if (articles.tx_status && articles.tx.status.status !== 200) {
				throw (articles.tx_status.status)
			}
			this.setState({ list: articles })
			this.cache.setDocument('index', articles)
		}).catch((err: any) => {
			this.setState({ err })
		})
	}

	render() {
		const { list, err } = this.state
		return (
			list.length ?
				list.map((article: any) => {
					return (
						<div
							key={article.id}
							className='list-card'
						>
							<ArticleListCard
								article={article}
							/>
						</div>
					)
				})
				:
				err.message ?
					<ErrorComponent message={err.message}/>
					:
					<LoadingComponent message={'Loading Articles...'} />
		)
	}
}

export default ArticleIndex

