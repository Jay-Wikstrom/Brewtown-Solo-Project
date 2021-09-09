import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function BeerRatingPage() {
    const breweryReducer = useSelector(store => store.breweryReducer);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({
            type: 'FETCH_BREWERY',
        })
    },[])

    return (
        <div>
            <h1>This will be my Beer Rating Page</h1>

            <input 
                type='text'
                placeholder='Beer'
            />
            <input
                type='text'
                placeholder='Rating'
            />
            <input
                type='text'
                placeholder='Type'
            />
            <input
                type='text'
                placeholder='Notes'
            />
        </div>
    )
}
export default BeerRatingPage;