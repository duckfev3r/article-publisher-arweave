import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService'
import ReactHtmlParser from 'react-html-parser';
import LoadingComponent from './LoadingComponent'
import './viewArticle.css'
import ErrorComponent from './ErrorComonent';

const ViewArticle = (props: any) => {
	const { match } = props
	const api = new ApiService

	const [articleData, setArticleData] = useState()
	const [error, setError] = useState()

	useEffect(() => {
		api.getArticleData(match.params.id).then((data: any) => {
			setArticleData(data);
		}).catch(err => {
			setError(err)
		})
	}, []);

	return (
		<div className="page article-view">
			{
				articleData ?
					<div>
						<h1>
							{articleData.title}
						</h1>
						<div className='view-article-tagline'></div>
						<div>{ReactHtmlParser(articleData.body)}</div>
					</div>
					:
					error
						?
						<ErrorComponent message={error.message} />
						:
						<LoadingComponent message="Fetching your Article." />
			}
		</div>
	)

}

export default ViewArticle