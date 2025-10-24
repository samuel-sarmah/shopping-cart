import { Link } from "react-router";
import Header from "./components/Header/Header";
import Products from "./components/Products/products";
import useLocalStorageState from "use-local-storage-state";

function App() {
    

    return (
        <>
            <h1>
                Beauty right out of the shop!
            </h1>
            <Link to="shop" >View our products</Link>  
        </>
    )
}

export default App;