import { useState } from "react";
import InstructorRoute from "@/components/Routes/InstructorRoute";
import Avatar from "@/components/Avatar";

const ViewCourse = ({ course }) => {
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadButton, setUploadButton] = useState("Upload Video");
  const [videoInProgress, setVideoInProgress] = useState(0);

  return (
    <InstructorRoute>
      {
        <div className='d-flex gap-5'>
          <Avatar
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
    </InstructorRoute>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params; // Use `context.params` to get dynamic params
  const res = await fetch(`http://localhost:3000/api/v1/course/${slug}`); // Using `restcountries.com` as `restcountries.eu` is no longer accessible
  const course = await res.json();
  // Get first item in array returned from API

  return { props: { course } };
}

export default ViewCourse;
