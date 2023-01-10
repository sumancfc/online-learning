import Link from "next/link";

const BreadCrumb = ({ courseName = "" }) => {
  return (
    <div className='position-relative'>
      <div className='breadcrumb-img'>
        <img
          src='/img/breadcrumb.jpg'
          alt='Breadcrumb Default Image'
          className='mw-100'
        />
      </div>
      <div className='position-absolute top-50 start-50 translate-middle w-100 text-center px-1'>
        <h1 className='text-white'>{courseName}</h1>
        <ul className='d-flex justify-content-center list-unstyled gap-4 text-white'>
          <li>
            <Link className='active' href='/'>
              Home
            </Link>
          </li>
          <li>Course Details</li>
        </ul>
      </div>
    </div>
  );
};

export default BreadCrumb;
