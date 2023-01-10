import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import AboutSection from "@/components/Home/AboutSection";
import CategorySection from "@/components/Home/CategorySection";
import CourseSection from "@/components/Home/CourseSection";
import Hero from "@/components/Home/Hero";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    allCourses();
  }, []);

  useEffect(() => {
    allCategories();
  }, []);

  //get all courses
  const allCourses = async () => {
    const { data } = await axios.get("/api/v1/course/all");
    setCourses(data);
  };
  //get all categories
  const allCategories = async () => {
    const { data } = await axios.get("/api/v1/category/all");
    setCategories(data);
  };
  return (
    <>
      <Head>
        <title>Online Learning Course</title>
      </Head>

      <Hero />

      <CategorySection categories={categories} />

      <AboutSection />

      <CourseSection courses={courses} />
    </>
  );
};
export default Home;
