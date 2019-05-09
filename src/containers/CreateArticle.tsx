import React, { ReactElement } from 'react';

import ReactQuill from 'react-quill'; // Typescript
import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';

import '../main.css'
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

const modules = {
	toolbar: [
		[{ 'header': [1, 2, 3, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ 'list': 'ordered' }, { 'list': 'bullet' },
			// { 'indent': '-1' }, { 'indent': '+1' }
		],
		[
			// 'link',
			'image'
		],
		[{ 'align': [] }],
		['code-block'],
		['clean']                                         // remove formatting button
	],
}

const formats = [
	'header',
	'bold', 'italic', 'underline', 'strike', 'blockquote',
	'list', 'bullet',
	// 'indent',
	'link', 'image', 'align', 'code-block'
]

type Props = { text: string };
type State = { text: string };

class CreateArticle extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { text: '' } // You can also pass a Quill Delta here
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(value: any) {
		console.log(value)
		this.setState({ text: value })
	}

	render() {
		return (
			<ReactQuill
				theme="snow"
				value={this.state.text}
				onChange={this.handleChange}
				modules={modules}
				formats={formats}
			/>
		)
	}
}

export default CreateArticle