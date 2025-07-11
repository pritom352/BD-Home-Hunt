import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);
    login(email, password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-4">DreamHome Realty</h1>
        <p className="text-lg">
          Welcome back! Please login to explore and manage your dream
          properties.
        </p>
        <p className="text-lg mt-2">
          Find, Wishlist, and Buy verified properties hassle-free.
        </p>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to your account
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded pr-10"
                  required
                  name="password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>

            <p className="text-center">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </form>

          {/* Optional: Social Login */}
          <div className="mt-6 text-center">
            <p>or login with</p>
            <button
              onClick={handleGoogleLogin}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
