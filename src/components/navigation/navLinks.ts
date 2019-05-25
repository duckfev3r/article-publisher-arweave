import INavLink from "../../types/types";

const navLinks: INavLink[] = [
	{
		link: '/update',
		title: 'Update',
		component: UpdateIdentity,
		id: 2,
		nav: true
	},
	{
		link: '/',
		title: 'Ipseity',
		component: LandingPage,
		id: 1,
		nav: true
	},
	{
		link: '/view/:id',
		title: 'View',
		component: ViewIdentity,
		id: 3,
		nav: false
	}
]

export default navLinks