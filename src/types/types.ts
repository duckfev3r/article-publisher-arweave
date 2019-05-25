import { RouteComponentProps } from "react-router-dom";

export default interface INavLink {
	link: string
	title: string
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
	id: number,
	nav: boolean
}

export interface IProfile {
	meta: IProfileMeta
	data: IProfileData
}

export type IArweaveTag = string

export interface IProfileData {
	banner: string
}

export interface IProfileMeta {
	pseudonym: string // 5 - 30 characters
	title: string // 4 - 60 characters
	about: string // 0 - 300 characters
	location: string // 0 - 60
	uniqueId: string // whatever this is (30 I think ???)
}

export type IProfileImgType = 'banner' | 'profile'

export interface IProfileImg {
	title: string
	alt: string
	url: string
}

export interface IInvalidField {
	title: string
	body: string
}