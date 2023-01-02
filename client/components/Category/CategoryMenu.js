import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import useOnHoverOutside from "../../hooks/useOnHoverOutside";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null); // Create a reference for dropdown container
  const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  //get all courses category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/all"
      );
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

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
