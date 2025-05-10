// Author: Logan Roe
// ISU NetID: lroe@iastate.edu
// Oct 25, 2024

import './App.css';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftNavBar from "./LeftNavBar";

function ShowProducts(){
  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(()=>{const fetchData = async () => {
      // read categories
      const responseCategories = await fetch("/categories.json");
      const dataCategories = await responseCategories.json();
      setCategories(dataCategories);
      const response = await fetch("/products.json");
      const data = await response.json();
      setCatalog(data);
      setFilteredCatalog(data);
    };
    fetchData();},[]);

  return (
    <div className="d-flex">
      {/* Left Navigation Bar */}
      <div style={{ width: '350px' }}>
        <LeftNavBar
        catalog={catalog}
        setCatalog={setCatalog}
        filteredCatalog={filteredCatalog}
        setFilteredCatalog={setFilteredCatalog}
        categories={categories}
        />
      </div>
      
      {/* Main Content - Product Cards */}
      <div className="row">
        {filteredCatalog.map((product) => {
          return (
            <div key={product.id} className="col-md-4">
              <div className="card mb-4">
                <img
                src={product.image}
                className="card-img-top"
                style={{ width: "150px", margin: "auto", paddingTop: "20px" }}
                alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> ${product.price} <br />
                    <strong>Description:</strong> {product.description} <br />
                    <strong>Category:</strong> {product.category} <br />
                    <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}  

export default ShowProducts;
