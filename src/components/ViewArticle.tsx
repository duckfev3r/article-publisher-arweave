import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService'
import ReactHtmlParser from 'react-html-parser';
import CachingService from '../services/CachingService'
import LoadingComponent from './LoadingComponent'
import * as sanitize from 'sanitize-html'
import './viewArticle.css'

const ViewArticle = (props: any) => {
	const cache = new CachingService
	const { match } = props
	const api = new ApiService
	const [articleData, setArticleData] = useState()
	useEffect(() => {
		const cachedArticle = cache.getDocument(match.params.id)
		if (cachedArticle) {
			setArticleData(cachedArticle)
		} else {
			api.getArticleData(match.params.id).then((data: any) => {
				// const cleanData = sanitize(data)
				setArticleData(data);
				cache.setDocument(match.params.id, data)
			}).catch(err => {
				setArticleData(err)
			})
		}
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
						<div>{ ReactHtmlParser(articleData.body) }</div>
					</div>
					: <LoadingComponent message="Fetching your Article." />
			}
		</div>
	)

}

export default ViewArticle