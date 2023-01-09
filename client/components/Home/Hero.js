import { Button } from "antd";
import SubTitle from "../Section/SubTitle";

const Hero = () => {
  return (
    <div className='hero-section'>
      <div className='container pt-5'>
        <div className='row flex-lg-row-reverse align-items-center g-5'>
          <div className='col-10 col-sm-8 col-lg-6 position-relative'>
            <div className='shapes'></div>
            <img
              src='/img/hero-img.png'
              className=''
              alt='Hero Image'
              loading='lazy'
            />
          </div>
          <div className='col-lg-6'>
            <SubTitle subTitle='Online Learning' />
            <h1
              style={{
                color: "#012237",
                fontSize: "70px",
                lineHight: "1",
                marginBottom: "1rem",
                fontWeight: "700",
              }}
            >
              Find the right Online
              <span className='bg-yellow'>
                tutor
                <img src='/img/bg-yellow.png' alt='Yellow Background' />
              </span>
              for you.
            </h1>
            <p className='lead'>
              Free online courses from the world's Leading experts.
              <br /> Join 18+ million Learners today.
            </p>
            <div className='mt-3'>
              <Button type='primary' size='large'>
                View Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
