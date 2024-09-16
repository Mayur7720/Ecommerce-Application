import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../Components/Button";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { FaRupeeSign } from "@react-icons/all-files/fa/FaRupeeSign";
import "./ProductDetails.module.css";
import RatingAndReviews from "../../Components/RatingAndReviews";
import { DecodeToken, getToken } from "../../utils/DecodedToken";
function ProductDetails() {
  const [singleProduct, setSingleProduct] = useState();
  const [isActive, setIsActive] = useState(0);
  const urlId = useParams();
  useEffect(() => {
    const fetchSingleProduct = async (id) => {
      try {
        const token = getToken();
        const response = await fetch(
          `${process.env.API_URL}/products/${urlId.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setSingleProduct(data.singleProduct);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleProduct();
  }, []);

  const handleClickImage = (idx) => {
    setIsActive(idx);
  };
  const handleClick = (e) => {
    console.log(e.target);
  };
  return (
    <section className="text-black px-4 ">
      <article className="flex gap-3 ">
        <div className="">
          <div className="flex w-[32rem] ">
            <picture className="w-1/6 active ">
              {singleProduct?.images.map((productImg, idx) => (
                <img
                  className={`gridImage ${
                    isActive == idx
                      ? `border-2  border-blue-500 ease duration-200 `
                      : " border border-1 "
                  } `}
                  onClick={() => handleClickImage(idx)}
                  key={idx}
                  src={productImg}
                />
              ))}
            </picture>
            <picture className=" h-[46rem] w-full">
              <img
                className="w-full border overflow-hidden rounded ease duration-200"
                src={singleProduct?.images[isActive]}
                alt=""
              />
              <div className="gap-8 mt-2 flex justify-between mb-2">
                <Button
                  className="bg-amber-500 w-full text-white font-semibold px-4 py-3"
                  label={"ADD TO CART"}
                  onClick={handleClick}
                />
                <Button
                  className="bg-orange-500 w-full text-white font-semibold px-4 py-3"
                  label={"BUY NOW"}
                  onClick={handleClick}
                />
              </div>
            </picture>
          </div>
        </div>
        <div className=" border p-3 w-full">
          <h4 className="font-normal text-lg mb-1">{singleProduct?.title}</h4>
          <p className="flex gap-1 w-11 h-[1.4rem] rounded-md justify-center border px-1 bg-green-600 items-center font-medium text-white">
            {singleProduct?.rating?.toString().slice(0, 3)}
            <FaStar className="fill-white" />
          </p>
          <p className="flex text-xl items-center font-medium mt-3">
            <FaRupeeSign />
            {Math.floor(singleProduct?.price * 70)}
          </p>
          <p className="mt-4">
            <label className="text-slate-500 font-semibold font- text-md">
              Description
            </label>
            <br />
            {singleProduct?.description}
          </p>
          <RatingAndReviews singleProduct={singleProduct} />
        </div>
      </article>
    </section>
  );
}

export default ProductDetails;
