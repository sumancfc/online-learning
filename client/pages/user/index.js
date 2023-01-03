import { useContext } from "react";
import UserRoute from "@/components/Routes/UserRoute";
import { Context } from "../../context";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className='jumbotron text-center square'>User dashboard</h1>
    </UserRoute>
  );
};

export default UserIndex;
