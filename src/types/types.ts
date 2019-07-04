import { RouteComponentProps } from "react-router-dom";

export default interface INavLink {
	link: string
	title: string
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
	id: number,
	nav: boolean
}

export interface IArticle {
	meta: IArticleMeta
	content: IArticleContent
}

export type IArweaveTag = string

export interface IArticleMeta {
	tags: ArticleTag[]
	uniqueId: string
}

export interface IArticleContent {
	title: string
	tagline: string
	body: string
	stringBody?: string
	featuredImg?: IArticleImg
	tags?:string[]
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