import React from 'react';
import ReactDOM from 'react-dom'

import { Route, Link, MemoryRouter as Router, Switch, Redirect } from 'react-router-dom'

import './main.css';

import App from './App';
import CreateArticle from './CreateArticle'
import ViewArticle from './ViewArticle'
import ArticleIndex from './ArticleIndex'
import NotFound from './notfound';
import { createBrowserHistory } from 'history';

const routing = (
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
				<Route path="/notfound" component={NotFound} />
			</Switch>
		</div>
	</Router>
)



ReactDOM.render(routing, document.getElementById('main'));
