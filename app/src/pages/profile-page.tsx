import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();

  return <>Username: {username}</>;
};

export default ProfilePage;
