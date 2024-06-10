import "./load.css";
import MyLoading from "./MyLoading";
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const Load = () => {
  return arr.map((item) => {
    return (
      <div className="card" key={item}>
        <MyLoading />
      </div>
    );
  });
};
