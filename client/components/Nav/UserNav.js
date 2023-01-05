import Link from "next/link";
import { useRouter } from "next/router";

const UserNav = () => {
  const router = useRouter();

  return (
    <div className='nav flex-column nav-pills mt-2'>
      <Link
        href='/user'
        className={router.pathname === "/user" ? "nav-link active" : "nav-link"}
      >
        Dashboard
      </Link>
    </div>
  );
};

export default UserNav;
