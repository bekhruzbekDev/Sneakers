import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "./Modal/Modal";
export const Context = createContext(null);
export const Layout = () => {
  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isOrders, setIsOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, itemResponse, favoriteResponse] =
          await Promise.all([
            axios.get("https://6654c8133c1d3b6029375c0f.mockapi.io/cart"),
            axios.get("https://6654c8133c1d3b6029375c0f.mockapi.io/item"),
            axios.get("https://6661799d63e6a0189fea0eb1.mockapi.io/liked"),
          ]);

        setLoading(false);
        setItems(itemResponse.data);
        setCartItems(cartResponse.data);
        setFavorites(favoriteResponse.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  const onRemoveItem = (id) => {
    axios.delete(`https://6654c8133c1d3b6029375c0f.mockapi.io/cart/${id}`);
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };
  const onAddToCart = async (obj) => {
    const findItem = cartItems.find(
      (item) => Number(item.parentId) == Number(obj.id)
    );
    if (findItem) {
      let data = cartItems.filter(
        (item) => Number(item.parentId) !== Number(obj.id)
      );
      setCartItems(data);
      await axios.delete(
        `https://6654c8133c1d3b6029375c0f.mockapi.io/cart/${String(
          findItem.id
        )}`
      );
    } else {
      setCartItems((prev) => [...prev, obj]);
      const { data } = await axios.post(
        "https://6654c8133c1d3b6029375c0f.mockapi.io/cart",
        obj
      );
      setCartItems((prev) =>
        prev.map((item) => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id,
            };
          }
          return item;
        })
      );
    }
  };
  const onAddToFavorite = async (obj) => {
    const findItem = favorites.find(
      (item) => Number(item.parentId) == Number(obj.id)
    );

    if (findItem) {
      let data = favorites.filter(
        (item) => Number(item.parentId) !== Number(obj.id)
      );
      setFavorites(data);
      axios.delete(
        `https://6661799d63e6a0189fea0eb1.mockapi.io/liked/${findItem.id}`
      );
    } else {
      const { data } = await axios.post(
        "https://6661799d63e6a0189fea0eb1.mockapi.io/liked",
        obj
      );
      setFavorites((prev) => [...prev, data]);
    }
  };
  function addedFun(id) {
    return cartItems.some((obj) => Number(obj.parentId) == Number(id));
  }
  function addedFavorites(id) {
    return favorites.some((obj) => Number(obj.parentId) == Number(id));
  }
  useEffect(() => {
    const orders = async () => {
      const data = await axios.get(
        "https://6665d93fd122c2868e41f631.mockapi.io/orders"
      );
      setIsOrders((prev)=>[...prev,data.data])
    };
    orders();
  }, []);
  return (
    <Context.Provider
      value={{
        cartOpened,
        setCartOpened,
        items,
        setItems,
        cartItems,
        setCartItems,
        favorites,
        setFavorites,
        searchValue,
        setSearchValue,
        onAddToCart,
        onAddToFavorite,
        addedFun,
        addedFavorites,
        isOrders,
        isLoading,
        setLoading
      }}
    >
      <div className="wrapper">
        {cartOpened && (
          <Modal
            removeCart={() => setCartOpened(false)}
            items={cartItems}
            onRemove={onRemoveItem}
            setItems={setCartItems}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />
        <Outlet />
      </div>
    </Context.Provider>
  );
};
