import { RouteComponentProps } from "react-router-dom";

export default interface INavLink {
	link: string
	title: string
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
	id: number
}

export interface IArticle {
	meta: IArticleMeta
	content: IArticleContent
}

export interface IArticleMeta {
	tags: ArticleTag[]
	synopsis: string
	uniqueId: string
}

export interface IArticleContent {
	title: string
	tagline: string
	body: string
	featuredImg?: IArticleImg
}

export type ArticleTag = string

export interface IArticleImg {
	title: string
	alt: string
	url: string
}

export interface IInvalidField {
	title: string
	body: string
}