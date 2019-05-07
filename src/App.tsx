import React from 'react';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import CreateArticle from './CreateArticle';
import ViewArticle from './ViewArticle';
import ArticleIndex from './ArticleIndex';
import NotFound from './notfound';


/**
 * Medium Type Application
 *
 * Consists of 3 Views
 *
 * 1 - Create Article.
 * 2 - View Article.
 * 3 - List of Articles.
 *
 * 1 - Create Article
 *
 * TO-DO
 *
 * - Infrastructure
 *
 * LocalStorage Service.
 * API Service
 * Article Processing Service
 * Routing
 *
 * Redux
 */

// const AppRouter = (
// 	<Router>
// 		<div>
// 			<Route path="/" component={App} />
// 			<Route path="/create" component={CreateArticle} />
// 			<Route path="/view" component={ViewArticle} />
// 			<Route path="/index" component={ArticleIndex} />
// 		</div>
// 	</Router>
// )
function AppRouter() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Index</Link>
						</li>
						<li>
							<Link to="/create">Create Article</Link>
						</li>
						<li>
							<Link to="/view">View Article</Link>
						</li>
					</ul>
				</nav>
				<Switch>
					<Route exact path="/" component={ArticleIndex} />
					<Route path="/create" component={CreateArticle} />
					<Route path="/view" component={ViewArticle} />
					<Route component={NotFound} />
				</Switch>

			</div>
		</Router>
	);
}

export default AppRouter
