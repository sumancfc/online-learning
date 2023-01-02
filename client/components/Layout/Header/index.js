import { useState } from "react";
import Link from "next/link";
import CategoryMenu from "../../Category/CategoryMenu";
import Logo from "../../Logo";
import SearchForm from "../../SearchForm";
import { HeaderRight } from "./HeaderRight";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
          <CategoryMenu />
          {/* Header Search */}
          <SearchForm />

          <HeaderRight />
        </div>
      </nav>
    </div>
  );
};

export default Header;
