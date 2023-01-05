import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerifyID = () => {
  const [validUrl, setValidUrl] = useState(false);

  const router = useRouter();
  const {
    query: { id },
  } = router;

  console.log(id);

  useEffect(() => {
    verifyEmailUrl();
  }, [id]);

  const verifyEmailUrl = async () => {
    try {
      const { data } = await axios.get(`/api/v1/verify/${id}`);
      toast.success(data.message);
      console.log(data);
      console.log("User id inside verifyemail", id);
      setValidUrl(true);
      setTimeout(() => {
        router.push("/login");
      }, 4000);
    } catch (err) {
      console.log(err);
      setValidUrl(false);
    }
  };

  return (
    <>
      {validUrl ? (
        <div className='container'>
          <div className='row'>
            <p>Your will redirect to login page.</p>
          </div>
        </div>
      ) : (
        <h1>404 Link Not Found</h1>
      )}
    </>
  );
};

export default EmailVerifyID;
