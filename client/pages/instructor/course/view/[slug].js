import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, List, Avatar } from "antd";
import Item from "antd/lib/list/Item";
import InstructorRoute from "@/components/Routes/InstructorRoute";
import CustomAvatar from "@/components/Avatar";
import LessonForm from "@/components/Forms/LessonForm";

const ViewCourse = ({ courseaaa }) => {
  const [course, setCourse] = useState(courseaaa);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  const [videoUploading, setVideoUploading] = useState(false);
  const [uploadButton, setUploadButton] = useState("Upload Video");
  const [videoInProgress, setVideoInProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  console.log(course);

  //upload video to aws s3
  const uploadVideoHandle = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButton(file.name);
      setVideoUploading(true);

      const videoDataType = new FormData();
      videoDataType.append("video", file);

      const { data } = await axios.post(
        `/api/v1/course/upload-video/${course.instructor._id}`,
        videoDataType,
        {
          onUploadProgress: (e) => {
            setVideoInProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );

      setValues({ ...values, video: data });
      setVideoUploading(false);
      toast.success("Video Uploading Completed.");
    } catch (err) {
      console.log(err);
      setVideoUploading(false);
      toast.error("Video Uploading Failed. Try Again.");
    }
  };
  //remove video to aws s3
  const removeVideoHandle = async () => {
    try {
      setVideoUploading(true);

      await axios.post(
        `/api/v1/course/remove-video/${course.instructor._id}`,
        values.video
      );

      setValues({ ...values, video: {} });
      setVideoUploading(false);
      setUploadButton("Please, Upload Video");
      toast.success("Video Removed.");
    } catch (err) {
      console.log(err);
      setVideoUploading(false);
      toast.error("Video Removing Failed. Try Again.");
    }
  };
  //add lesson to course
  const addLessonHandle = async (e) => {
    console.log("Hello");
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/v1/course/lesson/${course.slug}/${course.instructor._id}`,
        values
      );
      setValues({ ...values, title: "", content: "", video: {} });
      setVideoInProgress(0);
      setUploadButton("Upload video");
      setModalVisible(false);
      setCourse(data);
      toast.success("Lesson Added To Course");
    } catch (err) {
      console.log(err);
      toast.error("Lesson Failed To Add. Try Again.");
    }
  };

  return (
    <InstructorRoute>
      <div className='mb-4 d-flex justify-content-end gap-3'>
        <button
          className='btn btn-primary'
          onClick={() => setModalVisible(true)}
        >
          Add Lesson
        </button>
        <Link
          href={`/instructor/course/edit/${course.slug}`}
          className='btn btn-secondary'
        >
          Edit Course
        </Link>
      </div>
      {
        <div className='d-flex gap-5'>
          <CustomAvatar
            src={course.image ? course.image.Location : "/img/default.jpg"}
            width={200}
            height={200}
            quality={100}
            alt={course.name}
            className='rounded shadow'
          />
          <div className=''>
            <h1 className=''>{course.name}</h1>
            <strong>Category: {course.category.name}</strong>
            <p>{course.description.substring(0, 120)}</p>
          </div>
        </div>
      }

      <Modal
        title='Add New Lesson'
        centered
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <LessonForm
          values={values}
          setValues={setValues}
          videoUploading={videoUploading}
          uploadButton={uploadButton}
          videoInProgress={videoInProgress}
          uploadVideoHandle={uploadVideoHandle}
          removeVideoHandle={removeVideoHandle}
          addLessonHandle={addLessonHandle}
        />
      </Modal>

      <div className='row mt-5 pb-5'>
        <div className='col lesson-list'>
          <h4>{course && course.lessons && course.lessons.length} Lessons</h4>
          <List
            itemLayout='horizontal'
            dataSource={course && course.lessons}
            renderItem={(item, index) => (
              <Item>
                <Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                ></Item.Meta>
              </Item>
            )}
          ></List>
        </div>
      </div>
    </InstructorRoute>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params; // Use `context.params` to get dynamic params
  const res = await fetch(`http://localhost:3000/api/v1/course/${slug}`);
  const courseaaa = await res.json();

  return { props: { courseaaa } };
}

export default ViewCourse;
