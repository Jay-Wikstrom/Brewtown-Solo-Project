import { Paper, TableBody, TableCell, TableSortLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { NavItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { TableRow, TableHead, Table, Button, makeStyles } from "@material-ui/core";


function RatingsPage(){
    const dispatch = useDispatch();
    const ratings = useSelector(store => store.ratingsReducer);

    useEffect(()=>{
        dispatch({
            type: 'FETCH_RATINGS'
        })
    }, [])

    const handleDelete = (id) => {
        console.log(id);
        dispatch({
            type: 'DELETE_RATING',
            payload: id
        })
    }

    const useStyles = makeStyles(theme => ({
        table: {
            marginTop: theme.spacing(3),
            '& thead th': {
                fontWeight: '600',
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.light,
            },
            '& tbody td': {
                fontWeight: '300',
            },
            '& tbody tr:hover':{
                backgroundColor: '#fffbf2',
                cursor: 'pointer'
            }

        }
    }))
    const classes = useStyles();
    const pages = [5, 10, 25]
    const [page, setPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState()

    const handleSort = cellId => {
        const isAsc = orderBy === cellId && order === "asc";
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId)
    }

    const headCells = [
        { id: 'brewery', label: 'Brewery'},
        { id: 'beer', label: 'Beer' },
        { id: 'type', label: 'Type' },
        { id: 'ratings', label: 'Ratings' },
        { id: 'notes', label: 'Notes' },
    ]

    function sort(array, comparator){
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a,b) => {
            const order = comparator(a[0], b[0]);
            if(order !== 0) return order;
            return a[1] - b[1];
        })
        return stabilizedThis.map((el) => el[0])
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy)
    }

    function descendingComparator(a, b, orderBy){
        if(b[orderBy] < a[orderBy]){
            return -1;
        }
        if (b[orderBy] < a[orderBy]){
            return 1;
        }
        return 0
    }

    const afterSort = () => {
        return sort(ratings, getComparator(order, orderBy));
    }

    return (
        
        <div>
            <h1>Brews Rated</h1>

            <Paper>
                <Table className={classes.table}>
                    <TableHead>
                       <TableRow>
                            
                            {
                                headCells.map(headCell => (
                                    <TableCell key={headCell.id}
                                    sortDirection = {orderBy === headCell.id ? order:false}>
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction = {orderBy === headCell.id ? order: 'asc'}
                                            onClick={() => { handleSort(headCell.id)}}
                                        >
                                            {headCell.label}
                                        </TableSortLabel>
                                    </TableCell>

                                    
                                ))
                            }
                            
                            
                            
                            
                            
                            
                            
                            {/* <TableCell>
                                <TableSortLabel>Brewery</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>Beer</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>Type</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>Rating</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>Notes</TableSortLabel>
                            </TableCell> */}
                       </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            afterSort().map(rating =>

                            (<TableRow key={rating.id}>
                                <TableCell>{rating.brewery}</TableCell>
                                <TableCell>{rating.beer}</TableCell>
                                <TableCell>{rating.type}</TableCell>
                                <TableCell>{rating.rating}</TableCell>
                                <TableCell>{rating.notes}</TableCell>
                                <TableCell>
                                    <Button 
                                        onClick={() => handleDelete(rating.id)}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </Table>
            </Paper>

            {/* <table>
                <thead>
                    <th>Brewery</th>
                    <th>Beer</th>
                    <th>Type</th>
                    <th>Rating</th>
                    <th>Notes</th>
                    <th>Date</th>
                </thead>


                <tbody>
                    {ratings.map((rating) => {
                        return (
                            <tr key={rating.id}>
                                <td>
                                    {rating.brewery}
                                </td>
                                <td>
                                    {rating.beer}
                                </td>
                                <td>
                                    {rating.type}
                                </td>
                                
                                <td>
                                    {rating.rating}
                                </td>

                                <td>
                                    {rating.notes}
                                </td>
                                <td>
                                    Date
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(rating.id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table> */}
            
        </div>
    )
}
export default RatingsPage;