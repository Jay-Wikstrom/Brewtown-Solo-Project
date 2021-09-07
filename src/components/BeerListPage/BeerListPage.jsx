import { useHistory } from 'react-router-dom';

function BeerListPage() {
    const history = useHistory();

    const handleSubmit = () => {
        console.log('Handle Submit');
        history.push('/beer-rating');
    }

    return (
        <div>
            <h1>This will be my Beer List page</h1>
            <button onClick={handleSubmit}>Add Brewery</button>
        </div>
    )
}
export default BeerListPage;