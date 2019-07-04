import INavLink from "../../types/types";
import ArticleIndex from "../../containers/ArticleIndex";
import CreateArticle from "../../containers/CreateArticle";
import ViewArticle from "../ViewArticle";

const navLinks: INavLink[] = [
	{
		link: '/create',
		title: 'Create',
		component: CreateArticle,
		id: 2,
		nav: true
	},
	{
		link: '/',
		title: 'Explore',
		component: ArticleIndex,
		id: 1,
		nav: true
	},
	{
		link: '/explore/:tag',
		title: 'Explore tag',
		component: ArticleIndex,
		id: 4,
		nav: true
	},
	{
		link: '/view/:id',
		title: 'View',
		component: ViewArticle,
		id: 3,
		nav: false
	}
]

export default navLinks