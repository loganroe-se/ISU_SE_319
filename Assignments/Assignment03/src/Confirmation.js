import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

function Confirmation({ formData, setFormData, cart, setCart, cartTotal, setCartTotal, setViewer }) {
    const backToBrowse = () => {
        // Reset info first
        setFormData({fullName: '', email: '', card: '', address: '', address2: '', city: '', state: '', zip: '', overall: ''});
        setCart([]);
        setCartTotal(0);
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

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={backToBrowse}>Back to Store</button>

            {/* Cart Table */}
            <div className="card mb-4">
                <h4 className="card-header">Purchased Items</h4>
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
                <h4 className="card-header">Order Confirmation</h4>
                <div className="card-body">
                    <h4>Customer Information</h4>
                    <p><strong>Name:</strong> {formData.fullName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Credit Card:</strong> {'************' + formData.card.slice(-4)}</p>
                    <h4>Shipping Address</h4>
                    <p>{formData.address}</p>
                    {formData.address2 && <p>{formData.address2}</p>}
                    <p>{formData.city}, {formData.state} {formData.zip}</p>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;