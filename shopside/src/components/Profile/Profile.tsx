import React from "react";
import face from "../../img/face.jpg";

const Profile = () => {
  const user = {
    profilePicture: face,
    name: "Sara Doe",
    email: "sara.doe@example.com",
    bio: "Software developer with a passion for creating amazing applications.",
  };

  return (
    <div className="flex flex-col justify-center items-center text-center border-1 border-solid border-stone-50 py-[2rem] px-[1rem] rounded-[10px] w-[20rem] md:w-[30rem] m-auto mt-[4rem] bg-green-600">
      <img
        src={user.profilePicture}
        alt="Profile"
        className="w-[150px] h-[150px] rounded-[50%] object-cover mb-[15px]"
      />
      <h2 className="my-[10px] mx-[0] text-pink-50">{user.name}</h2>
      <p className="my-[5px] mt-[0] text-pink-50">Email: {user.email}</p>
      <p className="my-[5px] mt-[0] text-pink-50">Bio: {user.bio}</p>
    </div>
  );
};

export default Profile;
