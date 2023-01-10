import BreadCrumb from "@/components/Breadcrumb";
import Tab from "@/components/Tabs";

const Courses = ({ course }) => {
  return (
    <>
      <BreadCrumb courseName={course.name} />
      <div className='course-single-section my-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <Tab course={course} />
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

export async function getServerSideProps(context) {
  const { slug } = context.params; // Use `context.params` to get dynamic params
  const res = await fetch(`${process.env.BACKEND_API}/course/${slug}`);
  const course = await res.json();

  return { props: { course } };
}

export default Courses;
