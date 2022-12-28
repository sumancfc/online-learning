import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Context } from "../../context";

const UserRoute = () => {
  const [ok, setOk] = useState(false);

  // const {
  //   state: { user },
  // } = useContext(Context);

  // console.log(user);

  const router = useRouter();

  // useEffect(() => {
  //   getUser();
  // }, []);

  // //get the current login user
  // const getUser = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:5000/api/v1/current-user"
  //     );

  //     console.log("User Page", data);

  //     console.log(data);
  //     if (data.ok) setOk(true);
  //   } catch (err) {
  //     console.log(err);
  //     setOk(false);
  //     router.push(`${process.env.NEXT_PUBLIC_URL}/login`);
  //   }
  // };

  return <h1>Hello From User</h1>;
};

export default UserRoute;
