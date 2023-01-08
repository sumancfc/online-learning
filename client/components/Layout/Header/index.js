import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import CategoryMenu from "../../Category/CategoryMenu";
import Logo from "../../Logo";
import SearchForm from "../../SearchForm";
import { HeaderRight } from "./HeaderRight";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [categories, setCategories] = useState([]);

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

  return (
    <div className='container-fluid'>
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
  );
};

export default Header;
