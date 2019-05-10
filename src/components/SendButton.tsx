import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SendIcon from '@material-ui/icons/Send';
import Grow from '@material-ui/core/Grow/Grow';

function Transition(props: any) {
	return <Grow direction="up" {...props} />;
}

type State = any;
type Props = any

class SendButton extends React.Component<State, Props> {
	constructor(props: any) {
		super(props)
		this.state = {
			open: false,
		}
		this.handleClickOpen = this.handleClickOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}

	handleClickOpen() {
		console.log('handle click open')
		this.setState({ open: true });
	};

	handleClose() {
		this.setState({ open: false });
	};

	render() {
		return (
			<div>
				<Button size="small" className="button" variant="outlined" onClick={this.handleClickOpen}>
					<SendIcon />
				</Button>
				<Dialog
					open={this.state.open}
					TransitionComponent={Transition}
					keepMounted
					onClose={this.handleClose}
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
						<Button onClick={this.handleClose} color="inherit">
							Back
            		</Button>
						<Button onClick={this.handleClose} color="inherit">
							Publish
            		</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default SendButton;