import React from 'react'
import TextField from '@material-ui/core/TextField';

import CreateArticleStyles from '../containers/CreateArticleStyles'
import { withStyles } from '@material-ui/core';
import ReactQuill from 'react-quill';

const modules: any = {
	toolbar: [
		[{ 'header': [1, 2, 3, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }],
		['image'],
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

const ArticleForm = (props: Props) => {
    const { callback, body, classes } = props
    return (
        <div>
        <TextField
            autoComplete='off'
            className="article-create-title-input"
            InputLabelProps={{
                classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                },
            }}
            InputProps={{
                classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                },
            }}
            label="Title"
            variant="outlined"
            id="custom-css-outlined-input"
        />
        <ReactQuill
            theme='snow'
            value={body}
            onChange={callback}
            modules={modules}
            formats={formats}
        />
        </div>
    )
}

export default withStyles(CreateArticleStyles)(ArticleForm)

