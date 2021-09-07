import { useHistory } from 'react-router-dom';

function BeerListPage() {
    const history = useHistory();

    const handleAdd = () => {
        console.log('Handle Submit');
        history.push('/beer-rating');
    }

    const handleSelect = () => {
        console.log('Handle Submit');
        history.push('/beer-rating');
    }

    return (
        <div>
            <h1>This will be my Beer List page</h1>
            <select name="brewLocations" id="brewLocations">
                <option value="Surly">Surly</option>
                <option value="Indeed">Indeed</option>
            </select>
            
            <button onClick={handleSelect}>Add Brewery</button>

            <br />
            <br />
            <br />

            <input 
                type="text"
                placeholder="Add Your Own Brewery"
            />
            <button onClick={handleAdd}>Add Brewery</button>
        </div>
    )
}
export default BeerListPage;