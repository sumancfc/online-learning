import { FaBookReader, FaUserGraduate } from "react-icons/fa";

const AboutSection = () => {
  return (
    <div className='section about-section'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-6 d-flex align-items-center'>
            <div>
              <div className='mb-4 text-left'>
                <h2 className='block-title'>
                  Welcome to online <br />
                  learning center
                </h2>
              </div>
              <p className='lead'>
                There are many variations of passages of lorem ipsum available
                but the majority have suffered alteration in some form by
                injected humour or randomised words which don't look.
              </p>

              <div className='d-flex flex-wrap my-3'>
                <div className='d-flex justify-content-between align-items-center w-50 gap-4'>
                  <div>
                    <FaUserGraduate className='fs-1' />
                  </div>
                  <div>
                    <p className='about-text'>
                      Start learning from our experts
                    </p>
                  </div>
                </div>
                <div className='d-flex justify-content-between align-items-center w-50 gap-4'>
                  <div>
                    <FaBookReader className='fs-1' />
                  </div>
                  <div>
                    <p className='about-text'>
                      Enhance your skills with us now
                    </p>
                  </div>
                </div>
              </div>
              <a href='#' className='btn-secondary position-absolute mt-3'>
                Learn More
              </a>
            </div>
          </div>
          <div className='col-xl-6 d-flex justify-content-xl-end justify-content-sm-center'>
            <div className='position-relative'>
              <img
                loading='lazy'
                src='/img/about-img.jpg'
                alt='about image'
                className='about-img'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
