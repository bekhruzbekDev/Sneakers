import { useContext,  } from "react";
import { Context } from "../../components/Layout";
import { Card } from "../../components/Card/Card";
import { Slider } from "../../components/Slider/Slider";
import Search from "../../../public/assets/icons/search.svg";
// import axios from "axios";
import { Load } from "../../components/MyLoading/Load";
export const Home = () => {
  
  const {
    cartOpened,
    items,
    // setItems,
    // setCartItems,
    searchValue,
    setSearchValue,
    onAddToCart,
    onAddToFavorite,
    // setFavorites,
    isLoading,
    // setLoading
  } = useContext(Context);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const [cartResponse, itemResponse, favoriteResponse] =
  //         await Promise.all([
  //           axios.get("https://6654c8133c1d3b6029375c0f.mockapi.io/cart"),
  //           axios.get("https://6654c8133c1d3b6029375c0f.mockapi.io/item"),
  //           axios.get("https://6661799d63e6a0189fea0eb1.mockapi.io/liked"),
  //         ]);

  //       setLoading(false);
  //       setItems(itemResponse.data);
  //       setCartItems(cartResponse.data);
  //       setFavorites(favoriteResponse.data);
  //     } catch (error) {
  //       console.error(error);
  //       alert("error");
  //     }
  //   }
  //   fetchData();
  // }, []);
  const search = (e) => {
    setSearchValue(e.target.value);
  };
  {
    cartOpened
      ? (document.body.style = "overflow: hidden;")
      : (document.body.style = "overflow: auto;");
  }

  return (
    <div className="wrapper">
      <Slider />
      <section className="product">
        <div className="container product-container">
          <div className="title">
            <div className="product-title">
              <h2>
                {searchValue
                  ? `поиск по запросу: "${searchValue}"`
                  : "Все кроссовки"}
              </h2>
            </div>
            <div className="input">
              <Search />
              <input type="text" placeholder="Поиск..." onChange={search} />
            </div>
          </div>
          <div className="cards">
            {isLoading && <Load />}
            {isLoading ||
              items
                .filter((item) =>
                  item.title.toLowerCase().includes(searchValue)
                )
                .map((item, i) => {
                  return (
                    <Card
                      title={item.title}
                      imgUrl={item.img}
                      prise={item.prise}
                      itemId={item.itemId}
                      key={i}
                      id={item.id}
                      onPlus={(obj) => onAddToCart(obj)}
                      onLike={(obj) => onAddToFavorite(obj)}
                    />
                  );
                })}
          </div>
        </div>
      </section>
    </div>
  );
};
