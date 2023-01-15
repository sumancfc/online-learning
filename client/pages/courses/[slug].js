import { useContext, useState } from "react";
import BreadCrumb from "@/components/Breadcrumb";
import Tab from "@/components/Tabs";
import { Context } from "@/context/index";
import HtmlHead from "@/components/Head";
import SingleCourseRight from "@/components/Course/SingleCourseRight";
import VideoPreview from "@/components/Course/VideoPreview";

const Courses = ({ course }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [videoPreview, setVideoPreview] = useState("");

  const {
    state: { user },
  } = useContext(Context);

  return (
    <>
      <HtmlHead title={`${course.name} - Online Learning Platform`} />
      <BreadCrumb courseName={course.name} />
      <div className='course-single-section my-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <Tab
                course={course}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                setVideoPreview={setVideoPreview}
              />
            </div>
            <SingleCourseRight
              course={course}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              setVideoPreview={setVideoPreview}
            />
          </div>
        </div>
      </div>

      <VideoPreview
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        videoPreview={videoPreview}
      />
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
