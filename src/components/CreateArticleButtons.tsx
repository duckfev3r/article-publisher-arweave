import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button/Button';
import SaveIcon from '@material-ui/icons/Save';

import './create-article-buttons.css'
import SendButton from './SendButton';

const CreateArticleButtons = () => {
    return (
        <div className="create-article-button-container">
            <SendButton />
            <Button size="small" className="button" variant="outlined">
                <SaveIcon/>
            </Button>
        </div>
    )
}

export default CreateArticleButtons
