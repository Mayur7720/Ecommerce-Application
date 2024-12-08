import React, { useEffect } from "react";
import { DecodeToken, getToken } from "../../utils/DecodedToken";
import axiosApi from "../../Api/axiosApi";

function Wishlist() {
  useEffect(() => {
    fetchWishListData();
  }, []);
  const fetchWishListData = async () => {
    // const userId = DecodeToken();
    // const token = getToken();
    try {
      const response = await axiosApi.get(
        `/user/${userId}/wishlist`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials:true
        }
      );
      const data = await response.data;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <table>
        <th>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </th>
      </table>
    </>
  );
}

export default Wishlist;
