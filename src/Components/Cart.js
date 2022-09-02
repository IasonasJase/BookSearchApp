import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, reduceItemNumber, addToCart } from "../features/cartSlice";

const Cart = () => {
  const cartList = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleReduceItemNumber = (product) => {
    dispatch(reduceItemNumber(product));
  };

  const handleIncreaseItemNumber = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="italic">
      <h2 className="text-center pt-10 text-3xl font-semibold text-white">Shopping Cart</h2>
      {cartList.cartItems.length === 0 ? (
        <div>
          <p className="text-center pt-10 text-xl font-bold">Your cart is currently empty</p>
          <div>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 block m-auto hover:text-purple-500 "
              >
                <path
                  fillRule="evenodd"
                  d="M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center my-6">
            <div
              className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg 
                            pin-r pin-y md:w-4/5 lg:w-4/5 opacity-80 rounded-md"
            >
              <div className="flex-1">
                <table className="w-full text-sm lg:text-base" cellSpacing="0">
                  <thead>
                    <tr className="h-12 uppercase">
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
                        <tr className="" key={item.id}>
                          <td className="hidden pb-4 pt-4 md:table-cell">
                            <img
                              className="max-h-40"
                              src={item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail}
                              alt={item.name}
                            />
                          </td>
                          <td>
                            <p className="mb-2 md:ml-4 font-semibold">{item.volumeInfo.title}</p>
                            <button
                              className="bg-transparent hover:bg-red-500 text-grey-700 font-semibold
                             hover:text-white py-2 px-4 border border-grey-700 hover:border-transparent 
                             rounded ml-5"
                              onClick={() => handleRemoveFromCart(item)}
                            >
                              Remove
                            </button>
                          </td>
                          <td className="justify-center md:justify-end md:flex mt-12">
                            <div className="w-20 h-10">
                              <div className="relative flex flex-row w-full h-8">
                                <input
                                  type="text"
                                  readOnly
                                  value={item.cartQuantity}
                                  className="w-full font-semibold text-center  text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
                                />
                              </div>
                              <p>
                                <button
                                  className="bg-transparent hover:bg-green-500 text-grey-700 font-semibold
                             hover:text-white w-10 h-7 border  border-grey-700 hover:border-transparent 
                             rounded"
                                  onClick={() => handleIncreaseItemNumber(item)}
                                >
                                  +
                                </button>
                                <button
                                  className="bg-transparent hover:bg-red-500 text-grey-700 font-semibold
                             hover:text-white w-10 h-7 border border-grey-700 hover:border-transparent 
                             rounded"
                                  onClick={() => handleReduceItemNumber(item)}
                                >
                                  -
                                </button>
                              </p>
                            </div>
                          </td>
                          <td className="hidden text-right md:table-cell lg:pr-5 pb-12">
                            <span className="text-sm lg:text-base font-medium">
                              {(item.saleInfo.listPrice && item.saleInfo.listPrice.amount).toFixed(2)}&#x20AC;
                            </span>
                          </td>
                          <td className="text-right lg:pr-5 pb-12">
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
