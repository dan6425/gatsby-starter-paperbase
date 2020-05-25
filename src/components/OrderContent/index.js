import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { withStyles, lighten, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Refresh'
import TabBar from 'components/TabBar'
import Container from '@material-ui/core/Container';

// imports for table data 
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

// table functionality 

function createData(ordernum, orderdate, shipto, duedate, arrivaldate, status) {
	return {
		ordernum, orderdate, shipto, duedate, arrivaldate, status
	};
}

const rows = [
	createData(2013705200, '2019-05-09', 'Dan Lewis', '2019-05-10', '2019-05-13', 'Open'),
	createData(2013705210, '2019-05-09', 'Luke Shimer', '2019-05-10', '2019-05-13', 'Open'),
	createData(2013705220, '2019-05-09', 'Sophia Okayama', '2019-05-10', '2019-05-13', 'Packing'),
	createData(2013705230, '2019-05-09', 'Caleb Hilling', '2019-05-10', '2019-05-13', 'Packing'),
	createData(2013705240, '2019-05-09', 'Dyllan Vermillion', '2019-05-10', '2019-05-13', 'Packing'),
	createData(2013705250, '2019-05-09', 'Brady Howell', '2019-05-10', '2019-05-13', 'Shipped'),
	createData(2013705260, '2019-05-09', 'Ethan Ethan', '2019-05-10', '2019-05-13', 'Shipped'),
];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
	  return -1;
	}
	if (b[orderBy] > a[orderBy]) {
	  return 1;
	}
	return 0;
  }
  
  function getComparator(order, orderBy) {
	return order === 'desc'
	  ? (a, b) => descendingComparator(a, b, orderBy)
	  : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
	  const order = comparator(a[0], b[0]);
	  if (order !== 0) return order;
	  return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
	{ id: 'ordernum', numeric: false, disablePadding: true, label: 'Order #' },
	{ id: 'orderdate', numeric: true, disablePadding: false, label: 'Order Date' },
	{ id: 'shipto', numeric: false, disablePadding: false, label: 'Ship-to Recipient' },
	{ id: 'duedate', numeric: true, disablePadding: false, label: 'Due Date' },
	{ id: 'arrivaldate', numeric: true, disablePadding: false, label: 'Arrival Date' },
	{ id: 'status', numeric: false, disablePadding: false, label: 'Order Status' },
  ];

  function EnhancedTableHead(props) {
	const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
	  onRequestSort(event, property);
	};
  
	return (
	  <TableHead>
		<TableRow>
		  <TableCell padding="checkbox">
			<Checkbox
			  indeterminate={numSelected > 0 && numSelected < rowCount}
			  checked={rowCount > 0 && numSelected === rowCount}
			  onChange={onSelectAllClick}
			  inputProps={{ 'aria-label': 'select all' }}
			/>
		  </TableCell>
		  {headCells.map((headCell) => (
			<TableCell
			  key={headCell.id}
			  align={'center'}
			  padding={headCell.disablePadding ? 'none' : 'default'}
			  sortDirection={orderBy === headCell.id ? order : false}
			>
			  <TableSortLabel
				active={orderBy === headCell.id}
				direction={orderBy === headCell.id ? order : 'asc'}
				onClick={createSortHandler(headCell.id)}
			  >
				{headCell.label}
				{orderBy === headCell.id ? (
				  <span className={classes.visuallyHidden}>
					{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
				  </span>
				) : null}
			  </TableSortLabel>
			</TableCell>
		  ))}
		</TableRow>
	  </TableHead>
	);
  }

  EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
  };

  const useToolbarStyles = makeStyles((theme) => ({
	root: {
	  paddingLeft: theme.spacing(2),
	  paddingRight: theme.spacing(1),
	},
	highlight:
	  theme.palette.type === 'light'
		? {
			color: theme.palette.secondary.main,
			backgroundColor: lighten(theme.palette.secondary.light, 0.85),
		  }
		: {
			color: theme.palette.text.primary,
			backgroundColor: theme.palette.secondary.dark,
		  },
	title: {
	  flex: '1 1 100%',
	},
  }));

  const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const { numSelected } = props;
  
	return (
	  <Toolbar
		className={clsx(classes.root, {
		  [classes.highlight]: numSelected > 0,
		})}
	  >
		{numSelected > 0 ? (
		  <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
			{numSelected} selected
		  </Typography>
		) : (
		  <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
			GoldBelly Order Management
		  </Typography>
		)}
  
		{numSelected > 0 ? (
		  <Tooltip title="Delete">
			<IconButton aria-label="delete">
			  <DeleteIcon />
			</IconButton>
		  </Tooltip>
		) : (
		  <Tooltip title="Filter list">
			<IconButton aria-label="filter list">
			  <FilterListIcon />
			</IconButton>
		  </Tooltip>
		)}
	  </Toolbar>
	);
  };

  EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
  };
  
  const useStyles = makeStyles((theme) => ({
	root: {
	  width: '100%',
	},
	paper: {
	  width: '100%',
	  marginBottom: theme.spacing(2),
	},
	table: {
	  minWidth: '100%',
	},
	visuallyHidden: {
	  border: 0,
	  clip: 'rect(0 0 0 0)',
	  height: 1,
	  margin: -1,
	  overflow: 'hidden',
	  padding: 0,
	  position: 'absolute',
	  top: 20,
	  width: 1,
	},
  }));

  export default function EnhancedTable() {
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('ordernum');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	  };
	
	  const handleSelectAllClick = (event) => {
		if (event.target.checked) {
		  const newSelecteds = rows.map((n) => n.name);
		  setSelected(newSelecteds);
		  return;
		}
		setSelected([]);
	  };
	
	  const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
	
		if (selectedIndex === -1) {
		  newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
		  newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
		  newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
		  newSelected = newSelected.concat(
			selected.slice(0, selectedIndex),
			selected.slice(selectedIndex + 1),
		  );
		}
	
		setSelected(newSelected);
	  };
	
	  const handleChangePage = (event, newPage) => {
		setPage(newPage);
	  };
	
	  const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	  };
	
	  const handleChangeDense = (event) => {
		setDense(event.target.checked);
	  };
	
	  const isSelected = (name) => selected.indexOf(name) !== -1;
	
	  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	  return (
		<div className={classes.root}>
			<Container maxWidth="xl" disableGutters="true" className={classes.container}>
		  <Paper className={classes.paper}>
			<TabBar tabNames={tabNames} />
			<EnhancedTableToolbar numSelected={selected.length} />
			<TableContainer>
			  <Table
				className={classes.table}
				aria-labelledby="tableTitle"
				size={dense ? 'small' : 'medium'}
				aria-label="enhanced table"
			  >
				<EnhancedTableHead
				  classes={classes}
				  numSelected={selected.length}
				  order={order}
				  orderBy={orderBy}
				  onSelectAllClick={handleSelectAllClick}
				  onRequestSort={handleRequestSort}
				  rowCount={rows.length}
				/>
				<TableBody>
				  {stableSort(rows, getComparator(order, orderBy))
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((row, index) => {
					  const isItemSelected = isSelected(row.name);
					  const labelId = `enhanced-table-checkbox-${index}`;
	
					  return (
						<TableRow
						  hover
						  onClick={(event) => handleClick(event, row.name)}
						  role="checkbox"
						  aria-checked={isItemSelected}
						  tabIndex={-1}
						  key={row.name}
						  selected={isItemSelected}
						>
						  <TableCell padding="checkbox">
							<Checkbox
							  checked={isItemSelected}
							  inputProps={{ 'aria-labelledby': labelId }}
							/>
						  </TableCell>
						  
						  <TableCell align="center">{row.ordernum}</TableCell>
						  <TableCell align="center">{row.orderdate}</TableCell>
						  <TableCell align="center">{row.shipto}</TableCell>
						  <TableCell align="center">{row.duedate}</TableCell>
						  <TableCell align="center">{row.arrivaldate}</TableCell>
						  <TableCell align="center">{row.status}</TableCell>
						</TableRow>
					  );
					})}
				  {emptyRows > 0 && (
					<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
					  <TableCell colSpan={7} />
					</TableRow>
				  )}
				</TableBody>
			  </Table>
			</TableContainer>
			<TablePagination
			  rowsPerPageOptions={[5, 10, 25]}
			  component="div"
			  count={rows.length}
			  rowsPerPage={rowsPerPage}
			  page={page}
			  onChangePage={handleChangePage}
			  onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		  </Paper>
		  
		  <FormControlLabel
			control={<Switch checked={dense} onChange={handleChangeDense} />}
			label="Dense padding"
		  />
		  </Container>
		</div>
	  )};

const styles = theme => ({
	paper: {
		maxWidth: 936,
		margin: 'auto',
		overflow: 'hidden',
	},
	searchBar: {
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
	searchInput: {
		fontSize: theme.typography.fontSize,
	},
	block: {
		display: 'block',
	},
	addUser: {
		marginRight: theme.spacing(unit),
	},
	contentWrapper: {
		margin: '40px 16px',
	},
	container: {
		padding: '48px 36px 0',
	},
})
const tabNames = ['Open Orders', 'Pending Orders', 'Complete Orders']

// function OrderContent({ classes }) {
// 	return (
// 		<>
// 			<TabBar tabNames={tabNames} />
// 			<div className={classes.container}>
// 				<Paper className={classes.paper}>
// 					<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
// 						<Toolbar>
// 							<Grid container spacing={16} alignItems="center">
// 								<Grid item>
// 									<SearchIcon className={classes.block} color="inherit" />
// 								</Grid>
// 								<Grid item xs>
// 									<TextField
// 										fullWidth
// 										placeholder="Search by Order Number..."
// 										InputProps={{
// 											disableUnderline: true,
// 											className: classes.searchInput,
// 										}}
// 									/>
// 								</Grid>
// 								<Grid item>
// 									<Button variant="contained" color="primary">
// 										Search
// 									</Button>
// 									<Tooltip title="Reload">
// 										<IconButton>
// 											<RefreshIcon className={classes.block} color="inherit" />
// 										</IconButton>
// 									</Tooltip>
// 								</Grid>
// 							</Grid>
// 						</Toolbar>
// 					</AppBar>

// 					<div className={classes.contentWrapper}>
// 						<Typography color="textSecondary" align="center">
// 							No orders yet... :(
// 						</Typography>
// 					</div>
// 				</Paper>
// 			</div>
// 		</>
// 	)
// }

// OrderContent.propTypes = {
// 	classes: PropTypes.object.isRequired,
// }


// export default withStyles(styles)(OrderContent)

export const OrderContent1 = () => {
	return withStyles(styles);
}
