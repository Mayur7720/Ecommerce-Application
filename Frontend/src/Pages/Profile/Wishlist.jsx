import React, { useEffect } from "react";
import { DecodeToken, getToken } from "../../utils/DecodedToken";

function Wishlist() {
  useEffect(() => {
    fetchWishListData();
  }, []);
  const fetchWishListData = async () => {
    const userId = DecodeToken();
    const token = getToken();
    try {
      const response = await fetch(
        `${process.env.API_URL}/user/${userId}/wishlist`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
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
