import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

const MenuCart = () => {
  return (
    <Link href='/cart' className='p-3 d-flex'>
      <AiOutlineShoppingCart className='fs-3' />
      <span className=''>0</span>
    </Link>
  );
};

export default MenuCart;
