import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { getBooks } from "../features/resSlice";

const Main = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const books = useSelector((state) => state.res.value) || [];

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      dispatch(getBooks({ search }));
      setSearch("");
    }
  };

  const searchBook2 = () => {
    dispatch(getBooks({ search }));
    setSearch("");
  };

  return (
    <>
      <div
        className={books.length >= 1 ? "h-screen flex flex-col" : "h-[750px] flex flex-col justify-center items-center"}
      >
        {/* <img className={books.length <= 1 ? "w-80 h-80 absolute top-1 " : "hidden"} src={bookimg} alt="" /> */}
        <div className="flex flex-col mt-12">
          <div className="flex flex-col justify-center ">
            <h1 className="w-full text-center italic text-3xl font-semibold tracking-wider text-orange-100">
              "The library is inhabited by spirits that come out of the pages at night."
            </h1>
            <h2
              className={
                books.length <= 1
                  ? "w-full text-right text-xl pr-5 pt-7 font-semibold tracking-wider font-serif text-orange-100"
                  : "hidden"
              }
            >
              — Isabel Allende
            </h2>
          </div>
          <div className="mt-16 ml-4 flex flex-col items-center">
            <label className="block mb-2 text-lg font-medium text-red-100 dark:text-gray-300">
              Search by Book Title or Author
            </label>
            <div className="flex flex-row">
              <input
                className="bg-blue-50 border border-blue-400 text-gray-600 text-sm 
               focus:border-blue-600 block  p-2.5 dark:bg-gray-700 lg:w-[600px] 
                md:w-[500px] rounded xs:w-[300px]
               placeholder-gray-300 dark:text-white focus:outline-none focus:bg-white"
                type="text"
                placeholder="e.g. Stephen King"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={searchBook}
              />
              <button
                onClick={searchBook2}
                className=" border-blue-400 text-gray-400 w-9 h-10.1 
           hover:text-amber-700 dark:text-white dark:bg-gray-700  -ml-8 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-9 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="container flex flex-col justify-center items-center">
          <Card book={books} />
        </div>
      </div>
    </>
  );
};

export default Main;
