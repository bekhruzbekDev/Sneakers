import "./modal.css";
import Cross from "../../../public/assets/icons/cross.svg";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Context } from "../Layout";
import { Info } from "../info";
import axios from "axios";

export const Modal = ({ removeCart, items, onRemove, setItems }) => {
  const { setCartOpened } = useContext(Context);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const orderCompleted = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://6665d93fd122c2868e41f631.mockapi.io/orders",
        { cart: items }
      );
      setOrderId(data.id);
      setIsOrderCompleted(true);
      setItems([]);
      for (let i = 0; i < items.length; i++) {
        const data = items[i];
        axios.delete(
          `https://6654c8133c1d3b6029375c0f.mockapi.io/cart/` + data.id
        );
        setItems([]);
      }
    } catch (e) {
      alert("Ошибка при создамии заказ :(");
    }
    setIsLoading(false);
  };
  const modalClose = (e) => {
    let overlay = document.querySelector(".overlay");

    if (e.target == overlay) {
      setCartOpened(false);
    }
  };
  window.addEventListener("keyup", (e) => {
    if (e.key == "Escape") {
      setCartOpened(false);
    }
  });
  return (
    <div className="overlay" onClick={modalClose}>
      <div className="drawer">
        <div className="title">
          <h2>Корзина</h2>
          <button className="removeBtn" onClick={removeCart}>
            <Cross />
          </button>
        </div>
        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((item, i) => {
                return (
                  <div className="productCart" key={i}>
                    <img src={item.imgUrl} alt="" className="product-img" />
                    <div className="info">
                      <p className="product-title">{item.title}</p>
                      <b>{item.prise} руб.</b>
                    </div>
                    <button
                      className="removeBtn cartBtn"
                      onClick={() => onRemove(item.id)}
                    >
                      <Cross />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="sumInfo">
              <ul>
                <li className="">
                  <span>Итого: </span>
                  <div></div>
                  <b>{items.reduce((sum, obj) => obj.prise + sum, 0)} руб. </b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>
                    {Math.floor(
                      (items.reduce((sum, obj) => obj.prise + sum, 0) * 5) / 100
                    )}{" "}
                    руб.{" "}
                  </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                className="modalBtn"
                onClick={orderCompleted}
              >
                {isLoading ? "Loading..." : "Оформить заказ"}
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderCompleted ? "Заказ оформлен!" : "Корзина пустая"}
            img={
              isOrderCompleted
                ? "../../public/assets/photo/decorated.png"
                : "../../public/assets/photo/error-cart.png"
            }
            removeCart={removeCart}
            desc={
              isOrderCompleted
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
          />
        )}
      </div>
    </div>
  );
};
Modal.propTypes = {
  removeCart: PropTypes.func,
  items: PropTypes.array,
  onRemove: PropTypes.func,
  setCartOpened: PropTypes.func,
  setItems: PropTypes.func,
};
