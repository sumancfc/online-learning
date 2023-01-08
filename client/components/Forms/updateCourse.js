import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CustomAvatar from "@/components/Avatar";
import { Avatar } from "antd";

const UpdateCourseForm = ({
  values,
  setValues,
  image,
  categories,
  imagePreview,
  uploadButton,
  handleStateChange,
  handleImageUpload,
  handleImageRemove,
  updateCourse,
}) => {
  const { name, description, price, paid, category, loading } = values;

  // get the price of paid course option
  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(
      <option key={i} value={i.toFixed(2)}>
        ${i.toFixed(2)}
      </option>
    );
  }

  return (
    <div className='auth-form pt-3'>
      <form className='d-grid gap-3' onSubmit={updateCourse}>
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
                onChange={(e) =>
                  setValues({
                    ...values,
                    paid: !paid,
                    price: 0,
                  })
                }
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
                  value={price}
                  name='price'
                  style={{ widht: "100%" }}
                  onChange={(e) =>
                    setValues({ ...values, price: e.target.value })
                  }
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
              value={values.category}
              name='category'
              onChange={(e) =>
                setValues({ ...values, category: e.target.value })
              }
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
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
                <CustomAvatar
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
            {values.image && (
              <CustomAvatar
                width={150}
                height={80}
                quality='75'
                alt={"Image Uploaded"}
                className='shadow-lg p-3'
                src={values.image.Location}
              />
            )}
          </div>
        </div>

        <button
          onClick={updateCourse}
          type='submit'
          className='btn btn-primary w-25 btn-lg'
        >
          {loading ? <AiOutlineLoading3Quarters /> : "Update Course"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCourseForm;
