import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import UserNav from "../Nav/UserNav";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  //get the current login user
  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/v1/current-user");
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push(`${process.env.NEXT_PUBLIC_URL}/login`);
    }
  };

  return (
    <>
      {!ok ? (
        <div className='my-4 d-flex justify-content-center'>
          <ImSpinner9 className='fs-1' />
        </div>
      ) : (
        <div className='container-fluid my-4'>
          <div className='row'>
            <div className='col-md-2'>
              <UserNav />
            </div>
            <div className='col-md-10 px-4'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRoute;
