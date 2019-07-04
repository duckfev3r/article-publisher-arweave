import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService'
import ReactHtmlParser from 'react-html-parser';
import LoadingComponent from './common/LoadingComponent'
import './viewArticle.css'
import ErrorComponent from './common/ErrorComonent';
import Chip from '@material-ui/core/Chip';
import { IArticleContent } from '../types/types';
import { RouteComponentProps, withRouter } from 'react-router-dom';

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
		<div className="page article-view">
			{
				articleData ?
					<div>
						<h1>
							{articleData.title}
						</h1>
						<div className='view-article-tagline'></div>
						<div>{ReactHtmlParser(articleData.body)}</div>
						<div>
						{articleData.tags.map((tag: any) => {
							return  <Chip
								key={tag.value}
								label={tag.toUpperCase()}
								className="chip"
								variant="outlined"
								onClick={() => { exploreTag(tag.toLowerCase()) }}
							/>
						})}
						</div>
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

export default withRouter(ViewArticle)