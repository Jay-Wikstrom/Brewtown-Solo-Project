import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function BeerRatingPage() {
    // useEffect(() => {
    //     console.log(location.pathname); // result: '/secondpage'
    //     //console.log(location.state.detail); // result: 'some_value'
    // }, [location]);

    // useEffect(() => {
    //     if (state) {
    //         history.push('/beer-list', { state });
    //     }
    // }, [state]);

    // const location = useLocation();

    // console.log(location);
    // console.log(location.state);

    // // location.state would be undefined if user is directly taking this url
    // const { state } = location.state || { searchInput: '' };

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

            {/* <table>
                <thead>
                    <th>Beer</th>
                    <th>Rating</th>
                    <th>Type</th>
                    <th>Notes</th>
                </thead>

                <tbody>
                    
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
                        <tr>My First Beer</tr>
                    </td>
                </tbody>
            </table> */}
        </div>
    )
}
export default BeerRatingPage;