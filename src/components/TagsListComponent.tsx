import React from 'react'
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles, Theme } from '@material-ui/core';


const styles = (theme: Theme) => {
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center',
			flexWrap: 'wrap',
		},
	})
}


const TagsListComponent = (props: any) => {
	const { tags, handleDelete } = props
		return (
			<div className="tags-list-container">
				{
					tags.map((tag: any, index: number) => {
						return (
							<Chip
								className="tag-chip"
								label={tag}
								key={index}
								onDelete={() => handleDelete(tag)}
							/>
						)
					})
				}
			</div>
		)
}

export default withStyles(styles)(TagsListComponent);