import INavLink from "../../types/types";
import ArticleIndex from "../../containers/ArticleIndex";
import CreateArticle from "../../containers/CreateArticle";
import ViewArticle from "../ViewArticle";

const navLinks: INavLink[] = [
	{
		link: '/create',
		title: 'Create',
		component: CreateArticle,
		id: 2
	},
	{
		link: '/',
		title: 'Explore',
		component: ArticleIndex,
		id: 1
	},
	{
		link: '/view/:id',
		title: 'View',
		component: ViewArticle,
		id: 3
	}
]

export default navLinks