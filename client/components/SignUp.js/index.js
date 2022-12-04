import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password doesnot match!!!");
    }

    await axios
      .post(`http://localhost:5000/api/v1/register`, {
        name,
        email,
        password,
      })
      .then((response) => {
        toast.success("User register successful. Please verify your email.");
        console.log(response.data.ok);
      })
      .catch((err) => {
        //  console.log(error.response.data);
        toast.error(err.response.data.error);
      });
  };

  return (
    <main>
      <section className='signup-area pt-8 pb-8'>
        <div className='container'>
          <div className='row d-flex justify-content-center'>
            {/* page title */}
            <div className='col-md-8'>
              <div className='section-title-wrapper mb-5 text-center'>
                <h1 className='section-title'>Create a free Account</h1>
              </div>
            </div>
            {/* Signup form */}
            <div className='col-md-8'>
              <div className='signup-form'>
                <form className='d-grid gap-3' onSubmit={handleSubmit}>
                  <div className='signup-input-wrapper'>
                    <label htmlFor='fullName' className='form-label'>
                      Full Name
                    </label>
                    <div className='signup-input'>
                      <i className='fas fa-user' />
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
                  <div className='signup-input-wrapper'>
                    <label htmlFor='email' className='form-label'>
                      Email
                    </label>
                    <div className='signup-input'>
                      <i className='fas fa-envelope' />
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

                  <div className='signup-input-wrapper'>
                    <label htmlFor='password' className='form-label'>
                      Password
                    </label>
                    <div className='signup-input'>
                      <i className='fas fa-eye-slash' />
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

                  <div className='signup-input-wrapper'>
                    <label htmlFor='confirmPassword' className='form-label'>
                      Confirm Password
                    </label>
                    <div className='signup-input'>
                      <i className='fas fa-eye-slash' />
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
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
