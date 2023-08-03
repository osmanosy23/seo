import { useContext } from "react";
import { AuthContext } from "../context/auth";

const Navbar = () => {
  const { user, isLoading, signOut } = useContext(AuthContext);

  const handleLogout = () => {
    signOut()
      .then(() => {
        // Optional: Handle successful logout, if needed
        console.log("User logged out successfully");
      })
      .catch((error) => {
        // Optional: Handle logout errors, if needed
        console.error("Error during logout:", error);
      });
  };

  const nickname = localStorage.getItem("nickname");

  return (
  <div className="navbar bg-base-100 justify-between">
    <a className="font-bold btn btn-ghost normal-case text-3xl">GalleryPro 📷</a>
    {user ? (
      <div className="flex items-center">
      {nickname && <span className="text-base-content mr-4">Welcome, {nickname}!</span>}
       {/* <p className="text-white">Welcome, {nickname ? nickname : user.email}</p> */}
      <button className="btn btn-primary btn-sm" onClick={handleLogout}>
        Logout
      </button>
      </div>  
      ) : (
        // Optionally, show a login button or other content if the user is not logged in
        <button className="btn btn-primary btn-sm">Login</button>
      )}
  </div>
  );
};

export default Navbar;