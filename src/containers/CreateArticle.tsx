import React, { ReactElement } from 'react';

import ReactQuill from 'react-quill'; // Typescript
import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';
import Button from '@material-ui/core/Button';

import '../main.css'
import CreateArticleStyles from './CreateArticleStyles'
import CreateArticleButtons from '../components/CreateArticleButtons';
// import Grow from '@material-ui/core/Grow/Grow';
import TextField from '@material-ui/core/TextField/TextField';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import KeyUploadComponent from '../components/KeyUploadComponent';
import ArticleForm from '../components/ArticleForm';
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

export interface Props extends WithStyles<typeof CreateArticleStyles> { }
type State = {
	title: string
	body: string
	keystore: any
};

class CreateArticle extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			title: '',
			body: '',
			keystore: ''
		}

		this.handleContentChange = this.handleContentChange.bind(this)
		this.handleKeystoreChange = this.handleKeystoreChange.bind(this)
	}

	private handleContentChange(value: any) {
		this.setState({ body: value })
	}

	private handleKeystoreChange(value: any) {
		const file = value.target.files[0]
		const fileReader = new FileReader()
		fileReader.onloadend = () => {
			let content = fileReader.result as string
			this.setState({
				keystore: JSON.parse(content)
			})
			console.log(this.state.keystore)
		}
		fileReader.readAsText(file)
	}

	render() {
		const { classes } = this.props
		const { keystore } = this.state

		return (
			<div className='page'>
				{
					!keystore ?
						<KeyUploadComponent callback={this.handleKeystoreChange} />
						:
						<div>
							<ArticleForm callback={this.handleContentChange} body={this.state.body} />
							<CreateArticleButtons />
						</div>

				}
			</div>
		)
	}
}

// export default CreateArticle

export default withStyles(CreateArticleStyles)(CreateArticle)
