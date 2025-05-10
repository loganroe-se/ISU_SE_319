import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { useNavigate } from "react-router-dom";


const Home = () => {
    // State to store the brands
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();


    // Fetch brands from the backend on component mount
    useEffect(() => {
        fetch('http://localhost:8081/api/brands')  // Make sure the URL matches your backend API
            .then(response => response.json())
            .then(data => setBrands(data))
            .catch(err => console.error("Error fetching brands:", err));
    }, []);

    return (
        <Container className="mt-4 d-flex justify-content-center align-items-center flex-column">
            <h1 className="centered mb-4">Shop Name Brands</h1>
            <Row>
                {/* Iterate through the brands and create a card for each */}
                {brands.map(brand => (
                    <Col key={brand._id} xs={12} className="mb-3"> {/* Full width on all screen sizes */}
                        <Card 
                            className="mb-3 rounded-pill custom-card"
                            style={{ 
                                height: '150px', 
                                width: '100%', 
                                backgroundColor: '#d3d3d3',  // Default gray background
                            }}
                            onClick={() => navigate(`/product/${brand.Name}`)}  // Handle click for each card
                        >
                            <Card.Img 
                                variant="top" 
                                src={brand.Logo} 
                                alt={brand.Name}  
                                style={{
                                    objectFit: 'contain',
                                    height: '80%',
                                    width: '80%',
                                    margin: 'auto',
                                    display: 'block'
                                }} 
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;