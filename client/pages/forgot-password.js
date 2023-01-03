import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../context";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
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
      setLoading(true);
      const { data } = await axios.post("/api/v1/forgot-password", { email });
      toast.success("Password reset code has been sent to your email.");
      setLoading(false);
      setEmail("");
      if (data.ok) router.push("/reset-password");
    } catch (err) {
      toast.error(err.response.data.error);
      setLoading(false);
    }
  };
  return (
    <div className='container my-5'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-6 card p-5'>
          <h4>Forgot Password</h4>
          <p>
            If you forgot your password, well, then we’ll email you instructions
            to reset your password.
          </p>
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

              <button type='submit' className='btn btn-primary btn-lg'>
                {loading ? <AiOutlineLoading3Quarters /> : "Send Reset Code"}
              </button>
            </form>
          </div>

          <Link href='/login' className='text-danger'>
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
