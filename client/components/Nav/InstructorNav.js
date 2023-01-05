import Link from "next/link";

const InstructorNav = () => {
  return (
    <div className='nav flex-column nav-pills mt-2'>
      <Link href='/user' className='nav-link active'>
        Dashboard
      </Link>
    </div>
  );
};

export default InstructorNav;
