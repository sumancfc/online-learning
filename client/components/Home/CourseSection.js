import Link from "next/link";
import { AiFillFolderOpen, AiOutlineClockCircle } from "react-icons/ai";
import SubTitle from "../Section/SubTitle";
import SectionTitle from "../Section/Title";

const CourseSection = () => {
  return (
    <div className='section course-section bg-1'>
      <div className='container'>
        <div className='text-center'>
          <SubTitle subTitle='Featured Course' />
          <SectionTitle titleName='Explore Our Popular Course' />
        </div>
        <div className='row mt-5'>
          <div className='col-md-4'>
            <div className='bg-white'>
              <div>
                <img
                  src='/img/course-2.jpg'
                  alt='Course 2'
                  className='w-100 object-fit-cover'
                />
              </div>
              <div className='d-flex flex-column align-items-start p-3 min-vh-25'>
                <span className='bg-primary p-2 text-white text-uppercase'>
                  Technology
                </span>
                <h4 className='my-3 fs-4'>
                  <Link href=''>
                    Why is the Tesla Cybertruck designed the way it is?
                  </Link>
                </h4>

                <div className='d-flex gap-4'>
                  <p className='lead'>
                    <AiOutlineClockCircle /> <small>10 Hours</small>
                  </p>
                  <p className='lead'>
                    <AiFillFolderOpen /> <small>10 Lectures</small>
                  </p>
                  <p className='lead'>
                    <strong>$29.99</strong>
                  </p>
                </div>
                <div className='row'>
                  <div className='d-flex align-items-center gap-5'>
                    <div className='d-flex align-items-center my-3'>
                      <img
                        src='/img/lecturer-1.jpg'
                        alt='Lecturer'
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "1rem",
                        }}
                      />
                      <h5 className='fs-6'>by Suman Shrestha</h5>
                    </div>

                    <Link href='' className='btn btn-primary'>
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='bg-white'>
              <div>
                <img
                  src='/img/course-2.jpg'
                  alt='Course 2'
                  className='w-100 object-fit-cover'
                />
              </div>
              <div className='d-flex flex-column align-items-start p-3 min-vh-25'>
                <span className='bg-primary p-2 text-white text-uppercase'>
                  Technology
                </span>
                <h4 className='my-3 fs-4'>
                  <Link href=''>
                    Why is the Tesla Cybertruck designed the way it is?
                  </Link>
                </h4>

                <div className='d-flex gap-4'>
                  <p className='lead'>
                    <AiOutlineClockCircle /> <small>10 Hours</small>
                  </p>
                  <p className='lead'>
                    <AiFillFolderOpen /> <small>10 Lectures</small>
                  </p>
                  <p className='lead'>
                    <strong>$29.99</strong>
                  </p>
                </div>
                <div className='row'>
                  <div className='d-flex align-items-center gap-5'>
                    <div className='d-flex align-items-center my-3'>
                      <img
                        src='/img/lecturer-1.jpg'
                        alt='Lecturer'
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "1rem",
                        }}
                      />
                      <h5 className='fs-6'>by Suman Shrestha</h5>
                    </div>

                    <Link href='' className='btn btn-primary'>
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='bg-white'>
              <div>
                <img
                  src='/img/course-2.jpg'
                  alt='Course 2'
                  className='w-100 object-fit-cover'
                />
              </div>
              <div className='d-flex flex-column align-items-start p-3 min-vh-25'>
                <span className='bg-primary p-2 text-white text-uppercase'>
                  Technology
                </span>
                <h4 className='my-3 fs-4'>
                  <Link href=''>
                    Why is the Tesla Cybertruck designed the way it is?
                  </Link>
                </h4>

                <div className='d-flex gap-4'>
                  <p className='lead'>
                    <AiOutlineClockCircle /> <small>10 Hours</small>
                  </p>
                  <p className='lead'>
                    <AiFillFolderOpen /> <small>10 Lectures</small>
                  </p>
                  <p className='lead'>
                    <strong>$29.99</strong>
                  </p>
                </div>
                <div className='row'>
                  <div className='d-flex align-items-center gap-5'>
                    <div className='d-flex align-items-center my-3'>
                      <img
                        src='/img/lecturer-1.jpg'
                        alt='Lecturer'
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "1rem",
                        }}
                      />
                      <h5 className='fs-6'>by Suman Shrestha</h5>
                    </div>

                    <Link href='' className='btn btn-primary'>
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSection;
