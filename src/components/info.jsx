import Arrow from '../../public/assets/icons/arrow.svg'
import PropTypes from "prop-types"
export const Info =({removeCart,title,img,desc})=>{
    return(
        <div className="errorCart">
        <img src={img} alt="" />
        <h3>{title}</h3>
        <p>{desc}</p>
        <button onClick={removeCart} className="button">
          <Arrow />
          Вернуться назад
        </button>
      </div>
    )
}
Info.propTypes ={
 removeCart:PropTypes.func, 
 title:PropTypes.string,
 img:PropTypes.string,
 desc:PropTypes.string
}