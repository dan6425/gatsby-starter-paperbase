import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import DnsRoundedIcon from '@material-ui/icons/DnsRounded'
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet'
import SettingsIcon from '@material-ui/icons/Settings'
import Logo from 'components/Logo'
const categories = [
	{
		id: 'GoldBelly Express',
		children: [
			{ id: 'Orders', icon: <DnsRoundedIcon />, page: 'orders' },
			{ id: 'Mach', icon: <PermMediaOutlinedIcon />, page: 'storage' },
			{ id: 'Status', icon: <SettingsEthernetIcon />, page: 'status' },
			{ id: 'Settings', icon: <SettingsIcon />, page: 'settings' },
		],
	},
	
]

const styles = theme => ({
	categoryHeader: {
		paddingTop: 16,
		paddingBottom: 16,
	},
	categoryHeaderPrimary: {
		color: theme.palette.common.white,
	},
	item: {
		paddingTop: 4,
		paddingBottom: 4,
		color: 'rgba(255, 255, 255, 0.7)',
	},
	itemCategory: {
		backgroundColor: '#232f3e',
		boxShadow: '0 -1px 0 #404854 inset',
		paddingTop: 16,
		paddingBottom: 16,
	},
	firebase: {
		fontSize: 24,
		fontFamily: theme.typography.fontFamily,
		color: theme.palette.common.white,
	},
	itemActionable: {
		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 0.08)',
		},
	},
	itemActiveItem: {
		color: '#cf4520',
	},
	itemPrimary: {
		color: 'inherit',
		fontSize: theme.typography.fontSize,
		'&$textDense': {
			fontSize: theme.typography.fontSize,
		},
	},
	textDense: {},
	divider: {
		marginTop: theme.spacing.unit * 2,
	},
})

function Navigator({ classes, location = null, ...rest }) {
	const matchPath = location ? location.pathname.replace(/\//g, '') : null
	return (
		<Drawer variant="permanent" {...rest}>
			<List disablePadding>
				<ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
					<Grid container alignItems="center" spacing={1} direction="column">
						<Grid item>
							<Logo />
						</Grid>
						<Grid item>Jack Stack BBQ</Grid>
					</Grid>
				</ListItem>

				<Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
					<ListItem className={classNames(classes.item, classes.itemCategory)}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText
							classes={{
								primary: classes.itemPrimary,
							}}
						>
							Dashboard Home
						</ListItemText>
					</ListItem>
				</Link>
				{categories.map(({ id, children }) => (
					<React.Fragment key={id}>
						<ListItem className={classes.categoryHeader}>
							<ListItemText
								classes={{
									primary: classes.categoryHeaderPrimary,
								}}
							>
								{id}
							</ListItemText>
						</ListItem>
						{children.map(({ id: childId, icon, page = null }) => {
							return page ? (
								<Link
									key={childId}
									style={{ textDecoration: 'none', color: 'inherit' }}
									to={`/${page}`}
								>
									<ListItem
										button
										dense
										className={classNames(
											classes.item,
											classes.itemActionable,
											(matchPath && page ? matchPath === page : false) && classes.itemActiveItem
										)}
									>
										<ListItemIcon>{icon}</ListItemIcon>
										<ListItemText
											classes={{
												primary: classes.itemPrimary,
												textDense: classes.textDense,
											}}
										>
											{childId}
										</ListItemText>
									</ListItem>
								</Link>
							) : (
								<div />
							)
						})}
						<Divider className={classes.divider} />
					</React.Fragment>
				))}
			</List>
		</Drawer>
	)
}

Navigator.propTypes = {
	classes: PropTypes.object.isRequired,
	location: PropTypes.object,
}

export default withStyles(styles)(Navigator)
