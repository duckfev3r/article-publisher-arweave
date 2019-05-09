import INavLink from "../../types/types";
import ArticleIndex from "../../containers/ArticleIndex";
import CreateArticle from "../../containers/CreateArticle";
import ViewArticle from "../../containers/ViewArticle";

const navLinks: INavLink[] = [
	{
		link: '/',
		title: 'Explore',
		component: ArticleIndex,
		id: 1
	},
	{
		link: '/create',
		title: 'Create',
		component: CreateArticle,
		id: 2
	},
	{
		link: 'view',
		title: 'View Article',
		component: ViewArticle,
		id: 3
	}
]

export default navLinks