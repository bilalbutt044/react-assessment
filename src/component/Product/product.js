import React from "react";
import "./product.css"


const Product = ({ item, addProduct }) => {
  return (
    <div className="product">
      <p>Name: {item.name}</p>
      <p>Code: {item.code}</p>
      <p>Price: ${item.price}</p>
      <button onClick={() => addProduct(item.code)}>Add in basket</button>
    </div>
  );
};

export default Product;
