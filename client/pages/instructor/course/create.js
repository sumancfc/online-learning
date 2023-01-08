import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import axios from "axios";
import SectionTitle from "@/components/Section/Title";
import InstructorRoute from "@/components/Routes/InstructorRoute";
import CreateCourseForm from "@/components/Forms/CreateCourseForm";

const CreateCourse = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    paid: true,
    price: "9.99",
    category: "",
    loading: false,
  });

  const [image, setImage] = useState({});
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadButton, setUploadButton] = useState("Image Upload");

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

  const router = useRouter();

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
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast.error("Image Upload Failed.");
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
  const createCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/course/create", {
        ...values,
        image,
      });
      toast.success("Course Created");
      router.push("/instructor");
      console.log("Create Course Success", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <InstructorRoute>
      <SectionTitle titleName={"Create Course"} />
      <CreateCourseForm
        values={values}
        setValues={setValues}
        image={image}
        categories={categories}
        imagePreview={imagePreview}
        uploadButton={uploadButton}
        handleStateChange={handleStateChange}
        handleImageUpload={handleImageUpload}
        handleImageRemove={handleImageRemove}
        createCourse={createCourse}
      />
    </InstructorRoute>
  );
};

export default CreateCourse;
