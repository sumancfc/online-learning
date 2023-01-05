import Link from "next/link";
import { useRouter } from "next/router";

const InstructorNav = () => {
  const router = useRouter();

  return (
    <div className='nav flex-column nav-pills mt-2'>
      <Link
        href='/instructor'
        className={
          router.pathname === "/instructor" ? "nav-link active" : "nav-link"
        }
      >
        Dashboard
      </Link>
      <Link
        href='/instructor/course/create'
        className={
          router.pathname === "/instructor/course/create"
            ? "nav-link active"
            : "nav-link"
        }
      >
        Create Course
      </Link>
    </div>
  );
};

export default InstructorNav;
