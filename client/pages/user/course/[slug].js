import UserRoute from "@/components/Routes/UserRoute";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SingleUserCourse = () => {
  const [course, setCourse] = useState({ lessons: [] });

  //   useEffect(() => {
  //     setValues(course);
  //   }, []);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/v1/course/user/${slug}`);
    setCourse(data);
  };

  return <UserRoute>Hello</UserRoute>;
};

// export async function getServerSideProps(context) {
//   const { slug } = context.params;
//   const res = await fetch(`${process.env.BACKEND_API}/course/user/${slug}`);
//   const course = await res.json();

//   return { props: { course } };
// }

export default SingleUserCourse;
