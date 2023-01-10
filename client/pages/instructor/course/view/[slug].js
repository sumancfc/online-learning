import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { AiOutlineQuestion } from "react-icons/ai";
import { toast } from "react-toastify";
import { Modal, List, Avatar, Tooltip, Button } from "antd";
import InstructorRoute from "@/components/Routes/InstructorRoute";
import CustomAvatar from "@/components/Avatar";
import LessonForm from "@/components/Forms/LessonForm";
const { Item } = List;

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

  console.log(course._id);

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

  //publish course
  const publishCource = async (e, cID) => {
    try {
      const { data } = await axios.put(`/api/v1/course/publish/${cID}`);
      setCourse(data);
      toast.success("Course is live now.");
    } catch (err) {
      toast.error("Course Failed to Publish.");
    }
  };

  const unpublishCourse = async (e, courseId) => {
    try {
      const { data } = await axios.put(`/api/v1/course/unpublish/${courseId}`);
      setCourse(data);
      toast.success("Course is Unpublished.");
    } catch (err) {
      toast.error("Course Failed to Unpublish.");
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
          href={`/instructor/course/update/${course.slug}`}
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
            {/* <strong>Category: {course.category.name}</strong> */}
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
      {/* Show list of lesson */}
      <div className='row mt-5 pb-5'>
        <div className='col'>
          <h3>{course && course.lessons && course.lessons.length} Lessons</h3>
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

      {/* course publish unpublished */}
      {course.lessons && course.lessons.length < 3 ? (
        <Tooltip title='Min 3 lessons required to publish'>
          <AiOutlineQuestion
            className='h5 pointer text-danger'
            style={{ float: "right" }}
          />
        </Tooltip>
      ) : course.published ? (
        <Tooltip title='Unpublish'>
          <Button
            type='secondary'
            size={"large"}
            style={{ float: "right" }}
            onClick={(e) => unpublishCourse(e, course._id)}
          >
            Unpublish
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title='Publish'>
          <Button
            type='primary'
            size={"large"}
            style={{ float: "right" }}
            onClick={(e) => publishCource(e, course._id)}
          >
            Publish
          </Button>
        </Tooltip>
      )}
    </InstructorRoute>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params; // Use `context.params` to get dynamic params
  const res = await fetch(`${process.env.BACKEND_API}/course/${slug}`);
  const courseaaa = await res.json();

  return { props: { courseaaa } };
}

export default ViewCourse;
