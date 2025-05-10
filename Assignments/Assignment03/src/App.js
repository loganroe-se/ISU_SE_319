import React, {useState} from "react";
import Browse from "./Browse"
import Cart from "./Cart"
import Confirmation from "./Confirmation"

function App() {
  const [catalog, setCatalog] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [viewer, setViewer] = useState(0);
  const [filteredCatelog, setFilteredCatelog] = useState([]);
  const [formData, setFormData] = useState({fullName: '', email: '', card: '', address: '', address2: '', city: '', state: '', zip: '', overall: ''});

  return (
    <div>
      {viewer === 0 && <Browse catalog={catalog} setCatalog={setCatalog} filteredCatelog={filteredCatelog} setFilteredCatelog={setFilteredCatelog} cart={cart} setCart={setCart} cartTotal={cartTotal} setCartTotal={setCartTotal} viewer={viewer} setViewer={setViewer}/>}
      {viewer === 1 && <Cart cart={cart} setCart={setCart} cartTotal={cartTotal} setCartTotal={setCartTotal} viewer={viewer} setViewer={setViewer} formData={formData} setFormData={setFormData}/>}
      {viewer === 2 && <Confirmation formData={formData} setFormData={setFormData} cart={cart} setCart={setCart} cartTotal={cartTotal} setCartTotal={setCartTotal} setViewer={setViewer}/>}
    </div>
  );
}

export default App;
