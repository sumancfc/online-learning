import { useContext } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "@/context/index";

const BecomeAInstructor = () => {
  const {
    state: { user },
  } = useContext(Context);

  const becomeAInstructor = async () => {
    try {
      const { data } = await axios.post("/api/v1/create-instructor");

      window.location.href = data;
    } catch (err) {
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className='container my-5'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-6 text-center card py-5'>
          <div>
            <FaUserGraduate style={{ fontSize: "60px" }} />
            <h1 className='pt-3' style={{ fontWeight: "bold" }}>
              Become a Instructor
            </h1>

            <h3>Setup payout to publish courses online</h3>
            <p className='lead text-danger mb-4'>
              Using stripe transfer your earning into your bank account
            </p>

            <button
              type='button'
              className='btn btn-success'
              onClick={becomeAInstructor}
              disabled={user && user.role && user.role.includes("Instructor")}
            >
              Setup Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeAInstructor;
