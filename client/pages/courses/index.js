import HtmlHead from "@/components/Head";
import CourseSection from "@/components/Home/CourseSection";
import axios from "axios";
import { useState, useEffect } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    allCourses();
  }, []);

  //get all courses
  const allCourses = async () => {
    const { data } = await axios.get("/api/v1/course/all");
    setCourses(data);
  };
  return (
    <>
      <HtmlHead title='Courses - Online Learning Platform' />
      <CourseSection courses={courses} />
    </>
  );
};

export default Courses;
