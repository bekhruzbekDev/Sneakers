import "./orders.css";
import Arrow from ".././../../public/assets/icons/arrow.svg";
import ArrowTwo from "../../.././public/assets/icons/arrowTwo.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Load } from "../../components/MyLoading/Load";
export const Orders = () => {
  const [errorOrders, setErrorOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://6665d93fd122c2868e41f631.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.cart], []));
        setLoading(false);
        if (orders.length > 0 || data.length > 0) {
          setErrorOrders(false);
        } else {
          setErrorOrders(true);
        }
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.error(error);
      }
    })();
  }, []);
  return (
    <main className="container">
      <Link to="/">
        <button className="buttons arrowBtn">
          <ArrowTwo />
        </button>
      </Link>

      <div className="cards">
        {loading && <Load />}
        {errorOrders ||
          orders.map((item, index) => {
            const { prise, imgUrl, title } = item;
            return (
              <div className="card" key={index}>
                <div>
                  <img width={133} height={122} src={imgUrl} alt="sneakers" />
                </div>
                <h5>{title}</h5>
                <div className="cardButton">
                  <div>
                    <p className="sum">Цена:</p>
                    <b>{prise} руб.</b>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {errorOrders && (
        <div className="errorOrders">
          <div className="errors">
            <img src="../public/assets/photo/order-error.png" alt="" />
            <h2>У вас нет заказов</h2>
            <p>Вы нищеброд? Оформите хотя бы один заказ.</p>
            <Link to="/">
              <button className="button">
                <Arrow />
                Вернуться назад
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};
