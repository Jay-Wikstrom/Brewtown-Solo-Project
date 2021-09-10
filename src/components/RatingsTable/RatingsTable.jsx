import { Paper, TableBody, TableCell } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { NavItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { TableRow, TableHead, Table, Button } from "@material-ui/core";


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
    

    return (
        
        <div>
            <h1>Brews Rated</h1>

            <Paper>
                <Table>
                    <TableHead>
                       <TableRow>
                            <TableCell>Brewery</TableCell>
                            <TableCell>Beer</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Notes</TableCell>
                       </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            ratings.map(rating =>

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