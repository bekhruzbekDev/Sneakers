import Logo from "../../../public/assets/icons/logo.svg";
import Cart from "../../../public/assets/icons/cart.svg";
import LikeTwo from "../../../public/assets/icons/likeTwo.svg";
import User from "../../../public/assets/icons/user.svg";
import PropTypes from "prop-types"
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Layout";
export const Header = ({onClickCart}) => {
  const {cartItems} =useContext(Context)
  const navigate =useNavigate()
  return (
    <header>
      <div className="container header-container">
        
        <div className="headerLeft" onClick={()=>navigate("/")}>
          <Logo />
          <div className="headerInfo">
            <h3>REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
       
        <ul className="headerRight">
          <li onClick={onClickCart}>
            <Cart /> <span>{cartItems.reduce((prev,obj)=>obj.prise+prev,0)} руб</span>
          </li>
          <Link to={"/favorite"}>
          <li>
            <LikeTwo /> <span>Закладки</span>
          </li>
          </Link>
          <Link to={"/orders"}>
          <li>
            <User />
            <span> Профиль</span>
          </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};
Header.propTypes={
  onClickCart:PropTypes.func
}