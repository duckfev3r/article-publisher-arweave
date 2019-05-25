import React, { ReactElement, useState } from 'react';
import Button from '@material-ui/core/Button/Button';

import './createArticleButtons.css'
import SendIcon from '@material-ui/icons/Send';

type Props = {
    handleClickOpen: any
}

const CreateArticleButtons = (props: Props) => {
    const { handleClickOpen } = props
    return (
        <div className="create-article-button-container">
            			<div>
				<Button size="small" className="button" variant="outlined" onClick={handleClickOpen}>
					<SendIcon />
				</Button>
			</div>
        </div>
    )
}

export default CreateArticleButtons
