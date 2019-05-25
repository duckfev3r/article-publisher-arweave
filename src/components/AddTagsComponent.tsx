import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles, InputAdornment, IconButton } from '@material-ui/core';
import CreateArticleStyles from '../containers/CreateArticleStyles';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'

const AddTagsComponent = (props: any) => {

    const { classes, callback } = props
    const [field, setField] = useState('')

    const pattern = new RegExp('^[a-zA-Z0-9_.-]*$')

    const checkField = (e: any) => {
        let value = e.target.value
        const valid = pattern.test(value)
        if (valid) {
            setField(value.toLowerCase())
        }
    }

    const updateTagField = (field: string) => {
        if (field && field.length > 1 && field.length < 15) {
            callback(field)
            setField('')
        }
    }

    return (
        <div>
            <TextField
                className="article-create-title-input"
                id="outlined-full-width"
                InputLabelProps={{
                    shrink: true,
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
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Toggle password visibility"
                                onClick={()=>updateTagField(field)}
                            >
                           <AddCircleOutline />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                label="Add Category Tag"
                placeholder="rocketscience"
                margin="normal"
                variant="outlined"
                autoComplete="off"
                onChange={checkField}
                value={field}
                helperText="Adding detailed Tags will help people find your article."
            />
        </div>
    )
}

export default withStyles(CreateArticleStyles)(AddTagsComponent)
