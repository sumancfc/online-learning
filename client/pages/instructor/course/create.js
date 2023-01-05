import { useState, useEffect } from "react";
import InstructorRoute from "@/components/Routes/InstructorRoute";
import { useRouter } from "next/router";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import SectionTitle from "@/components/Section/Title";
import { AiOutlineLoading3Quarters, AiOutlineMail } from "react-icons/ai";
import axios from "axios";
import Avatar from "@/components/Avatar";

const CreateCourse = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    paid: false,
    price: "9.99",
    uploading: false,
    category: "Choose a Category",
    loading: false,
  });

  const { name, description, price, uploading, paid, category, loading } =
    values;
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

  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<option value={i.toFixed(2)}>${i.toFixed(2)}</option>);
  }

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
        toast.error("Image upload failed. Try later.");
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
      toast.error("Image upload failed. Try Again.");
    }
  };

  // handle the create course
  const createCourse = async (e) => {
    e.preventDefault();
    // try {
    //   await axios.post("/api/course", {
    //     ...values,
    //     image,
    //   });
    //   toast.success("Great! Now you can start adding lessons");
    //   router.push("/instructor");
    // } catch (err) {
    //   toast.error(err.response.data);
    // }
  };

  return (
    <InstructorRoute>
      <SectionTitle titleName={"Create Course"} />
      <div className='auth-form pt-3'>
        <form className='d-grid gap-3' onSubmit={createCourse}>
          <div className='auth-input-wrapper'>
            <div className='auth-input'>
              <input
                type='text'
                className='form-control px-3'
                name='name'
                value={name}
                onChange={handleStateChange}
                placeholder='Course Name'
                required
                autoComplete='off'
              />
            </div>
          </div>

          <div className='auth-input-wrapper'>
            <div className='auth-input'>
              <textarea
                className='form-control px-3'
                rows={8}
                cols={8}
                name='description'
                value={description}
                onChange={handleStateChange}
                placeholder='Course Description'
                required
                autoComplete='off'
              ></textarea>
            </div>
          </div>

          <div className='row'>
            <div className={paid ? "col-md-9" : "col-md-12"}>
              <div className='auth-input pb-3'>
                <select
                  className='form-select'
                  value={paid}
                  name='paid'
                  onChange={(v) => setValues({ ...values, paid: !paid })}
                >
                  <option value={true}>Paid Course</option>
                  <option value={false}>Free Course</option>
                </select>
              </div>
            </div>
            <div className='col-md-3'>
              {paid && (
                <div className='auth-input'>
                  <select
                    className='form-select'
                    defaultValue={`$9.99`}
                    // value={paid}
                    onChange={(v) => setValues({ ...values, price: v })}
                  >
                    {children}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className='auth-input-wrapper'>
            <div className='auth-input pb-3'>
              <select
                className='form-select'
                value={category}
                name='category'
                onChange={(e) =>
                  setValues({ ...values, category: e.target.value })
                }
              >
                <option>Please select</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className='row'>
            <div className={image ? "col-md-9" : "col-md-12"}>
              <div className='auth-input'>
                <label className='btn btn-outline-secondary btn-lg form-control'>
                  {uploadButton}
                  <input
                    type='file'
                    name='image'
                    className='form-control'
                    onChange={handleImageUpload}
                    accept='image/*'
                    hidden
                  />
                </label>
              </div>
            </div>
            <div className='col-md-3'>
              {imagePreview && (
                <div className='position-relative'>
                  <Avatar
                    src={imagePreview}
                    width={150}
                    height={80}
                    quality='75'
                    alt={"Image preview for courses"}
                    className='shadow-lg p-3'
                  />
                  <button
                    onClick={handleImageRemove}
                    className='btn  fs-1 text-danger position-absolute '
                  >
                    x
                  </button>
                </div>
              )}
            </div>
          </div>

          <button type='submit' className='btn btn-primary w-25 btn-lg'>
            {loading ? <AiOutlineLoading3Quarters /> : "Create Course"}
          </button>
        </form>
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CreateCourse;
