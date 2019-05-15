import React from 'react';
import ReactDOM from 'react-dom'
import { Route, Link, MemoryRouter as Router, Switch, Redirect } from 'react-router-dom'

import './main.css';

import navLinks from './components/navigation/navLinks'
import Header from './components/navigation/Header';

const routing = (

	// const navLinks: INavLink[] = [
	// 	{
	// 		link: '/create',
	// 		title: 'Create',
	// 		component: CreateArticle,
	// 		id: 2
	// 	},
	// 	{
	// 		link: '/',
	// 		title: 'Explore',
	// 		component: ArticleIndex,
	// 		id: 1
	// 	},
	// 	{
	// 		link: '/view:id',
	// 		title: 'View',
	// 		component: ViewArticle,
	// 		id: 3
	// 	}
	// ]
	<Router>
		<div>
			<Header navLinks={navLinks} />
			<Switch>

				{
					navLinks.map((link, index) => {
						return (
							link.link === '/' ?
								<Route exact path={link.link} key={link.link} component={link.component} /> :
								<Route path={link.link} key={link.link} component={link.component} />
						)
					})
				}
			</Switch>
		</div>
	</Router>
)

ReactDOM.render(routing, document.getElementById('main'));
