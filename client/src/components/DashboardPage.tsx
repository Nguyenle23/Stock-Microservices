import React, { useState } from "react";
import "./DashboardPage.css";

const DashboardPage = () => {
  const sampleStocks = [
    {
      index: 1,
      code: "VN30F2306",
      ceilingPrice: 1139.8,
      floorPrice: 990.8,
      referencePrice: 1065.3,
      volume: 177.724,
    },
    {
      index: 2,
      code: "VN30F2307",
      ceilingPrice: 1136.6,
      floorPrice: 988,
      referencePrice: 1062.3,
      volume: 512,
    },
    {
      index: 3,
      code: "VN30F2309",
      ceilingPrice: 1134.6,
      floorPrice: 986.2,
      referencePrice: 1060.4,
      volume: 50,
    },
    {
      index: 4,
      code: "VN30F2312",
      ceilingPrice: 1132,
      floorPrice: 984,
      referencePrice: 1058,
      volume: 89,
    },
  ];

  const [price, setPrice] = useState("");
  const [stocks, setStocks] = useState([]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (price.trim() !== "") {
      // setStocks([...stocks, price]);
      // setPrice("");
    }
  };

  return (
    <div className="container">
      <h2>Stock Page</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={price}
          onChange={handlePriceChange}
          placeholder="Example 10..."
        />
        <button type="submit">Order</button>
      </form>
      <div>
        <h2>Symbols Order</h2>
        <ul className="stocks">
          {sampleStocks.map((stock, index) => (
            <button key={index}>
              <span>{stock.code}</span>
            </button>
          ))}
        </ul>
        <br />
        <h2>Stocks</h2>
        <table className="stocks-table">
          <thead>
            <tr>
              <th>Code Stocking</th>
              <th>Ceiling Price</th>
              <th>Floor Price</th>
              <th>Reference Price</th>
              <th>Total volume</th>
            </tr>
          </thead>
          <tbody>
            {sampleStocks.map((stock) => (
              <tr key={stock.index}>
                <td>{stock.code}</td>
                <td>{stock.ceilingPrice}</td>
                <td>{stock.floorPrice}</td>
                <td>{stock.referencePrice}</td>
                <td>{stock.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
