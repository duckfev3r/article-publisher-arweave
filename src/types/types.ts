import { RouteComponentProps } from "react-router-dom";

export default interface INavLink {
	link: string
	title: string
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
	id: number
}

export interface IComposeArticle {
	title: string
	tagline: string
	featuredImg: IArticleImg
	tags: string[]
	content: string
	uniqueId: string
}

export interface IArticleImg {
	title: string
	alt: string
	url: string
}