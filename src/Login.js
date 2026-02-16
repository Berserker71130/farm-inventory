import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaTwitter, FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login page background
  const backgroundImageStyle = {
    backgroundImage: "url('/sunset.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  console.log("THIS IS THE NEW BUILD");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userNameOrEmail,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Login Successful:", data);

        if (data.token) {
          localStorage.setItem("userToken", data.token);
          toast.success("Login Successful! redirecting to dashboard...");
          navigate("/");
        } else {
          toast.error(
            "Login successful, but no token receieved. Please contact support.",
          );
        }
      } else {
        const errorText = await response.text();
        console.error("Login failed (raw response):", errorText);
        let errorMessage =
          "Login failed. Please check your credentials and try again.";
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (jsonError) {}
        toast.error(errorMessage);
      }
    } catch (networkError) {
      console.log("Network error during login:", networkError);
      toast.error(
        "Network error: Could not connect to the server. Please check your connection.",
      );
    }
  };

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={backgroundImageStyle}
    >
      <div className="relative min-h-screen flex items-center justify-center p-4 bg-black/50">
        {/* Login card */}
        <div className="bg-white/30 shadow-2xl rounded-xl px-8 pt-6 pb-8 w-full max-w-md border-t-8 border-[#192A56]">
          <div className="mb-6 text-right">
            <Link
              to="/signup"
              className="text-[#192A56] hover:text-[#FBC531] text-sm font-semibold transition duration-200"
              aria-label="Go to Signup Page"
            >
              Don't have an account?
            </Link>
          </div>
          <h2 className="text-3xl font-serif mb-8 text-center text-[#192A56]">
            FarmWise Login
          </h2>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="username"
                className="block text-[#333333] text-sm font-bold mb-2"
              >
                Username Or Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={userNameOrEmail}
                onChange={(e) => {
                  setUserNameOrEmail(e.target.value);
                }}
                className="shadow-sm border rounded w-full py-2 px-3 text-[#333333] leading-tight focus:outline-none focus:ring-2 focus:ring-[#FBC531] focus:border-[#FBC531] transition duration-150"
                placeholder="Enter Your Username Or Email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[#333333] text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow-sm border rounded w-full py-2 px-3 text-[#333333] leading-tight focus:outline-none focus:ring-2 focus:ring-[#FBC531] focus:border-[#FBC531] transition duration-150"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-600 text-sm">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-[#192A56] border-gray-300 rounded"
                />
                <span className="ml-2">Keep me signed in</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-bold text-[#192A56] hover:text-[#FBC531] transition duration-200"
                aria-label="Forgot Password"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="bg-[#192A56] hover:bg-[#FBC531] text-white hover:text-[#192A56] font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-[#FBC531] w-full shadow-md transition duration-300"
            >
              Login
            </button>

            <div className="border-t border-gray-300 pt-4 mt-6">
              <div className="flex items-center justify-center mb-4">
                <span className="text-gray-600 text-sm font-bold bg-white px-4">
                  Or Login With
                </span>
              </div>

              <div className="flex justify-around">
                <button
                  type="button"
                  className="text-gray-500 hover:text-[#192A56]"
                >
                  <FaGoogle className="w-6 h-6 text-red-500" />
                </button>

                <button
                  type="button"
                  className="text-gray-500 hover:text-[#192A56]"
                >
                  <FaTwitter className="w-6 h-6 mr-2 text-blue-400" />
                </button>

                <button
                  type="button"
                  className="text-gray-500 hover:text-[#192A56]"
                >
                  <FaFacebook className="w-6 h-6 text-blue-600" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
