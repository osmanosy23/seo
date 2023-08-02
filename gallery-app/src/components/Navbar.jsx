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

  return (
  <div className="navbar bg-base-100 justify-between">
    <a className="font-bold btn btn-ghost normal-case text-xl">GalleryPro 📷</a>
    {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        // Optionally, show a login button or other content if the user is not logged in
        <button>Login</button>
      )}
  </div>
  );
};

export default Navbar;