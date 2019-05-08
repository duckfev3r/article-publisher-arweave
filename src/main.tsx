import React from 'react';
import ReactDOM from 'react-dom'

import { Route, Link, MemoryRouter as Router, Switch, Redirect } from 'react-router-dom'

import './main.css';

import CreateArticle from './CreateArticle'
import ViewArticle from './ViewArticle'
import ArticleIndex from './ArticleIndex'

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
				<Route exact path="/" component={CreateArticle} />
				<Route path="/create" component={ArticleIndex} />
				<Route path="/view" component={ViewArticle} />
			</Switch>
		</div>
	</Router>
)


ReactDOM.render(routing, document.getElementById('main'));
