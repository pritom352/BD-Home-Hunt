import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { saveUserInDb } from "../../api/utils";
import Lottie from "lottie-react";
import loginAnimetion from "../../assets/Login Character Animation.json";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await login(email, password);

      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };

      await saveUserInDb(userData);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };

      await saveUserInDb(userData);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}

      <div className=" hidden md:block ">
        <Lottie
          animationData={loginAnimetion}
          loop={true}
          className="w-100 h-100 lg:w-150 lg:h-150"
        />
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 md:flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md  p-10 rounded-2xl shadow-2xl">
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
              className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          {/* Optional: Social Login */}
          <div className=" text-center">
            <button
              onClick={handleGoogleLogin}
              className="mt-2 bg-primary w-full text-white px-4 py-2 rounded"
            >
              Login with Google
            </button>
          </div>
          <p className="text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
