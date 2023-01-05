import { useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import MenuCart from "../../Cart/MenuCart";
import { Context } from "@/context/index";

export const HeaderRight = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const router = useRouter();

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get(`/api/v1/logout`);

    toast.success(data.message);
    router.push("/login");
  };
  return (
    <>
      <div className='d-flex justify-content-between align-items-center gap-4'>
        <Link
          href='/wishlist'
          className={router.pathname === "/wishlist" ? "me-2 active" : "me-2"}
        >
          <AiOutlineHeart className='fs-3' />
        </Link>

        <MenuCart />

        {user && user.role && user.role.includes("Instructor") ? (
          <>
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/instructor/course/create`}
              className={
                router.pathname === "/instructor/course/create"
                  ? "me-2 active"
                  : "me-2"
              }
            >
              Create a Course
            </Link>
          </>
        ) : (
          <Link
            href={`${process.env.NEXT_PUBLIC_URL}/user/become-a-instructor`}
            className={
              router.pathname === "/user/become-a-instructor"
                ? "me-2 active"
                : "me-2"
            }
          >
            Become a Instructor
          </Link>
        )}

        {user === null && (
          <>
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/login`}
              className={router.pathname === "/login" ? "me-2 active" : "me-2"}
            >
              Login
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/register`}
              className={
                router.pathname === "/register"
                  ? "btn btn-primary me-2 active"
                  : "btn btn-primary me-2"
              }
            >
              Register
            </Link>
          </>
        )}

        {user !== null && (
          <button type='button' className='btn btn-danger' onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </>
  );
};
