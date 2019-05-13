import React, { ReactElement } from 'react';

import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';

import ApiService from '../services/ApiService'
import PublishingService from '../services/PublishingService'

import '../main.css'
import CreateArticleStyles from './CreateArticleStyles'
import CreateArticleButtons from '../components/CreateArticleButtons';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import KeyUploadComponent from '../components/KeyUploadComponent';
import ArticleForm from '../components/ArticleForm';

import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import Keystore from '../keystore'

import { IArticleContent, IArticleMeta, IArticle, IInvalidField } from '../types/types';
import ConfirmSendDialogue from '../components/ConfirmSendDialogue';
import InvalidFieldDialogue from '../components/InvalidFieldDialogue'
import AddTagsComponent from '../components/AddTagsComponent';
import TagsListComponent from '../components/TagsListComponent';

export interface Props extends WithStyles<typeof CreateArticleStyles> { }

type State = {
	content: IArticleContent,
	meta: IArticleMeta
	keystore: any
	sendDialogueOpen: boolean
	invalidField: IInvalidField
	invalidFieldOpen: boolean
};

class CreateArticle extends React.Component<Props, State> {
	api: ApiService
	publishing: PublishingService
	quillEditor: any

	constructor(props: Props) {
		super(props)

		this.state = {
			content: {
				title: '',
				body: '',
				tagline: ''
			},
			meta: {
				tags: [],
				synopsis: '',
				uniqueId: ''
			},
			invalidField: {
				title: '',
				body: '',
			},
			invalidFieldOpen: false,
			keystore: '',
			sendDialogueOpen: false
		}

		this.api = new ApiService
		this.publishing = new PublishingService

		this.setupBindings()
	}

	componentDidMount() {
		this.setState({
			keystore: Keystore
		})
	}

	setupBindings() {
		this.handleContentChange = this.handleContentChange.bind(this)
		this.handleKeystoreChange = this.handleKeystoreChange.bind(this)
		this.toggleSendDialogue = this.toggleSendDialogue.bind(this)
		this.sendDialogueCancel = this.sendDialogueCancel.bind(this)
		this.sendDialogueConfirm = this.sendDialogueConfirm.bind(this)
		this.sendClicked = this.sendClicked.bind(this)
		this.toggleInvalidFieldDialogue = this.toggleInvalidFieldDialogue.bind(this)
		this.handleTitleChange = this.handleTitleChange.bind(this)
		this.removeTag = this.removeTag.bind(this)
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
			console.log(content)
			// this.testTxn(JSON.parse(content))
		}
		fileReader.readAsText(file)
	}

	sendClicked() {
		// Validate Inputs if invalid show appropriate dialogue & return
		if (!this.checkFields()) return
		// Show confirm Dialogue, if ignored, return
		this.toggleSendDialogue()

		// Send all data to the publishing service
	}

	checkFields(): boolean {
		const { title, body } = this.state.content
		let alertTitle = ''
		let alertBody = ''

		if (!title) {
			alertTitle = 'Invalid Title'
			alertBody = 'You must give your article a title before proceeding.'
			this.toggleInvalidFieldDialogue(alertTitle, alertBody)
			return
		}
		if (title.length < 10) {
			alertTitle = 'Title too short'
			alertBody = 'The title of your article must be at least 10 characters long.'
			this.toggleInvalidFieldDialogue(alertTitle, alertBody)
			return
		}
		if (body.length < 200) {
			alertTitle = 'Article is too short'
			alertBody = 'The article must be at least 200 characters long.'
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

	prepareArticle() {

	}

	toggleSendDialogue() {
		const sendDialogueOpen = this.state.sendDialogueOpen ? false : true
		this.setState({
			sendDialogueOpen
		})
	}

	sendDialogueConfirm() {
		this.toggleSendDialogue()
	}

	sendDialogueCancel() {
		this.toggleSendDialogue()
	}

	handleTitleChange(e: any) {
		const title = e.target.value
		const content = this.state.content
		content.title = title
		this.setState({
			content
		})
	}

	addTag(e: any) {
		const meta = this.state.meta
		meta.tags.push('tagdfdfhfhf')
		this.setState({
			meta
		})
	}

	removeTag(index: number){
		const meta = this.state.meta
		meta.tags = meta.tags.splice(1, index)
		this.setState({
			meta
		})
		console.log(meta)
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
							<ArticleForm
								titleChange={this.handleTitleChange}
								callback={this.handleContentChange}
								editorCallback={this.bindQuillEditor.bind(this)}
								body={this.state.content.body}
							/>

							<CreateArticleButtons
								handleClickOpen={this.sendClicked}
							/>

							<InvalidFieldDialogue
								open={this.state.invalidFieldOpen}
								field={this.state.invalidField}
								close={this.toggleInvalidFieldDialogue}
							/>

							<AddTagsComponent
								callback={this.addTag}
							/>

							<TagsListComponent
								tags={this.state.meta.tags}
								handleDelete={this.removeTag}
							/>

							<ConfirmSendDialogue
								open={this.state.sendDialogueOpen}
								cancel={this.sendDialogueCancel}
								confirm={this.sendDialogueConfirm}
							/>
						</div>
				}
				<Button onClick={this.addTag.bind(this)} size="small" className="button" variant="outlined">
                <SaveIcon/>
            </Button>
			</div>
		)
	}
}

export default withStyles(CreateArticleStyles)(CreateArticle)
