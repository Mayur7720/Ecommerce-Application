import React from "react";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
function Comments({ reviews }) {
  return (
    <article className=" ">
      {reviews?.map((review, idx) => (
        <div key={idx} className="border p-4 ">
          <p className="flex w-max  text-xs h-5 rounded-md justify-between border px-1 bg-green-600 items-center text-white ">
            {review?.rating?.toString().slice(0, 3)}
            <FaStar className="fill-white h-2 " />
          </p>
          <p className="font-semibold">{review?.reviewerName}</p>
          <p>{review?.comments}</p>
        </div>
      ))}
    </article>
  );
}

export default Comments;
