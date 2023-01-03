import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import {
  AiOutlineMail,
  AiFillEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { Context } from "../../context";
import SectionTitle from "../Section/Title";

const SignIn = ({ title }) => {
  const [email, setEmail] = useState("sumanstha999@gmail.com");
  const [password, setPassword] = useState("sumancfc1905");
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(`/api/v1/login`, {
        email,
        password,
      });

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      window.localStorage.setItem("user", JSON.stringify(data));

      toast.success("Login Success");
      setLoading(false);
      router.push("/");
    } catch (err) {
      toast.error(err.response.data.error);
      setLoading(false);
    }
  };

  return (
    <main>
      <section className='auth-area pt-8 pb-8'>
        <div className='container'>
          <div className='row d-flex justify-content-center'>
            {/* page title */}
            <SectionTitle titleName={title} />
            {/* auth form */}
            <div className='col-md-8'>
              <div className='auth-form'>
                <form className='d-grid gap-3' onSubmit={handleSubmit}>
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

                  <button type='submit' className='btn btn-primary btn-lg'>
                    {loading ? <AiOutlineLoading3Quarters /> : "Login"}
                  </button>
                </form>
              </div>

              <div className='text-center mt-4'>
                Don't hava an account?{" "}
                <Link href='/register'>Create an Account</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
