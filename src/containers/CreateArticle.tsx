import React, { ReactElement } from 'react';

import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';

import ApiService from '../services/ApiService'

import '../main.css'
import CreateArticleStyles from './CreateArticleStyles'
import CreateArticleButtons from '../components/CreateArticleButtons';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import KeyUploadComponent from '../components/KeyUploadComponent';
import ArticleForm from '../components/ArticleForm';

import Keystore from '../keystore'

import { IArticleContent, IArticleMeta, IArticle, IInvalidField } from '../types/types';
import ConfirmSendDialogue from '../components/ConfirmSendDialogue';
import InvalidFieldDialogue from '../components/InvalidFieldDialogue'
import AddTagsComponent from '../components/AddTagsComponent';
import TagsListComponent from '../components/TagsListComponent';

type Props = any

type State = {
	content: IArticleContent,
	meta: IArticleMeta
	keystore: any
	sendDialogueOpen: boolean
	invalidField: IInvalidField
	invalidFieldOpen: boolean
	tagField: string
};

class CreateArticle extends React.Component<Props, State> {
	api: ApiService
	quillEditor: any

	constructor(props: any) {
		super(props)

		this.state = {
			content: {
				title: '',
				body: '',
				stringBody:'',
				tagline: ''
			},
			meta: {
				tags: [],
				uniqueId: '',
			},
			invalidField: {
				title: '',
				body: '',
			},
			invalidFieldOpen: false,
			sendDialogueOpen: false,
			tagField: '',
			keystore: '',
		}

		this.api = new ApiService

		this.setupBindings()
	}

	// componentDidMount() {
	// 	this.setState({
	// 		keystore: Keystore
	// 	})
	// }

	setupBindings() {
		this.handleContentChange = this.handleContentChange.bind(this)
		this.handleKeystoreChange = this.handleKeystoreChange.bind(this)
		this.toggleSendDialogue = this.toggleSendDialogue.bind(this)
		this.sendDialogueConfirm = this.sendDialogueConfirm.bind(this)
		this.sendClicked = this.sendClicked.bind(this)
		this.toggleInvalidFieldDialogue = this.toggleInvalidFieldDialogue.bind(this)
		this.handleTitleChange = this.handleTitleChange.bind(this)
		this.removeTag = this.removeTag.bind(this)
		this.updateTagField = this.updateTagField.bind(this)
		this.handleTaglineChange = this.handleTaglineChange.bind(this)
	}

	handleContentChange(html: any) {
		const content = this.state.content
		content.body = html
		this.setState({
			content
		}, () => {
		})
	}

	bindQuillEditor(editor: any) {
		this.quillEditor = editor
	}

	async handleKeystoreChange(value: any) {
		const file = value.target.files[0]
		const fileReader = new FileReader()
		fileReader.onloadend = () => {
			let content = fileReader.result as string
			this.setState({
				keystore: JSON.parse(content)
			})
			// testTxn(JSON.parse(content))
		}
		fileReader.readAsText(file)
	}

	sendClicked() {
		// Validate Inputs
		if (!this.checkFields(this.state, this.quillEditor)) return
		this.toggleSendDialogue()
	}

	toggleSendDialogue() {
		const sendDialogueOpen = this.state.sendDialogueOpen ? false : true
		this.setState({
			sendDialogueOpen
		})
	}

	async sendDialogueConfirm() {
		const article: IArticle = {
			meta : this.state.meta,
			content : this.state.content
		}
		article.content.stringBody = this.quillEditor.getText()
		try {
			await this.api.postArticle(article, this.state.keystore)
			this.props.history.push('/')
		} catch(er) {
			// Need to display the error dialogue here
		}
		this.toggleSendDialogue()
	}

	checkFields(state: any, quill: any): boolean {
		const { title, tagline } = state.content
		const tags = state.meta.tags
		let alertTitle = ''
		let alertBody = ''

		if (!title) {
			alertTitle = 'Invalid Title'
			alertBody = 'You must give your article a title before proceeding.'
			this.toggleInvalidFieldDialogue(alertTitle, alertBody)
			return
		}
		if (title.length < 10 && title.length > 60) {
			alertTitle = 'Title wrong length'
			alertBody = 'The title of your article must be between 10 and 60 characters long.'
			this.toggleInvalidFieldDialogue(alertTitle, alertBody)
			return
		}
		// if (!tagline) {
		// 	alertTitle = 'Invalid Tagline'
		// 	alertBody = 'You must give your article a tagline before proceeding.'
		// 	this.toggleInvalidFieldDialogue(alertTitle, alertBody)
		// 	return
		// }
		// if (tagline.length < 15 || tagline.length > 120) {
		// 	alertTitle = 'Tagline Wrong Length'
		// 	alertBody = 'Your tagline must be between 15 and 120 characters long.'
		// 	this.toggleInvalidFieldDialogue(alertTitle, alertBody)
		// 	return
		// }
		if (quill.getText().length < 200) {
			alertTitle = 'Article is too short'
			alertBody = 'The article must be at least 200 characters long.'
			this.toggleInvalidFieldDialogue(alertTitle, alertBody)
			return
		}
		if (tags.length < 2) {
			alertTitle = 'More Tags Needed'
			alertBody = 'Please add at least 2 tags to your article.'
			this.toggleInvalidFieldDialogue(alertTitle, alertBody)
			return
		}
		return true
	}

	toggleInvalidFieldDialogue(title: string = '', body: string = '') {
		const invalidFieldOpen = this.state.invalidFieldOpen ? false : true
		if (title && body) {
			const invalidField = { title, body }
			this.setState({
				invalidFieldOpen,
				invalidField
			})
			return
		}
		this.setState({
			invalidFieldOpen
		})
	}

	handleTitleChange(e: any) {
		const title = e.target.value
		const content = this.state.content
		content.title = title
		this.setState({
			content
		})
	}

	handleTaglineChange(e: any) {
		const tagline = e.target.value
		const content = this.state.content
		content.tagline = tagline
		this.setState({
			content
		},() => {console.log(this.state.content)})
	}

	updateTagField(tag: string) {
		const meta = this.state.meta
		if (this.state.meta.tags.length < 10 && meta.tags.indexOf(tag) === -1) {
			meta.tags.push(tag)
			this.setState({
				meta
			})
		}
	}

	removeTag(tag: string){
		const tags = this.state.meta.tags
		const index = tags.indexOf(tag)
		if (index > -1) {
			const meta = this.state.meta
			meta.tags.splice(index, 1)
			this.setState({
				meta
			})
		}
	}

	render() {
		const { keystore } = this.state

		return (
			<div className='page'>
				{
					!keystore ?
						<KeyUploadComponent callback={this.handleKeystoreChange} />
						:
						<div>
							<ConfirmSendDialogue
								open={this.state.sendDialogueOpen}
								cancel={this.toggleSendDialogue}
								confirm={this.sendDialogueConfirm}
							/>

							<ArticleForm
								titleChange={this.handleTitleChange}
								taglineChange={this.handleTaglineChange}
								callback={this.handleContentChange}
								editorCallback={this.bindQuillEditor.bind(this)}
								body={this.state.content.body}
							/>

							<InvalidFieldDialogue
								open={this.state.invalidFieldOpen}
								field={this.state.invalidField}
								close={this.toggleInvalidFieldDialogue}
							/>

							<AddTagsComponent
								value={this.state.tagField}
								callback={this.updateTagField}
							/>

							<TagsListComponent
								tags={this.state.meta.tags}
								handleDelete={this.removeTag}
							/>

							<CreateArticleButtons
								handleClickOpen={this.sendClicked}
							/>
							{/* <button onClick={()=> this.api.getAllArticles()}>search test txn</button> */}

						</div>
				}
			</div>
		)
	}
}

export default withStyles(CreateArticleStyles)(CreateArticle)
