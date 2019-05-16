import React from 'react'

import CreateArticleStyles from '../containers/CreateArticleStyles'
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button/Button';

import './keyUploadComponent.css'

type Props = {
	classes: any,
	callback: any
}

const navigateToTokens = () => {
	window.open('https://tokens.arweave.org', '_blank')
}

function KeyUploadComponent(props: Props) {
	const { classes, callback } = props;
	return (
		<div className='key-upload-container'>
			<h2>Welcome to Scribe.</h2>
			<p>
			<i>Publishing with Permanence</i>.<br />
				To create an article, please load a valid Arweave Keystore.
			</p>
			<input
				className={classes.input}
				id="contained-button-file"
				accept='.json'
				type="file"
				onChange={callback}
			/>
			<label htmlFor="contained-button-file">
				<Button variant="outlined" component="span" className={classes.button}>
					Load Keystore
				</Button>
			</label>
			<p className='key-upload-paragraph'>
				Need tokens or a wallet ? <br />
				<Button
					size="small"
					// variant="outlined"
					component="span"
					className={classes.button}
					onClick={navigateToTokens}
				>
					Get some here
				</Button>

			</p>
		</div>
	)
}

export default withStyles(CreateArticleStyles)(KeyUploadComponent)
