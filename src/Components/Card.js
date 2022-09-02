import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { toast } from "react-toastify";

const Card = ({ book }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const arrayOfBooks = [];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    if (arrayOfBooks.includes(product)) {
      toast.info("Increased Product Quantity", {
        position: "bottom-left",
        autoClose: 500,
      });
    } else {
      toast.success("Product added to cart", {
        position: "bottom-left",
        autoClose: 1000,
      });
      arrayOfBooks.push(product);
    }
  };

  return (
    <>
      {book.map((item) => {
        let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
        let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
        if (thumbnail !== undefined && amount !== undefined) {
          return (
            <div key={item.id}>
              <div className="card bg-slate-200">
                <img
                  className="h-full cursor-pointer w-full rounded-md opacity-100"
                  src={thumbnail}
                  alt=""
                  onClick={() => navigate(`/book/:${item.id}`)}
                />
                <div className="bottom flex flex-col">
                  <p className="p-3">{amount}&#x20AC;</p>
                  <button
                    className="bg-transparent hover:bg-purple-500 text-white-600 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};
export default Card;
