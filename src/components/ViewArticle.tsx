import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService'
import ReactHtmlParser from 'react-html-parser';
import LoadingComponent from './common/LoadingComponent'
import './viewArticle.css'
import ErrorComponent from './common/ErrorComonent';
import { IArticleContent } from '../types/types';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import unixToDateTime from '../utils/datetime'
import { Link } from 'react-router-dom';

const ViewArticle = (props: RouteComponentProps<{id: string}>) => {
	const { match } = props
	const api = new ApiService
	

	const [articleData, setArticleData] = useState<IArticleContent|null>()
	const [error, setError] = useState()

	useEffect(() => {
		api.getArticleData(match.params.id).then((article: IArticleContent) => {
			setArticleData(article);
		}).catch(err => {
			setError(err)
		})
	}, []);

	const exploreTag = (tag: string) => {
		props.history.push(`/explore/${tag}`);
	};

	return (
		<div className="article-view">
			<div className="article-read-progress">

			</div>

			<div className="article-meta-links">
				{
					articleData ? <>


					<div className="article-info-section intro">

						<h1>
							{articleData.title}
						</h1>

						<span className="date">Jul 7th</span>
					</div>

					{/* <div className="article-info-section article-tags">
						{articleData.tags.map((tag: any, index: number) => {
							return <Link to={`/explore/${tag.toLowerCase()}`} className="tag" key={index}>
							#{tag.toUpperCase()}
						</Link>
						})}
					</div> */}

					<div className="id">
						<span className="label">Article ID</span>
						<span className="value">{match.params.id}</span>
					</div>

					</> : <></>
				}

			</div>
			<div className="article-content">
				{
					articleData ?
						<>

		

							<div className='view-article-tagline'></div>

							<div>{ReactHtmlParser(articleData.body)}</div>

							<div className="article-info">
								{/* <div className="article-info-section article-comments">
									<h2 className="comments-label">Replies</h2>
									<div className="comment">
										<div className="comment-from">
											
										</div>
										<div className="comment-meta">
											<span className="comment-date"></span><a className="comment-from" href=""></a>
										</div>
										<div className="comment-body">
											<p className="body">
											
											</p>
										</div>
									</div>
								</div> */}
							</div>
						</>
						:
						error
							?
							<ErrorComponent message={error.message} />
							:
							<LoadingComponent message="Fetching your Article." />
						}
			</div>

		</div>
	)

}

export default withRouter(ViewArticle)