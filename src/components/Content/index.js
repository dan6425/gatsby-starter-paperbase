import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Logo from 'components/Logo'
const styles = theme => ({
	paper: {
		margin: 'auto',
		overflow: 'hidden',
		[theme.breakpoints.up('sm')]: {
			minWidth: 600,
		},
		[theme.breakpoints.up('lg')]: {
			minWidth: 936,
		},
	},
	searchBar: {
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
	block: {
		display: 'block',
	},
	addUser: {
		marginRight: theme.spacing.unit,
	},
	contentWrapper: {
		height: 368,
	},
	container: {
		padding: '48px 36px 48px',
	},
})

function Content({ classes }) {
	return (
		<div className={classes.container}>
			<Paper className={classes.paper}>
				<Grid
					container
					spacing={16}
					className={classes.contentWrapper}
					wrap
					alignItems="center"
					justify="center"
				>
					<Grid lg={3} xs={12} item align="center">
						<Logo />
					</Grid>
					<Grid lg={9} xs={12} item>
						<Typography component="h1" variant="display1" color="textSecondary" align="center">
							Jack Stack Barbecue - Goldbelly Order Manager
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</div>
	)
}

Content.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Content)
