import React from 'react'
import { Grow, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

function Transition(props: any) {
    return <Grow direction="up" {...props} />;
}

type Props = {
    cancel: any,
    confirm: any
    open: boolean
}

const ConfirmSendDialogue = (props: Props) => {

    const { cancel, confirm, open } = props

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            // onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
                {"Send to Press"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to publish this article ? <br />
                    This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={cancel} color="inherit">
                    Back
                </Button>
                <Button onClick={confirm} color="inherit">
                    Publish
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmSendDialogue
