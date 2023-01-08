import { useEffect, useState } from "react";
import axios from "axios";
import InstructorRoute from "@/components/Routes/InstructorRoute";
import SectionTitle from "@/components/Section/Title";
import CustomAvatar from "@/components/Avatar";
import Link from "next/link";

const Instructor = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCoursesByInstructor();
  }, []);

  const getAllCoursesByInstructor = async () => {
    try {
      const { data } = await axios.get("/api/v1/courses-by-instructor");
      // console.log(data);
      setCourses(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <InstructorRoute>
      <SectionTitle titleName={"Dashboard"} />
      <div className='col-md-12'>
        <h3>My Courses</h3>

        <table className='table my-3'>
          <thead>
            <tr>
              <th scope='col'>S.N</th>
              <th scope='col'>Title</th>
              <th scope='col'>Category</th>
              <th scope='col'>Lesson</th>
              <th scope='col'>Image</th>
              <th scope='col'>Status</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses &&
              courses.map((course, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <Link href={`/instructor/course/view/${course.slug}`}>
                        {course.name}
                      </Link>
                    </td>
                    <td>{course.category.name}</td>
                    <td>{course.lessons.length}</td>
                    <td>
                      <CustomAvatar
                        src={
                          course.image
                            ? course.image.Location
                            : "/img/default.jpg"
                        }
                        width={50}
                        height={50}
                        quality={100}
                        alt={course.name}
                        className='rounded-circle'
                      />
                    </td>
                    <td>
                      {course.published ? (
                        <small className='text-success'>Published</small>
                      ) : (
                        <small className='text-danger'>Unpublished</small>
                      )}
                    </td>
                    <td>
                      <Link
                        href={`/instructor/course/view/${course.slug}`}
                        className='btn btn-primary mx-1'
                      >
                        View
                      </Link>
                      <Link
                        href={`/instructor/course/update/${course.slug}`}
                        className='btn btn-secondary'
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </InstructorRoute>
  );
};

export default Instructor;
