import React from "react";
import "./basket.css"

const Basket = ({ basketData, totalPrice }) => {
  return (
    <div className="basket">
        <h2>Basket</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(basketData).map((key) => (
            <tr>
              <td>{basketData[key]?.item}</td>
              <td>{basketData[key]?.qty}</td>
              <td>{Number(basketData[key]?.totalPrice).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td></td>
            <td>${totalPrice()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Basket;
