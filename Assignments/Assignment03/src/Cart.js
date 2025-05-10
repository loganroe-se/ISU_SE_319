import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function Cart({ cart, setCart, cartTotal, setCartTotal, viewer, setViewer, formData, setFormData }) {
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validateForm();
    }, [formData])
    
    useEffect(() => {
        const total = () => {
            const totalAmount = cart.reduce((sum, item) => sum + item.Cost, 0);
            setCartTotal(totalAmount);
        };
        total();
    }, [cart, setCartTotal]);


    const backToBrowse = () => {
        setViewer(0);
    }

    const uniqueItems = cart.reduce((acc, item) => {
        const found = acc.find((el) => el.ID === item.ID);
        if (found) {
          found.quantity += 1;
        } else {
          acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        Object.keys(formData).forEach(key => {
            if (formData[key] === '' && key !== 'address2' && key !== 'overall') {
                valid = false;
                newErrors[key] = 'This field is required!';
            }
        });

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            valid = false;
            newErrors.email = 'Enter a valid email.';
        }

        if (formData.card && !/^([45][0-9]{15}|3[47][0-9]{13})$/.test(formData.card)) {
            valid = false;
            newErrors.card = 'Enter a valid credit card number.';
        }

        if (formData.zip && !/^\d{5}$/.test(formData.zip)) {
            valid = false;
            newErrors.zip = 'Enter a valid 5-digit zip code.';
        }

        if (!valid) {
            newErrors.overall = 'Please correct all errors before proceeding.';
        } else {
            newErrors.overall = '';
        }

        setErrors(newErrors);
        return valid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure there is at least one item in the cart
        if (cart.length === 0) {
            alert("You must have at least one item in your cart.");
        } else {
            if(validateForm()) {
                setViewer(2); // Setting the view to the summary page
            }
        }
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={backToBrowse}>Back to Store</button>

            {/* Cart Table */}
            <div className="card mb-4">
                <h4 className="card-header">Shopping Cart</h4>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uniqueItems.map((item) => (
                            <tr key={item.ID}>
                                <td>
                                    <img src={item.Image} alt={item.Name} width="200" className="mr-2" style={{marginRight: "20px"}} />
                                    {item.Name}
                                </td>
                                <td>{item.quantity}</td>
                                <td>${(item.Cost * item.quantity).toFixed(2)}</td>
                            </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2">Subtotal</td>
                                <td>${cartTotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Tax</td>
                                <td>${(cartTotal * 0.05).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="2"><strong>Total</strong></td>
                                <td><strong>${(cartTotal * 1.05).toFixed(2)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
    
            {/* Payment Information Form */}
            <div className="card">
                <h4 className="card-header">Payment Information</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row row mb-3">
                            <div className="form-group col-md-6">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" className="form-control" id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
                                {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="card">Card</label>
                            <input type="text" className="form-control" id="card" value={formData.card} onChange={handleChange} placeholder="XXXX-XXXX-XXXX-XXXX" required />
                            {errors.card && <small className="text-danger">{errors.card}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" value={formData.address} onChange={handleChange} placeholder="1234 Main St" required />
                            {errors.address && <small className="text-danger">{errors.address}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="address2">Address 2</label>
                            <input type="text" className="form-control" id="address2" value={formData.address2} onChange={handleChange} placeholder="Apartment/unit, studio, or floor" />
                        </div>
                        <div className="form-row row mb-3">
                            <div className="form-group col-md-6">
                                <label htmlFor="city">City</label>
                                <input type="text" className="form-control" id="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                                {errors.city && <small className="text-danger">{errors.city}</small>}
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="state">State</label>
                                <select id="state" className="form-control" value={formData.state} onChange={handleChange} required>
                                    <option value=''>Choose...</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>
                                {errors.state && <small className="text-danger">{errors.state}</small>}
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="zip">Zip Code</label>
                                <input type="text" className="form-control" id="zip" value={formData.zip} onChange={handleChange} placeholder="Zip" required />
                                {errors.zip && <small className="text-danger">{errors.zip}</small>}
                            </div>
                        </div>
                        {errors.overall && <small className="text-danger">{errors.overall}</small>}<br></br>
                        <button type="submit" className="btn btn-success mt-3">Order</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Cart;