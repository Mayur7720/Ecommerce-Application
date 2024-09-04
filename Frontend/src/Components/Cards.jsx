import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "@react-icons/all-files/fa/FaRupeeSign";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import Modal from "./Modal";
import useCart from "../hooks/useCart";
import SelectOption from "./SelectOption";
import { useNavigate } from "react-router-dom";

function Cards({ products }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState({
    category: "not selected",
    rating: "not selected",
    price: "not selected",
  });
  const [filteredData, setFilteredData] = useState(products);
  const { isDialogOpen, setIsDialogOpen } = useCart();
  const navigate = useNavigate();
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const category = {
    name: "category",
    label: "Category",
    options: [
      "not selected",
      "clothes",
      "grocery",
      "electronics",
      "cosmetic",
      "shoes",
    ],
  };

  const rating = {
    name: "rating",
    label: "Rating",
    options: ["not selected", "5", "4", "3", "2", "1"],
  };

  const price = {
    name: "price",
    label: "Price",
    options: ["not selected", "500", "600", "7000", "90000", "100000"],
  };

  const addToCart = (e, product) => {
    e.stopPropagation();
    setCartProducts((prevState) => [...prevState, product]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterProducts((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Use useEffect to filter products whenever filterProducts changes
  useEffect(() => {
    const filteredData = products.filter((product) => {
      return (
        (filterProducts.category === "not selected" ||
          product.category.toLowerCase() === filterProducts.category) &&
        (filterProducts.price === "not selected" ||
          Math.floor(product.price * 70) <= parseInt(filterProducts.price)) &&
        (filterProducts.rating === "not selected" ||
          product.rating >= parseFloat(filterProducts.rating))
      );
    });
    setFilteredData(filteredData);
  }, [filterProducts, products]);
console.log(cartProducts)
  return (
    <section className=" p-4 ">
      <div className="text-black mb-4 bg-slate-300 p-1 flex justify-evenly items-center">
        <span className=" px-1 font-sans text-xl font-bold ">Filters</span>
        <SelectOption
          options={category.options}
          label={category.label}
          name={category.name}
          handleChange={handleChange}
        />
        <SelectOption
          options={rating.options}
          label={rating.label}
          name={rating.name}
          handleChange={handleChange}
        />
        <SelectOption
          options={price.options}
          label={price.label}
          name={price.name}
          handleChange={handleChange}
        />
      </div>

      <div className="flex gap-5 mx-8 flex-wrap">
        {filteredData.length > 0
          ? filteredData.map((product, idx) => (
              <div
                onClick={() => navigate(`/product_details/${product._id}`)}
                key={product._id}
                className="border hover:cursor-pointer h-72 flex flex-col w-48 overflow-hidden rounded-md shadow-lg shadow-black/20 relative "
              >
                <div className="hover:scale-105 ease-in duration-200 hover:shadow-black/40 bg-white h-3/4 min-h-[190px]">
                  <img
                    src={product.images[0] || product.images[idx]}
                    className="w-full object-fit h-4/3"
                    alt="product"
                  />
                </div>
                <div className="text-slate-950 bg-slate-100 h-full py-2 px-1">
                  <p className="text-sm font-medium truncate">
                    {product.title}
                  </p>

                  <div className="flex gap-6 mt-1">
                    <p className="flex ml-2  items-center font-medium">
                      <FaRupeeSign />
                      {Math.floor(product.price * 70)}
                    </p>
                    <p className="flex gap-1 rounded-md border px-1 bg-green-600 items-center font-medium text-white">
                      {product.rating?.toString().slice(0, 3)}

                      <FaStar className="fill-white" />
                    </p>
                  </div>
                  <button
                    onClick={(e) => addToCart(e, product)}
                    className="px-2 py-1 bg-orange-400 text-white mx-auto  rounded text-sm hover:bg-orange-500 shadow-sm shadow-black/60 hover:shadow-none ease-out duration-300 mt-1"
                  >
                    Add Cart
                  </button>
                </div>
              </div>
            ))
          : "No products found"}
        <Modal isOpen={isDialogOpen} onClose={closeDialog}>
          <table className="rounded-1 w-full text-center border border-1">
            <thead className="overflow-hidden">
              <tr>
                <td className=" border border-black border-1  px-2">Product</td>
                <td className=" border border-black border-1 px-2">Price</td>
                <td className=" border border-black border-1 px-2">Quantity</td>
              </tr>
            </thead>
            <tbody className=" border border-black ">
              {cartProducts.length > 0 ? (
                cartProducts.map((cartProduct, idx) => (
                  <tr key={idx} className="border w-full border-black">
                    <td className="px-2 border border-black">
                      {cartProduct.title}
                    </td>
                    <td className="px-2 border border-black">
                      {cartProduct.price}
                    </td>
                    <td className=" flex justify-center py-1">
                      <button className=" rounded-full  px-2 font-bold bg-orange-500">
                        +
                      </button>
                      <p className=" px-3">dd</p>
                      <button className=" rounded-full px-2  font-bold bg-orange-500">
                        -
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Item not add in cart</td>
                </tr>
              )}
            </tbody>
          </table>
        </Modal>
      </div>
    </section>
  );
}

export default Cards;
