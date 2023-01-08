import { useState, useRef } from "react";
import Link from "next/link";
import useOnHoverOutside from "../../hooks/useOnHoverOutside";

const CategoryMenu = ({ categories }) => {
  const dropdownRef = useRef(null); // Create a reference for dropdown container
  const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);

  // function to close dropdown
  const closeHoverMenu = () => {
    setMenuDropDownOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu); // Call the hook

  return (
    <div>
      <div ref={dropdownRef}>
        <a href='#' onMouseOver={() => setMenuDropDownOpen(true)}>
          Categories
        </a>
        {isMenuDropDownOpen && (
          <ul className='position-absolute bg-white mb-0 p-3'>
            {categories.map((category) => (
              <li className='list-unstyled py-1' key={category._id}>
                <Link href={`${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryMenu;
