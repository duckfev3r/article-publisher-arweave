import React from 'react';
import ApiService from '../services/ApiService'
import ArticleListCard from '../components/ArticleListCard';
import './ArticleIndex.css'
import CachingService from '../services/CachingService';
import LoadingComponent from '../components/common/LoadingComponent';
import ErrorComponent from '../components/common/ErrorComonent';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type State = {
	list: any[],
	err: any
}

class ArticleIndex extends React.Component <RouteComponentProps<{tag?: string}>> {
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

	componentDidUpdate(prevProps: any) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.getArticles(this.props.match.params.tag);
        }
    }

	componentDidMount() {
		this.getArticles(this.props.match.params.tag || null);
	}

	async getArticles(tag: string|null) {

		this.setState({ list: [] })

		const cacheKey = tag ? `tag-${tag}` : 'index';

		const cachedDocuments = this.cache.getDocument(cacheKey)

		if (cachedDocuments) {
			this.setState({ list: cachedDocuments })
		}		
		
		(tag
			? this.api.getArticlesByTag(tag)
			: this.api.getAllArticles()
		)
		.then((articles: any) => {
			articles = articles.sort((a: any, b: any) => {
				return b.unixTime - a.unixTime
			})
			if (articles.tx_status && articles.tx.status.status !== 200) {
				throw (articles.tx_status.status)
			}
			this.setState({ list: articles })
			this.cache.setDocument(cacheKey, articles)
		}).catch((err: any) => {
			this.setState({ err })
		})
	}

	render() {
		const { list, err } = this.state;

		const exploreTag = (tag: string) => {
			this.props.history.push(`/explore/${tag}`);
		};

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
								onTagClick={exploreTag}
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

export default withRouter(ArticleIndex)

