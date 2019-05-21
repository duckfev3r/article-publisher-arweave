import React from 'react';
import ApiService from '../services/ApiService'
import ArticleListCard from '../components/ArticleListCard';
import './ArticleIndex.css'
import CachingService from '../services/CachingService';
import LoadingComponent from '../components/LoadingComponent';

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

	componentDidMount() {
		this.getArticles()
	}

	async getArticles() {
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
			this.setState({ err },
				() => {
					console.log(err.Error)
					console.log(typeof err)
					console.log(this.state.err)
					console.log(this.state)
				})
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
				}) : err.message ? <h1>{err.message}</h1> : <LoadingComponent message={'Loading Articles...'} />
		)
	}
}

export default ArticleIndex

