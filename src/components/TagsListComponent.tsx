import React from 'react'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles, Theme } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

const styles = (theme: Theme) => {
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center',
			flexWrap: 'wrap',
		},
		chip: {
			margin: '2px',
		},
	})
}



const TagsListComponent = (props: any) => {
	const { tags, handleDelete } = props
		return (
			<div>
				{
					tags.map((tag: any, index: number) => {
						return (
							<Chip
								// avatar={
								// 	<Avatar>
								// 		<PencilIcon />
								// 	</Avatar>
								// }
								label={tag}
								key={index}
								onDelete={() => handleDelete(index)}
								// className={classes.chip}
							/>
						)
					})
				}
			</div>
		)

}

export default withStyles(styles)(TagsListComponent);