import React from 'react'
import TextField from '@material-ui/core/TextField';

import CreateArticleStyles from '../containers/CreateProfileStyles'
import { withStyles } from '@material-ui/core';

type Props = {
    callback: any
    editorCallback: any
    titleChange: any
    body: string
    classes: any
    taglineChange: any
}

class ArticleForm extends React.Component<Props> {
    body: string
    classes: any
    quillRef: any
    reactQuillRef: any
    initialized: boolean

    constructor(props: Props) {
        super(props)

        this.classes = props.classes

        this.quillRef = null;      // Quill instance
        this.reactQuillRef = null; // ReactQuill component

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
                    onChange={this.props.titleChange}
                    label="Title"
                    variant="outlined"
                    id="custom-css-outlined-input"
                />
                <TextField
                    className="article-create-title-input"
                    id="outlined-full-width"
                    InputLabelProps={{
                        shrink: true,
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
                        }
                    }}
                    label="Tagline"
                    placeholder="A quick summary of the article. (one sentence)"
                    margin="normal"
                    variant="outlined"
                    autoComplete="off"
                    onChange={this.props.taglineChange}
                    // value={field}
                    // helperText="Adding detailed Tags will help people find your article."
                />
            </div>
        )
    }
}

export default withStyles(CreateArticleStyles)(ArticleForm)

