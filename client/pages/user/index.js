import { useEffect, useState } from "react";
import axios from "axios";
import UserRoute from "@/components/Routes/UserRoute";
import SectionTitle from "@/components/Section/Title";
import CustomAvatar from "@/components/Avatar";
import Link from "next/link";

const UserIndex = () => {
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const getUserAllCourses = async () => {
      try {
        const { data } = await axios.get("/api/v1/course/user-course");
        console.log(data);
        setAllCourses(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserAllCourses();
  }, []);

  console.log(allCourses);
  return (
    <UserRoute>
      <SectionTitle titleName={"My Courses"} />
      <div className='col-md-12'>
        <table className='table my-3'>
          <thead>
            <tr>
              <th scope='col'>S.N</th>
              <th scope='col'>Title</th>
              <th scope='col'>Category</th>
              <th scope='col'>Lesson</th>
              <th scope='col'>Image</th>
            </tr>
          </thead>

          <tbody>
            {allCourses &&
              allCourses.map((course, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <Link href={`/user/course/${course.slug}`}>
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
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </UserRoute>
  );
};

export default UserIndex;
