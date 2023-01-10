import { useState, useEffect } from "react";
import axios from "axios";
import AboutSection from "@/components/Home/AboutSection";
import CategorySection from "@/components/Home/CategorySection";
import CourseSection from "@/components/Home/CourseSection";
import Hero from "@/components/Home/Hero";
import HtmlHead from "@/components/Head";

const Home = ({ courses }) => {
  // const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // allCourses();
    allCategories();
  }, []);

  //get all courses
  // const allCourses = async () => {
  //   const { data } = await axios.get("/api/v1/course/all");
  //   setCourses(data);
  // };
  //get all categories
  const allCategories = async () => {
    const { data } = await axios.get("/api/v1/category/all");
    setCategories(data);
  };

  return (
    <>
      <HtmlHead title='Online Learning Platform' />

      <Hero />

      <CategorySection categories={categories} />

      <AboutSection />

      <CourseSection courses={courses} />
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BACKEND_API}/course/all`);

  const courses = await res.json();

  return { props: { courses } };
}
export default Home;
