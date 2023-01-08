import { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import axios from "axios";
import { List, Avatar, Modal } from "antd";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import SectionTitle from "@/components/Section/Title";
import InstructorRoute from "@/components/Routes/InstructorRoute";
import UpdateLessonForm from "@/components/Forms/UpdateLessonForm";
import UpdateCourseForm from "@/components/Forms/updateCourse";

const { Item } = List;

const EditCourse = ({ courseaaa }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    lessons: [],
  });
  const [image, setImage] = useState({});
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadButton, setUploadButton] = useState("Image Upload");
  const [visible, setVisible] = useState(false);
  const [currentLesson, setCurrentLesson] = useState({});
  const [uploadVideoButton, setUploadVideoButton] = useState("Upload Video");
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoUploading, setVideoUploading] = useState(false);

  useEffect(() => {
    setValues(courseaaa);
  }, []);

  //get all the categories
  useEffect(() => {
    const allCategories = async () => {
      try {
        const { data } = await axios.get("/api/v1/category/all");
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    allCategories();
  }, []);

  //handle all the state change
  const handleStateChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handle image upload to aws
  const handleImageUpload = (e) => {
    let file = e.target.files[0];
    setImagePreview(window.URL.createObjectURL(file));
    setUploadButton(file.name);
    setValues({ ...values, loading: true });
    // reduce the size of image uploaded
    Resizer.imageFileResizer(file, 720, 480, "JPEG", 100, 0, async (path) => {
      try {
        let { data } = await axios.post("/api/v1/course/upload-image", {
          image: path,
        });
        setImage(data);
        setValues({ ...values, loading: false });
        toast.success("Image Uploaded.");
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast.error("Image Uploading Failed.");
      }
    });
  };

  // handle image upload from aws
  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true });
      await axios.post("/api/v1/course/remove-image", { image });
      setImage({});
      setImagePreview("");
      setUploadButton("Image Upload");
      setValues({ ...values, loading: false });
      toast.success("Image Removed");
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast.error("Image Removing Failed.");
    }
  };

  // handle the upload course
  const updateCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/course/${values.slug}`, {
        ...values,
        image,
      });
      toast.success("Course Updated");
    } catch (err) {
      console.log(err);
    }
  };

  // handle the drag of the lesson
  const dragLesson = (e, index) => {
    e.dataTransfer.setData("itemIndex", index);
    // console.log("Drag from", index);
  };

  // handle the drop of the lesson
  const dropLesson = async (e, index) => {
    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allLessons = values.lessons;

    let movingItem = allLessons[movingItemIndex];
    allLessons.splice(movingItemIndex, 1);
    allLessons.splice(targetItemIndex, 0, movingItem);

    setValues({ ...values, lessons: [...allLessons] });
    // lesson's order saved on database
    await axios.put(`/api/v1/course/${values.slug}`, {
      ...values,
      image,
    });
  };

  //upload video to course and aws s3
  const uploadVideoHandle = async (e) => {
    try {
      // remove video if present already
      if (currentLesson.video && currentLesson.video.Location) {
        const { data } = await axios.post(
          `/api/v1/course/remove-video/${values.instructor._id}`,
          currentLesson.video
        );
        toast.success(data.message);
      }

      const file = e.target.files[0];
      setUploadVideoButton(file.name);
      setVideoUploading(true);

      const videoData = new FormData();
      videoData.append("video", file);
      videoData.append("courseId", values._id);

      const { data } = await axios.post(
        `/api/v1/course/upload-video/${values.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) =>
            setVideoProgress(Math.round((100 * e.loaded) / e.total)),
        }
      );
      console.log(data);
      setCurrentLesson({ ...currentLesson, video: data });
      setVideoUploading(false);
      toast.success("Video Uploading Completed.");
    } catch (err) {
      console.log(err);
      setVideoUploading(false);
      toast.error("Video Uploading Failed.");
    }
  };

  //update lesson to course
  const updateLesson = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.put(
        `/api/v1/course/lesson/${values.slug}/${currentLesson._id}`,
        currentLesson
      );

      setUploadVideoButton("Upload Video");
      setVisible(false);

      if (data.ok) {
        let arr = values.lessons;
        const index = arr.findIndex((el) => el._id === currentLesson._id);
        arr[index] = currentLesson;
        setValues({ ...values, lessons: arr });
        toast.success("Lesson Updated Successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Lesson Failed to Update");
    }
  };

  //delete lesson handler
  const deleteLesson = async (index) => {
    const confirmToDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmToDelete) return;
    try {
      let allLessons = values.lessons;
      const removeLesson = allLessons.splice(index, 1);

      setValues({ ...values, lessons: allLessons });

      const { data } = await axios.put(
        `/api/v1/course/${values.slug}/${removeLesson[0]._id}`
      );
      toast.success(data.ok);
    } catch (err) {
      console.log(err);
      toast.error("Lesson Failed to Delete");
    }
  };

  return (
    <InstructorRoute>
      <SectionTitle titleName={"Update Course"} />
      <UpdateCourseForm
        values={values}
        setValues={setValues}
        image={image}
        categories={categories}
        imagePreview={imagePreview}
        uploadButton={uploadButton}
        handleStateChange={handleStateChange}
        handleImageUpload={handleImageUpload}
        handleImageRemove={handleImageRemove}
        updateCourse={updateCourse}
      />
      {/* List of Lesson */}
      <div className='mt-5 pb-5'>
        <div className=''>
          <h4>{values && values.lessons && values.lessons.length} Lessons</h4>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout='horizontal'
            dataSource={values && values.lessons}
            renderItem={(item, index) => (
              <Item
                draggable
                onDragStart={(e) => dragLesson(e, index)}
                onDrop={(e) => dropLesson(e, index)}
              >
                <Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                ></Item.Meta>

                <AiTwotoneEdit
                  onClick={() => {
                    setVisible(true);
                    setCurrentLesson(item);
                  }}
                  className='text-primary float-right fs-3 pointer mx-3'
                />

                <AiTwotoneDelete
                  onClick={() => deleteLesson(index)}
                  className='text-danger float-right fs-3 pointer'
                />
              </Item>
            )}
          ></List>
        </div>
      </div>

      <Modal
        title='Edit lesson'
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <UpdateLessonForm
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
          uploadVideoHandle={uploadVideoHandle}
          updateLesson={updateLesson}
          uploadVideoButton={uploadVideoButton}
          videoProgress={videoProgress}
          videoUploading={videoUploading}
        />
      </Modal>
    </InstructorRoute>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params; // Use `context.params` to get dynamic params
  const res = await fetch(`http://localhost:3000/api/v1/course/${slug}`);
  const courseaaa = await res.json();

  return { props: { courseaaa } };
}

export default EditCourse;
