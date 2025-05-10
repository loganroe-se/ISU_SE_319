import React, {useState, useEffect} from "react";
import "./browse.css"
import "bootstrap/dist/css/bootstrap.css";

function Browse({catalog, setCatalog, filteredCatelog, setFilteredCatelog, cart, setCart, cartTotal, setCartTotal, viewer, setViewer}) {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Define the catalog
    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch("./products.json");
            const data = await response.json();

            // Update catalog
            setCatalog(data);
            setFilteredCatelog(data)
        };

        fetchData();
    }, [setCatalog, setFilteredCatelog]);

    const handleCheckout = data => {
        setViewer(1); //Setting the view to the summary page
    }

    // Update cart total
    useEffect(() => {
        const total = () => {
            let totalAmount = 0;
            for (let i = 0; i < cart.length; i++){
                totalAmount += cart[i].Cost;
            }
            setCartTotal(totalAmount);
        };

        total();
    }, [cart, setCartTotal]);

    //Sort when search button is pushed
    const filterItems = () => {
        const results = catalog.filter((eachProduct) => {
            if (searchTerm === "") return catalog;
            return eachProduct.Name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredCatelog(results);
    }

    const listItems = filteredCatelog.map((e) => (
        <div className="col-lg-4 col-md-6 col-12 mb-4" key={e.ID}>
            <div className="card h-100">
                <img src={e.Image} alt={e.Name}/>
                <div className="card-body">
                    <h5 className="card-title" style={{fontSize: "24px"}}>{e.Name}</h5>
                    <h5 className="card-text">
                        ${e.Cost}
                    </h5>
                    <hr/>
                    <div className="d-flex justify-content-between align-items-center" style={{border: "1px solid black", borderRadius: "5px", backgroundColor: "#e8ecef", width: "100%" }}>
                        <div className="verticalLine-right"><button type="button" className="btn" onClick={() => removeFromCart(e)}>-</button></div>
                        {numInCart(e.ID)}
                        <div className="verticalLine-left"><button type="button" className="btn" onClick={() => addToCart(e)}>+</button></div>
                    </div>
                </div>
            </div>
        </div>
    ));

    function numInCart(id) {
        return cart.filter((cartItem) => cartItem.ID === id).length;
    }  

    const addToCart = (e) => {
        setCart([...cart, e]);
    };

    const removeFromCart = (e) => {
        let itemFound = false;
        const updatedCart = cart.filter((cartItem) => {
            if (cartItem.ID === e.ID && !itemFound) {
                itemFound = true;
                return false;
            }
            return true;
        });
        if (itemFound) {
            setCart(updatedCart);
        }
    };

    return (
        <div>
            <div className="container" style={{marginTop: "20px"}}>
                <header className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                        <input type="search" id="search-input" name="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search items..."/>
                        <button type="button" id="search-button" onClick={filterItems}>Search</button>
                    </div>
                    <button  id="checkout-button" onClick={handleCheckout}>Checkout</button>
                </header>
            </div>
            <div className="container" style={{marginTop: "30px"}}>
                <div className="row">
                    {listItems}
                </div>
            </div>
        </div>
    );
}

export default Browse;