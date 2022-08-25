import React, { useState, useEffect } from "react";
import { plates } from "../../data/plates";
import Basket from "../Basket/basket";
import Product from "../Product/product";

const Home = () => {
  const [basketData, setBasketData] = useState({});
  const redPlateCode = "R01";

  const getItemTotalPrice = (code, basketCopy, item) => {
    if (code === redPlateCode && basketCopy[code].qty === 1) {
      return (
        basketCopy[code]?.totalPrice +
        basketCopy[redPlateCode].totalPrice -
        basketCopy[redPlateCode].price / 2
      );
    }

    return basketCopy[code]?.totalPrice + item?.price;
  };
  const getBasketData = (code) => {
    const item = plates.find((i) => i.code === code);
    const basketCopy = structuredClone(basketData) ;

    if (basketCopy[code]) {
      basketCopy[code] = {
        ...basketCopy[code],
        qty: basketCopy[code]?.qty + 1,
        totalPrice:getItemTotalPrice (code, basketCopy, item)
      };
    } else {
      basketCopy[code] = {
        item: code,
        qty: 1,
        totalPrice: item?.price,
        price: item.price,
      };
    }
    return basketCopy;
  };
  const addProduct = (code) => {
    const basketCopy = getBasketData(code);
    setBasketData(basketCopy);
  };

  const totalPrice = () => {
    let sum = Object.keys(basketData)
      .map((key) => basketData[key]?.totalPrice)
      .reduce((a, b) => a + b, 0);

    sum = getTotalWithShipping(sum);
    return Number(sum).toFixed(2);
  };

  const getTotalWithShipping = (sum) => {
    if (sum > 0 && sum < 50) return sum + 4.95;
    else if (sum > 50 && sum < 90) return sum + 2.95;
    else return sum;
  };

  return (
    <div className="home">
      <h1>Plates Co</h1>
      <p className="delivery-rates">
        Orders under $50 cost $4.95. For orders under $90, delivery costs $2.95.
        Orders of $90 or more have free delivery.
      </p >
      <div className="offer">
      <p className="heading">Special Offer</p>
      <p className="content">buy one red plate, get the second half price</p>

      </div>
      <h1>Products</h1>
      <div className="product-container">
        {plates.length > 0 &&
          plates.map((p) => (
            <Product key={p.code} item={p} addProduct={addProduct} />
          ))}
      </div>
      <div>
        <Basket basketData={basketData} totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default Home;
