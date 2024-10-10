import { useState, useEffect } from "react";
import { FaShoppingBag } from "@react-icons/all-files/fa/FaShoppingBag";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart";
import { FaBars } from "@react-icons/all-files/fa/FaBars.esm";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes.esm";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsDialogOpen } = useCart();
  const navigate = useNavigate();
  const btnStyle = `bg-slate-50 hover:border-blue-400 hover:bg-blue-100 my-2 sm:p-2 flex gap-1 justify-around items-center rounded border w-3/4`;
  const handleLoginClick = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsMenuOpen(false);
  };

  const openModal = () => {
    navigate("/cart");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);
  return (
    <>
      <header className=" bg-white flex items-center md:px-4 py-3 md:p-2 shadow-md overflow-hidden">
        <div className="flex md:justify-between w-full ">
          <div className="flex items-center bg-amber-400 p-1 font-bold text-lg text-amber-100 italic border-2 border-amber-400 text-center rounded-lg ">
            <FaShoppingBag className=" md:h-6 w-3 fill-white" />
            <span className="ml-2 md:text-md text-xs">Appla Bazar</span>
          </div>
          <input
            type="text"
            placeholder="Search for product"
            className="w-3/5 mx-auto px-4 md:py-2 py-1 border rounded-lg text-slate-700 bg-blue-50 outline-none focus:ring-1 focus:border-transparent focus:ring-blue-200"
          />
        </div>

        <div className="md:hidden flex ml-auto mr-0 pr-2">
          <button onClick={toggleMenu} className="text-2xl">
            {!isMenuOpen && (
              <FaBars
                style={{
                  fill: "black",
                  strokeWidth: "1rem",
                  width: "1rem",
                }}
                className=" h-6 float-end "
              />
            )}
          </button>
        </div>

        <div className="hidden md:flex flex-row items-center gap-4 mr-0 ml-auto font-medium text-slate-600">
          <button onClick={handleLoginClick} className={`${btnStyle}`}>
            Login <FaUser />
          </button>
          <button onClick={handleLogoutClick} className={`${btnStyle}`}>
            Logout <FaSignOutAlt />
          </button>
          <button onClick={openModal} className={`${btnStyle}`}>
            Cart <FaShoppingCart />
          </button>
          <button
            onClick={() => navigate("/profile/info")}
            className="bg-slate-50 hover:border-blue-400 hover:bg-blue-100 my-2 sm:p-2 flex gap-1 justify-around items-center rounded-full border w-28 h-11"
          >
            <FaUser />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <aside className="z-50 relative">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm  md:hidden "
            onClick={() => setIsMenuOpen(false)}
          ></div>

          <div
            className={`fixed inset-0 bg-white w-3/4 max-w-xs h-full shadow-lg ${
              isMenuOpen
                ? "transform translate-x-0 duration-300 "
                : "transform transition-transform duration-300 "
            }  md:hidden`}
          >
            <div className=" flex flex-col items-center  font-medium text-slate-600 ">
              <div
                onClick={() => setIsMenuOpen(false)}
                className="cursor-pointer w-full p-4"
              >
                <FaTimes
                  style={{ strokeWidth: "1rem", width: "1rem" }}
                  className=" h-6 float-end hover:fill-slate-700"
                />
              </div>

              <button onClick={handleLoginClick} className={`${btnStyle} p-2`}>
                Login <FaUser />
              </button>
              <button onClick={openModal} className={`${btnStyle} p-2`}>
                Cart <FaShoppingCart />
              </button>
              <button
                onClick={() => navigate("/profile")}
                className={`${btnStyle} p-2`}
              >
                Profile <FaUser />
              </button>
              <button onClick={handleLogoutClick} className={`${btnStyle} p-2`}>
                Logout <FaSignOutAlt />
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export default Navbar;
