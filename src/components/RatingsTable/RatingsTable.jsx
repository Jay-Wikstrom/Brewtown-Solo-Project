import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Card, Button, makeStyles } from '@material-ui/core';

function RatingsPage(){

    const dispatch = useDispatch();
    const ratings = useSelector(store => store.ratingsReducer)

    useEffect(()=>{
        dispatch({
            type: 'FETCH_RATINGS'
        })
    }, [])

    

    return (
        
        <div>
            <h1>This will be my ratings table</h1>
            

            <table>
                <thead>
                    <th>Brewery</th>
                    <th>Beer</th>
                    <th>Type</th>
                    <th>Rating</th>
                    <th>Notes</th>
                    <th>Date</th>
                </thead>


                <tbody>
                    {ratings.map((rating, i) => {
                        return (
                            <tr key={i}>
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
                                    <button>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>


                <tbody>
                    <td>
                        <tr>Surly</tr>
                    </td>
                    <td>
                        <tr>Furious</tr>
                    </td>
                    <td>
                        <tr>IPA</tr>
                    </td>
                    <td>
                        <tr>4.5</tr>
                    </td>
                    <td>
                        <tr>My first rating</tr>
                    </td>
                    <td>
                        <tr>09/04/21</tr>
                    </td>
                    <td>
                        <tr>Delete</tr>
                    </td>
                </tbody>

                <tbody>
                    <td>
                        <tr>Indeed</tr>
                    </td>
                    <td>
                        <tr>Flavorwave</tr>
                    </td>
                    <td>
                        <tr>IPA</tr>
                    </td>
                    <td>
                        <tr>3.2</tr>
                    </td>
                    <td>
                        <tr>A bit to pineappley</tr>
                    </td>
                    <td>
                        <tr>09/04/21</tr>
                    </td>
                    <td>
                        <tr>Delete</tr>
                    </td>
                </tbody>

            </table>

         
            
            {/* {ratings.map(rating => (
                <p key={rating.id}>Brewery: {rating.brewery} Image Url: {items.image_url}></p> */}
            
        </div>
    )
}
export default RatingsPage;