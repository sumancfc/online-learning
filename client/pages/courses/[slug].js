import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import BreadCrumb from "@/components/Breadcrumb";
import Tab from "@/components/Tabs";
import { Context } from "@/context/index";
import HtmlHead from "@/components/Head";
import SingleCourseRight from "@/components/Course/SingleCourseRight";
import VideoPreview from "@/components/Course/VideoPreview";

const Courses = ({ course }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [videoPreview, setVideoPreview] = useState("");
  const [enrolledCourse, setEnrolledCourse] = useState({});

  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    user && course && checkCourseEnrolled();
  }, [user, course]);

  const checkCourseEnrolled = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/course/enrollment-check/${course._id}`
      );
      setEnrolledCourse(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(enrolledCourse);
  //handle free course
  const freeCourseHandle = async (e) => {
    e.preventDefault();
    try {
      if (!user) router.push("/login");
      enrolledCourse.status &&
        router.push(`/user/course/${enrolledCourse.course.slug}`);

      const { data } = await axios.post(
        `/api/v1/course/enrollment-free/${course._id}`
      );

      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      console.log(err);
    }
  };
  //habdle paid course
  const paidCourseHandle = async (e) => {};

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
              user={user}
              course={course}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              setVideoPreview={setVideoPreview}
              paidCourseHandle={paidCourseHandle}
              freeCourseHandle={freeCourseHandle}
              enrolledCourse={enrolledCourse}
              setEnrolledCourse={setEnrolledCourse}
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
