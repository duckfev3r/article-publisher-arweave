import React from 'react';
import ReactDOM from 'react-dom'

import { Route, Link, MemoryRouter as Router, Switch, Redirect } from 'react-router-dom'

import './main.css';

import navLinks from './components/navigation/navLinks'

import CreateArticle from './containers/CreateArticle'
import ViewArticle from './containers/ViewArticle'
import ArticleIndex from './containers/ArticleIndex'
import Header from './components/navigation/Header';


const routing = (
	<Router>
		<div>
			<Header navLinks={navLinks}/>
			<Switch>
				<Route exact path="/" component={CreateArticle} />
				<Route path="/create" component={ArticleIndex} />
				<Route path="/view" component={ViewArticle} />
			</Switch>
		</div>
	</Router>
)


ReactDOM.render(routing, document.getElementById('main'));
