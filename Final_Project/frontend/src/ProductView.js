import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductView.css'

const ProductView = ({ cart, setCart, cartTotal, setCartTotal }) => {
    const { name } = useParams();
    const [brandData, setBrandData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState('');
    const [sortOption, setSortOption] = useState('price-asc');
    const [filters, setFilters] = useState({
        jackets: false,
        sweatshirts: false,
        shirts: false,
        shorts: false,
        pants: false,
        shoes: false,
    });

    // Fetch brand data
    useEffect(() => {
        const fetchBrandData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/brands/${name}`);
                if (!response.ok) {
                    throw new Error("Brand was not found.");
                }
                const data = await response.json();
                setBrandData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBrandData();
    }, [name]);

    // Update cart total
    useEffect(() => {
        const total = () => {
            let totalAmount = 0;
            for (let i = 0; i < cart.length; i++) {
                totalAmount += cart[i].Cost * cart[i].quantity;
            }
            setCartTotal(totalAmount);
        }

        total();
    }, [cart, setCartTotal]);

    function numInCart(id) {
        const product = cart.find((cartItem) => cartItem._id === id);
        return product ? product.quantity : 0;
    }

    const addToCart = (product) => {
        setCart((prevCart) => {
            const productIdx = prevCart.findIndex(item => item._id === product._id);
            if (productIdx !== -1) {
                return prevCart.map((item, index) => {
                    if (index === productIdx) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (product) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map(item => {
                if (item._id === product._id) {
                    return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 };
                }
                return item;
            }).filter(item => item.quantity > 0);
    
            return updatedCart;
        });
    };

    // Handle search and sort changes
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };
    const handleFilterChange = (e) => {
        const { name, checked } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
    };

    // Filter and sort products
    const getFilteredProducts = () => {
        if (!brandData || !brandData.Products) return [];

        // Filter products by search query
        let filteredProducts = brandData.Products.filter(product =>
            product.Name.toLowerCase().includes(search.toLowerCase())
        );


        // Apply filters
        const activeFilters = Object.keys(filters).filter(filter => filters[filter]);
        if (activeFilters.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                activeFilters.includes(product.Type.toLowerCase())
            );
        }

        // Sort products based on chosen option
        if (sortOption === 'price-asc') {
            filteredProducts.sort((a, b) => a.Cost - b.Cost);
        } else if (sortOption === 'price-desc') {
            filteredProducts.sort((a, b) => b.Cost - a.Cost);
        } else if (sortOption === 'name-asc') {
            filteredProducts.sort((a, b) => a.Name.localeCompare(b.Name));
        } else if (sortOption === 'name-desc') {
            filteredProducts.sort((a, b) => b.Name.localeCompare(a.Name));
        }

        return filteredProducts
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Filter/Sort products
    const filteredProducts = getFilteredProducts();

    return (
        
        <div className="container align-items-center">
            <div className="container">
                <h1 className="text-center mt-3 mb-4">{brandData.Name} Products</h1>
                <hr />
                <div className="d-flex justify-content-between w-100" style={{ marginBottom: "20px" }}>
                    <input type="text" className="form-control search-bar" placeholder="Search Products" value={search} onChange={handleSearchChange} />
                    <select className="form-select sort-by-dropdown" value={sortOption} onChange={handleSortChange}>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="name-asc">Name: A to Z</option>
                        <option value="name-desc">Name: Z to A</option>
                    </select>
                </div>
                <div className="row">
                    {/* Filters Section */}
                    <div className="col-md-2">
                        <div className="filters">
                            <h5>Filters</h5>
                            <ul className="list-group">
                                {["Jackets", "Sweatshirts", "Shirts", "Shorts", "Pants", "Shoes"].map((type) => (
                                    <li key={type} className="list-group-item">
                                        <input type="checkbox" className="form-check-input me-2" id={type} name={type.toLowerCase()} checked={filters[type.toLowerCase()]} onChange={handleFilterChange} />
                                        <label htmlFor={type}>{type}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Product Cards Section */}
                    <div className="col-md-10">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-start">
                            {filteredProducts.map((product) => (
                                <div className="col-md-4 mb-4" key={product._id}>
                                    <div className="card">
                                        <img src={product.Image} alt={product.Name} className="card-img-top" style={{ height: "400px", objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h4 className="card-title">{product.Name}</h4>
                                            <h5 className="card-text">${product.Cost}</h5>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-center" style={{ border: "1px solid black", borderRadius: "5px", backgroundColor: "#e8ecef", width: "100%" }}>
                                                <div className="verticalLine-right">
                                                    <button className="btn" onClick={() => removeFromCart(product)}>-</button>
                                                </div>
                                                {numInCart(product._id)}
                                                <div className="verticalLine-left">
                                                    <button className="btn" onClick={() => addToCart(product)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
