import { useContext, useEffect, useState } from "react";
import ArrowTwo from "../../../public/assets/icons/arrowTwo.svg";
import Arrow from "../../../public/assets/icons/arrow.svg";
import "./favorite.css";
import { Link } from "react-router-dom";
import { Context } from "../../components/Layout";
import { Card } from "../../components/Card/Card";
export const Favorite = () => {
  const { favorites, onAddToFavorite, onAddToCart } = useContext(Context);
  const [errorBookMark, setError] = useState(false);

  useEffect(() => {
    if (favorites.length > 0) {
      setError(false);
    } else {
      setError(true);
    }
  }, [favorites]);
  return (
    <main className="container">
      {errorBookMark || (
        <>
          <div className="bookMarkTitle">
            <Link to="/">
              <button className="buttons">
                <ArrowTwo />
              </button>
            </Link>
            <h1 id="bookMarkTitle">Мои закладки</h1>
          </div>
          <div className="cards">
            {favorites.map((item, index) => {
              return (
                <Card
                  key={index}
                  title={item.title}
                  imgUrl={item.imgUrl}
                  prise={item.prise}
                  id={item.id}
                  itemId={item.itemId}
                  favorited={true}
                  onLike={(obj) => onAddToFavorite(obj)}
                  onPlus={(obj) => onAddToCart(obj)}
                />
              );
            })}
          </div>
        </>
      )}
      {errorBookMark && (
        <div className="errorOrders">
          <div className="errors">
            <img src="../public/assets/photo/bookMarkError.png" alt="" />
            <h2>Закладок нет :(</h2>
            <p>Вы ничего не добавляли в закладки</p>
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
