import { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import axios from "axios";
import SectionTitle from "@/components/Section/Title";
import InstructorRoute from "@/components/Routes/InstructorRoute";
import UpdateCourseForm from "@/components/Forms/updateCourse";

const EditCourse = ({ courseaaa }) => {
  const [values, setValues] = useState(courseaaa);
  const [image, setImage] = useState({});
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadButton, setUploadButton] = useState("Image Upload");

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

  // handle the create course
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
