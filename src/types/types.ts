import { RouteComponentProps } from "react-router-dom";

export default interface INavLink {
	link: string
	title: string
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
	id: number
}

export interface IComposedArticle {
	meta: IArticleMeta
	content: IArticleContent
}

export interface IArticleMeta {
	tags: IArticleTag[]
	synopsis: string
	uniqueId: string
}

export interface IArticleContent {
	title: string
	tagline: string
	body: string
	featuredImg?: IArticleImg
}

export interface IArticleTag {
	key: string,
	value: string
}

export interface IArticleImg {
	title: string
	alt: string
	url: string
}