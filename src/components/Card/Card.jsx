import { useContext, useEffect, useState } from "react";
import LikeTwo from "../../../public/assets/icons/likeTwo.svg";
import Like from "../../../public/assets/icons/like.svg";
import Checked from "../../../public/assets/icons/checked.svg";
import PropTypes from "prop-types";
import "./card.css";
import { Context } from "../Layout";

export const Card = (props) => {
  const { title, imgUrl, prise, onPlus, onLike, favorited = false, id } = props;
  const [likeActive, setLikeActive] = useState(false);
  const { addedFun, addedFavorites } = useContext(Context);

  useEffect(() => {
    if (favorited) {
      setLikeActive(true);
    }
  }, [likeActive]);
  const obj = { title, imgUrl, prise, id, parentId: id };
  const onClickPlus = () => {
    onPlus(obj);
  };
  const onClickLike = () => {
    onLike(obj);
    setLikeActive(!likeActive);
  };
  return (
    <div className="card">
      <div>
        <div className="like" onClick={onClickLike}>
          {addedFavorites(obj.id) || favorited ? <Like /> : <LikeTwo />}
        </div>
        <img width={133} height={122} src={imgUrl} alt="sneakers" />
      </div>
      <h5>{title}</h5>
      <div className="cardButton">
        <div>
          <p className="sum">Цена:</p>
          <b>{prise} руб.</b>
        </div>
        <button onClick={onClickPlus}>
          {addedFun(id) ? <Checked /> : "+"}
        </button>
      </div>
    </div>
  );
};
Card.propTypes = {
  title: PropTypes.string,
  imgUrl: PropTypes.string,
  prise: PropTypes.number,
  onPlus: PropTypes.func,
  onLike: PropTypes.func,
  id: PropTypes.string,
  favorited: PropTypes.bool,
  added: PropTypes.bool,
  parentId: PropTypes.number,
};
