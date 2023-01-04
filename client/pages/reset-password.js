import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../context";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import SectionTitle from "@/components/Section/Title";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmNewPassword) {
        return toast.error("Password doesnot match!!!");
      }
      setLoading(true);
      const { data } = await axios.post("/api/v1/reset-password", {
        email,
        resetCode,
        newPassword,
      });
      toast.success("Your password has been changed successfully");
      setLoading(false);
      setEmail("");
      setResetCode("");
      setNewPassword("");
      setConfirmNewPassword("");
      if (data.ok) router.push("/login");
    } catch (err) {
      toast.error(err.response.data.error);
      setLoading(false);
    }
  };

  return (
    <div className='container my-5'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-6 card p-5'>
          <SectionTitle titleName={"Reset Password"} />
          <p>Please, check your email for the password reset code</p>
          <div className='auth-form pt-3 pb-4'>
            <form className='d-grid gap-3' onSubmit={handleSubmit}>
              <div className='auth-input-wrapper'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <div className='auth-input'>
                  <input
                    type='email'
                    className='form-control px-4'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    required
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className='auth-input-wrapper'>
                <label htmlFor='resetCode' className='form-label'>
                  Reset Code
                </label>
                <div className='auth-input'>
                  <input
                    type='text'
                    className='form-control px-4'
                    id='resetCode'
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder='Enter reset code'
                    required
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className='auth-input-wrapper'>
                <label htmlFor='newPassword' className='form-label'>
                  New Password
                </label>
                <div className='auth-input'>
                  <input
                    type='text'
                    className='form-control px-4'
                    id='newPassword'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='Enter new password'
                    required
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className='auth-input-wrapper'>
                <label htmlFor='confirmNewPassword' className='form-label'>
                  Confirm New Password
                </label>
                <div className='auth-input'>
                  <input
                    type='text'
                    className='form-control px-4'
                    id='confirmNewPassword'
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder='Enter confirm password'
                    required
                    autoComplete='off'
                  />
                </div>
              </div>

              <button type='submit' className='btn btn-primary btn-lg'>
                {loading ? <AiOutlineLoading3Quarters /> : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
