import { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import axios from "axios";
import { List, Avatar } from "antd";
import { AiTwotoneDelete } from "react-icons/ai";
import SectionTitle from "@/components/Section/Title";
import InstructorRoute from "@/components/Routes/InstructorRoute";
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

      <div className='row mt-5 pb-5'>
        <div className='col lesson-list'>
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
                  onClick={() => {
                    setVisible(true);
                    setCurrentLesson(item);
                  }}
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                ></Item.Meta>

                <AiTwotoneDelete
                  onClick={() => deleteLesson(index)}
                  className='text-danger float-right fs-3'
                />
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

export default EditCourse;
