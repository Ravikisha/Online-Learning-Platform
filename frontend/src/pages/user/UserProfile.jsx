import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    async function getUserProfile() {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/profile",
        {
          method: "GET",
          credentials: "include",
        },
      );

      return await response.json();
    }

    getUserProfile().then((res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setUserProfile(res.user);
    });
  }, []);
  return (
    <>
      <h1>Protected</h1>
      {userProfile && (
        <div>
          <h2>{userProfile.name}</h2>
          <h2>{userProfile.email}</h2>
        </div>
      )}
    </>
  );
}
