import React from 'react'
import TextField from '@material-ui/core/TextField';

import CreateArticleStyles from '../containers/CreateArticleStyles'
import { withStyles } from '@material-ui/core';
import ReactQuill from 'react-quill';

// import { debounce } from 'throttle-debounce'

const modules: any = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // ['image'],
        [{ 'align': [] }],
        ['code-block'],
        ['clean']
    ],
}

const formats: any = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'align', 'code-block'
]

type Props = {
    callback: any
    body: string
    classes: any
}

class ArticleForm extends React.Component<Props> {
    callback: any
    body: string
    classes: any
    quillRef: any
    reactQuillRef: any

    constructor(props: Props) {
        super(props)
        // props.callback
        // this.body = props.body
        this.classes = props.classes

        this.quillRef = null;      // Quill instance
        this.reactQuillRef = null; // ReactQuill component

        this.attachQuillRefs = this.attachQuillRefs.bind(this)
    }

    componentDidMount() {
        this.attachQuillRefs()
    }

    componentDidUpdate() {
        this.attachQuillRefs()
    }

    attachQuillRefs() {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }

    handleChanges(e: any) {
        this.props.callback(e, this.quillRef.getText())
    }

    render() {
        return (
            <div>
                <TextField
                    autoComplete='off'
                    className="article-create-title-input"
                    InputLabelProps={{
                        classes: {
                            root: this.classes.cssLabel,
                            focused: this.classes.cssFocused,
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: this.classes.cssOutlinedInput,
                            focused: this.classes.cssFocused,
                            notchedOutline: this.classes.notchedOutline,
                        },
                    }}
                    label="Title"
                    variant="outlined"
                    id="custom-css-outlined-input"
                />
                <ReactQuill
                    theme='snow'
                    value={this.props.body}
                    onChange={this.handleChanges.bind(this)}
                    modules={modules}
                    formats={formats}
                    ref={(el) => { this.reactQuillRef = el }}
                />
            </div>
        )
    }
}

export default withStyles(CreateArticleStyles)(ArticleForm)

