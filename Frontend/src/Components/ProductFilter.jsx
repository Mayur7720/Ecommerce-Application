import React from "react";
import SelectOption from "./SelectOption";

function ProductFilter() {
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
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterProducts((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
  return (
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
  );
}

export default ProductFilter;
