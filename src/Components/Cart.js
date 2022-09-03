import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, reduceItemNumber, addToCart } from "../features/cartSlice";
import { useSnackbar } from "notistack";

const Cart = () => {
  const cartList = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
    enqueueSnackbar("Product removed from Cart", { variant: "error", autoHideDuration: 500 });
  };

  const handleReduceItemNumber = (product) => {
    dispatch(reduceItemNumber(product));
  };

  const handleIncreaseItemNumber = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="italic">
      <h2 className="text-center pt-10 text-3xl font-sans not-italic font-semibold text-white">Shopping Cart</h2>
      {cartList.cartItems.length === 0 ? (
        <div>
          <div className="flex justify-center my-6">
            <div
              className="flex flex-col w-full p-8 text-gray-800 bg-zinc-100 shadow-lg 
                            pin-r pin-y md:w-4/5 lg:w-4/5  rounded-md"
            >
              <div className="flex-1">
                <table className="w-full text-sm lg:text-base" cellSpacing="0">
                  <tr>
                    <td>
                      <p className="text-center pt-10 text-xl font-bold">
                        Your cart is currently empty. Please, press "Continue Shopping" to add Books into your shopping
                        Cart!
                      </p>
                      <Link to="/">
                        <div className="flex font-semibold text-indigo-600 text-sm mt-10">
                          <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                          </svg>
                          Continue Shopping
                        </div>
                      </Link>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center my-6">
            <div
              className="flex flex-col w-full p-8 text-gray-800 bg-zinc-100 shadow-lg 
                            pin-r pin-y md:w-4/5 lg:w-4/5  rounded-md"
            >
              <div className="flex-1">
                <table className="w-full text-sm lg:text-base" cellSpacing="0">
                  <thead>
                    <tr className="h-12 uppercase text-xl not-italic border-b-[6px]">
                      <th className="hidden md:table-cell"></th>
                      <th className="text-left">Product</th>
                      <th className="lg:text-right text-left pl-5 lg:pl-0">
                        <span className="lg:hidden" title="Quantity">
                          Qtd
                        </span>
                        <span className="hidden lg:inline">Quantity</span>
                      </th>
                      <th className="hidden text-right md:table-cell">Unit price</th>
                      <th className="text-right">Total price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartList.cartItems &&
                      cartList.cartItems.map((item) => (
                        <tr className="border-b-4" key={item.id}>
                          <td className="hidden pb-4 pt-4 md:table-cell">
                            <img
                              className="max-h-40"
                              src={item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail}
                              alt={item.name}
                            />
                          </td>
                          <td>
                            <p className="mb-2 md:ml-4 font-semibold">{item.volumeInfo.title}</p>
                            <p className="pl-5 pb-5 font-sans not-italic">{item.volumeInfo.authors[0]}</p>
                            <button
                              className="bg-transparent hover:bg-red-500 text-gray-700 font-semibold
                             hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent 
                             rounded ml-5"
                              onClick={() => handleRemoveFromCart(item)}
                            >
                              Remove
                            </button>
                          </td>
                          <td className="justify-center md:justify-end md:flex mt-12">
                            <div className="w-20 h-10 mr-2.5">
                              <div className="relative flex flex-row w-full h-8">
                                <input
                                  type="text"
                                  readOnly
                                  value={item.cartQuantity}
                                  className="w-full font-semibold text-center rounded text-gray-700 bg-gray-300 
                                  outline-none focus:outline-none hover:text-black focus:text-black
                                  border   border-gray-400"
                                />
                              </div>
                              <p>
                                <button
                                  className="bg-transparent hover:bg-green-500 text-grey-700 font-semibold
                             hover:text-white w-10 h-7 border   border-gray-400 hover:border-transparent 
                             rounded"
                                  onClick={() => handleIncreaseItemNumber(item)}
                                >
                                  +
                                </button>
                                <button
                                  className="bg-transparent hover:bg-red-500 text-grey-700 font-semibold
                             hover:text-white w-10 h-7  border border-gray-400 hover:border-transparent 
                             rounded"
                                  onClick={() => handleReduceItemNumber(item)}
                                >
                                  -
                                </button>
                              </p>
                            </div>
                          </td>
                          <td className="hidden text-right md:table-cell lg:pr-8 pb-12">
                            <span className="text-sm lg:text-base font-medium">
                              {(item.saleInfo.listPrice && item.saleInfo.listPrice.amount).toFixed(2)}&#x20AC;
                            </span>
                          </td>
                          <td className="text-right lg:pr-8 pb-12">
                            <span className="text-sm lg:text-base font-medium">
                              {(item.saleInfo.listPrice.amount * item.cartQuantity).toFixed(2)}&#x20AC;
                            </span>
                          </td>
                        </tr>
                      ))}
                    <Link to="/">
                      <div className="flex font-semibold text-indigo-600 text-sm mt-10">
                        <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                        </svg>
                        Continue Shopping
                      </div>
                    </Link>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
