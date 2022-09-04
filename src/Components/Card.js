import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useSnackbar } from "notistack";
import { Howl } from "howler";
import bookSound from "../audioClips/booksound.mp3";

const Card = ({ book }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const arrayOfBooks = [];
  const { enqueueSnackbar } = useSnackbar();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    if (arrayOfBooks.includes(product)) {
      enqueueSnackbar("Incerased product Quantity", { variant: "info", autoHideDuration: 500 });
    } else {
      enqueueSnackbar("Product added to cart", { variant: "success", autoHideDuration: 500 });
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
                  onClick={() => {
                    navigate(`/book/:${item.id}`);
                    var sound = new Howl({
                      src: bookSound,
                    });
                    sound.play();
                  }}
                />
                <div className="bottom flex flex-col">
                  <p className="p-3 font-bold">{amount}&#x20AC;</p>
                  <button
                    className="bg-transparent hover:bg-amber-600 text-white-600 font-bold hover:text-white 
                    py-2 px-4 border border-gray-400 hover:border-transparent rounded-lg"
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
