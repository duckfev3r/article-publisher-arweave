import React from 'react';
import ApiService, { prefix } from '../services/ApiService'
import ArticleListCard from '../components/ArticleListCard';
import './ArticleIndex.css'

type State = {
	articles: any[]
}

class ArticleIndex extends React.Component {

	api: ApiService
	articles: any[]
	prefix: string
	state: State

	constructor(props: any) {
		super(props)

		this.api = new ApiService
		this.prefix = prefix

		this.state = {
			articles: []
		}
		this.getArticles()
	}

	async getArticles() {
		try {
			const articles: any = await this.api.getAllArticles()
			if (articles.tx_status && articles.tx_status.status !== 200) {
				throw (articles.tx_status.status)
			}
			this.setState({
				articles
			})
			console.log(articles)
		}
		catch (err) {
			this.setState({ articles: err })
			console.log('error', err)
		}
	}

	render() {
		const { articles } = this.state
		return (
			articles ?
				articles.map((article: any) => {
					return (
						<div
							key={article.id}
							className='list-card'>
							<ArticleListCard
								article={article}
							/>
						</div>
					)
				}) :
				null
			// <div></div>
		)
	}
}
export default ArticleIndex

