import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import {
  AiOutlineUserAdd,
  AiOutlineMail,
  AiFillEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { Context } from "../../context";
import SectionTitle from "../Section/Title";

const SignUp = ({ title }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        return toast.error("Password doesnot match!!!");
      }
      setLoading(true);

      await axios.post(`api/v1/register`, {
        name,
        email,
        password,
      });

      toast.success("User register successful. Please verify your email.");
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response.data.error);
      setLoading(false);
    }
  };

  return (
    <div className='container my-5'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-6 card p-5'>
          {/* page title */}
          <SectionTitle titleName={title} />
          {/* auth form */}
          <div className='auth-form pt-3'>
            <form className='d-grid gap-3' onSubmit={handleSubmit}>
              <div className='auth-input-wrapper'>
                <label htmlFor='fullName' className='form-label'>
                  Full Name
                </label>
                <div className='auth-input'>
                  <AiOutlineUserAdd />
                  <input
                    type='text'
                    className='form-control'
                    id='fullName'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter your fullname'
                    required
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className='auth-input-wrapper'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <div className='auth-input'>
                  <AiOutlineMail />
                  <input
                    type='email'
                    className='form-control'
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
                <label htmlFor='password' className='form-label'>
                  Password
                </label>
                <div className='auth-input'>
                  <AiFillEyeInvisible />
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    required
                  />
                </div>
              </div>

              <div className='auth-input-wrapper'>
                <label htmlFor='confirmPassword' className='form-label'>
                  Confirm Password
                </label>
                <div className='auth-input'>
                  <AiFillEyeInvisible />
                  <input
                    type='password'
                    className='form-control'
                    id='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Enter confirm password'
                    required
                  />
                </div>
              </div>

              <button type='submit' className='btn btn-primary btn-lg'>
                {loading ? <AiOutlineLoading3Quarters /> : "Create an Account"}
              </button>
            </form>
          </div>

          <div className='text-center mt-4'>
            Already hava an account? <Link href='/login'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
