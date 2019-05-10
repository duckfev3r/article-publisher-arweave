import INavLink from "../../types/types";
import ArticleIndex from "../../containers/ArticleIndex";
import CreateArticle from "../../containers/CreateArticle";
import ViewArticle from "../../containers/ViewArticle";

const navLinks: INavLink[] = [
	{
		link: '/',
		title: 'Create',
		component: CreateArticle,
		id: 2
	},
	{
		link: '/explore',
		title: 'Explore',
		component: ArticleIndex,
		id: 1
	},
	{
		link: 'view',
		title: 'View',
		component: ViewArticle,
		id: 3
	}
]

export default navLinks