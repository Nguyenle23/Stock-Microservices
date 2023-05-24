import React, { useCallback, useEffect, useState } from "react";
import { Subject, debounceTime } from "rxjs";
import "./DashboardPage.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const DashboardPage = () => {
  const dispatch = useDispatch();
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

  const marketDataSocketSubject = new Subject<{
    time: Date;
    currentState: boolean;
  }>();

  const [price, setPrice] = useState("");

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
  //------------------------------------------------------------------------
  const { symbolsData, isConnected: isSocketConnected } = useSelector(
    (state: any) => {
      const { isConnected = false, symbols: symbolsData } =
        state?.marketData ?? {};

      return {
        isConnected,
        symbolsData,
      };
    },
    shallowEqual
  );

  //------------------------------------------------------------------------
  React.useEffect(() => {
    const socketEstablishmentTimeout = setTimeout(() => {
      if (isSocketConnected) {
        return;
      }
      marketDataSocketSubject.next({
        time: new Date(),
        currentState: isSocketConnected,
      });
    }, 500);

    return () => {
      clearTimeout(socketEstablishmentTimeout);
    };
  }, [isSocketConnected]);

  //------------------------------------------------------------------------
  React.useEffect(() => {
    const socketSubscription = marketDataSocketSubject
      .pipe(debounceTime(200))
      .subscribe((rs: { time: Date; currentState: boolean }) => {
        const { currentState } = rs;

        if (currentState) {
          return;
        }

        dispatch({
          type: "SOCKET_ESTABLISH",
        });
      });

    return () => {
      socketSubscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Price Stocks</h2>
      <table className="stocks-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th style={{ color: "#f0f" }}>Ceiling Price</th>
            <th style={{ color: "#0ff" }}>Floor Price</th>
            <th style={{ color: "#ff0" }}>Reference Price</th>
            <th>Total Volume Trading</th>
          </tr>
        </thead>
        <tbody>
          {symbolsData.length === 0 ? (
            <h1>Loading Symbol Data....</h1>
          ) : (
            symbolsData?.map((stock: any, index: number) => {
              const { symbol, ceil, floor, volume, reference } = stock ?? {};
              return (
                <tr key={index}>
                  <td>{symbol}</td>
                  <td style={{ color: "#f0f" }}>{ceil}</td>
                  <td style={{ color: "#0ff" }}>{floor}</td>
                  <td style={{ color: "#ff0" }}>{reference}</td>
                  <td>{volume}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
