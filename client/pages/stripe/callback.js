import { useContext, useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { Context } from "@/context/index";
import { toast } from "react-toastify";

const Callback = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      accountStatus();
    }
  }, [user]);

  //get instructor stripe account status
  const accountStatus = async () => {
    try {
      const { data } = await axios.post("/api/v1/account-status");
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      console.log(data);

      window.localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/instructor";
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className='container my-5'>
      <div className='row d-flex justify-content-center'>
        <FaSpinner style={{ fontSize: "60px" }} />
      </div>
    </div>
  );
};

export default Callback;
