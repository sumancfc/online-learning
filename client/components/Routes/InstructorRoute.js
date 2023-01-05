import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import InstructorNav from "../Nav/InstructorNav";

const InstructorRoute = ({ children }) => {
  const [ok, setOk] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getCurrentInstructor();
  }, []);

  //get the current login user
  const getCurrentInstructor = async () => {
    try {
      const { data } = await axios.get("/api/v1/current-instructor");
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push(`${process.env.NEXT_PUBLIC_URL}/`);
    }
  };

  return (
    <>
      {!ok ? (
        <div className='my-4 d-flex justify-content-center'>
          <ImSpinner9 className='fs-1' />
        </div>
      ) : (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-2'>
              <InstructorNav />
            </div>
            <div className='col-md-10'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructorRoute;
