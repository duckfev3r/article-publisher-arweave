import React from 'react'
import { Grow, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

function Transition(props: any) {
    return <Grow direction="up" {...props} />;
}

const AlertDialogue = (props: any) => {

    const { field, close, open } = props

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
                {field.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {field.body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="inherit">
                    ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialogue
