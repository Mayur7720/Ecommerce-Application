import { useEffect, useState } from "react";
import banner1 from "../../public/banner1.webp";
import banner2 from "../../public/banner2.webp";
import banner3 from "../../public/banner3.webp";
import banner4 from "../../public/banner4.webp";
import styles from "./Banner.module.css";
function Banner() {
  const arrBanner = [banner1, banner2, banner3, banner4];
  const [index, setIndex] = useState(0);
  const handleNavNext = () => {
    if (arrBanner.length - 1 !== index) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };
  const handleNavPerv = () => {
    if (index !== 0) {
      console.log(index);
      setIndex(index - 1);
    } else {
      console.log(index);

      setIndex(arrBanner.length - 1);
    }
  };
  // useEffect(() => {
  //   const lastIndex = arrBanner.length;
  //   if (index === lastIndex) {
  //     setIndex(0);
  //   }
  //   let bannerId = setTimeout(() => {
  //     setIndex(index + 1);
  //   }, 2000);
  //   console.log(bannerId);
  //   return () => clearTimeout(bannerId);
  // }, [index]);

  return (
    <>
      <article className={`${styles.container} bg-slate-200 my-4`}>
        <img
          className={`${styles.banners} h-full`}
          src={`${arrBanner[index]}`}
          alt="banner"
        />
      </article>
      {/* <div>
        <button onClick={handleNavNext} className="navbtn bg-orange-500 p-4">
        +
      </button>
      <button onClick={handleNavPerv} className="navbtn bg-orange-500 p-4">
        -
      </button>
      </div> */}
    </>
  );
}
export default Banner;
