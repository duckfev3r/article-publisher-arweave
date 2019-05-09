export default interface INavLink {
	link: string
	title: string
	component: {}
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