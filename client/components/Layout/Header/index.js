import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import CategoryMenu from "../../Category/CategoryMenu";
import Logo from "../../Logo";
import SearchForm from "../../SearchForm";
import { HeaderRight } from "./HeaderRight";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const router = useRouter();
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(router.pathname);
  }, [router]);

  useEffect(() => {
    getCategories();
  }, []);
  //get all courses category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/all`);
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };
  // Sticky Menu Area start
  useEffect(() => {
    window.addEventListener("scroll", sticky);
    return () => {
      window.removeEventListener("scroll", sticky);
    };
  });
  const sticky = (e) => {
    const header = document.querySelector(".header__area");
    const scrollTop = window.scrollY;
    scrollTop >= 1
      ? header.classList.add("sticky")
      : header.classList.remove("sticky");
  };
  // Sticky Menu Area End

  return (
    <div className='header__area header__transparent'>
      <div className='container-fluid'>
        <div className='row align-items-center'>
          <div className='col'>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
              <Link className='navbar-brand' href='/'>
                <Logo />
              </Link>
              <button
                className='navbar-toggler'
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <span className='navbar-toggler-icon'></span>
              </button>
              <div
                className={`collapse navbar-collapse justify-content-between mx-3 ${
                  showMobileMenu && "active"
                }`}
                id='navbarNavDropdown'
              >
                <CategoryMenu categories={categories} />
                {/* Header Search */}
                <SearchForm />

                <HeaderRight />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
