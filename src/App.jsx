import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./page/Home/Home";
import { Favorite } from "./page/Favorite/Favorite";
import { Orders } from "./page/Orders/Orders";
import "./style/main.css";
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="favorite" element={<Favorite/>}/>
        <Route path="orders" element={<Orders/>}/>
      </Route>
    </Routes>
  );
};
 