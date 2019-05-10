import React from 'react'

import CreateArticleStyles from '../containers/CreateArticleStyles'
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button/Button';

type Props = {
	classes: any,
	callback: any
}

function KeyUploadComponent (props: Props){
	const { classes, callback } = props;
	return (
		<div>
			<input
				className={classes.input}
				id="contained-button-file"
				accept='.json'
				type="file"
				onChange={callback}
			/>
			<label htmlFor="contained-button-file">
				<Button variant="outlined" component="span" className={classes.button}>
					Upload
				</Button>
			</label>
		</div>
	)
}

export default withStyles(CreateArticleStyles)(KeyUploadComponent)
