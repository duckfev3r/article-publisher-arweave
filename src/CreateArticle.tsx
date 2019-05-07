import React, { ReactElement } from 'react';

/**
 * Create Article
 *
 * To-do :
 *
 * Decide on Data Structure for the Article
 *
 * Should probably consist of something like this :
 *
 * Title
 * Tagline
 * Featured Image
 * Tags : Category, Sub-Category
 * Content
 *
 * Related ?
 * Author ?
 */

export interface IComposeArticle {
	title: string,
	tagline: string,
	featuredImg: IArticleImg,
	tags: string[],
	content: string,
	uniqueId: string
}

export interface IArticleImg {
	title: string,
	alt: string,
	url: string
}


export default (): ReactElement => (
	<h1>Create Article</h1>
);
