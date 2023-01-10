import BreadCrumb from "@/components/Breadcrumb";
import Tab from "@/components/Tabs";

const Courses = () => {
  return (
    <>
      <BreadCrumb courseName='Learn User Interface and User Experience' />
      <div className='course-single-section my-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <Tab />
            </div>
            <div className='col-md-4 position-relative'>
              <div className=''>
                <img src='/img/about-img.jpg' className='mw-100' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
