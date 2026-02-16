import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [description, setDescription] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [organizationPhone, setOrganizationPhone] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [roleIds, setRoleIds] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/v1/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: organizationName,
          description,
          email: organizationEmail,
          phone: organizationPhone,
          userRequest: {
            firstName,
            lastName,
            middleName,
            username: userName,
            email,
            address,
            phone,
            password,
          },
        }),
      });

      if (response.ok) {
        toast.success("Account created successfully! You can now log in.");
        navigate("/");
      } else {
        const errorData = await response.json();
        let errorMessage = "Failed to create account. Please try again.";
        if (errorData.message) errorMessage = errorData.message;
        else if (errorData.errors) {
          const validationMessages = errorData.errors
            .map((err) => err.message)
            .join(", ");
          errorMessage = `Validation failed: ${validationMessages}`;
        }
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Network error during user creation:", error);
      toast.error(
        "Network error: Could not connect to the server. Check your internet and try again.",
      );
    }
  };

  const inputClassName =
    "shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-[#333333] leading-tight focus:outline-none focus:ring-2 focus:ring-[#FBC531] focus:border-[#FBC531] transition duration-150";

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/sunset.jpg')" }}
    >
      <div className="relative min-h-screen flex items-center justify-center p-4 bg-black/50">
        <div className="bg-white/30 backdrop-blur-sm shadow-2xl rounded-xl p-8 w-full max-w-3xl border-t-8 border-[#192A56]">
          <div className="mb-6 text-right">
            <Link
              to="/login"
              className="text-gray-200 hover:text-[#FBC531] text-sm font-semibold transition duration-200"
              aria-label="Go to Login Page"
            >
              Already have an account
            </Link>
          </div>

          <h2 className="text-3xl font-serif mb-8 text-center text-white">
            Register for FarmWise
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* User account information */}
            <div className="p-4 bg-black/10 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-200/50 pb-2">
                User Account Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClassName}
                    placeholder="Enter First Name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="middleName"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middleName"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className={inputClassName}
                    placeholder="Enter Middle Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={inputClassName}
                    placeholder="Enter Last Name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="userName"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className={inputClassName}
                    placeholder="Enter Username"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClassName}
                    placeholder="Enter Email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClassName}
                    placeholder="Enter Phone Number"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-white text-sm font-bold mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputClassName}
                  placeholder="Enter Address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClassName}
                    placeholder="Enter Password"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClassName}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Organization Information */}
            <div className="p-4 bg-black/10 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-200/50 pb-2">
                Organization Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="organizationName"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Organization Name*
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className={inputClassName}
                    placeholder="e.g FarmWise Ltd"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Description
                  </label>
                  <input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={inputClassName}
                    placeholder="Brief description of your farm business"
                  />
                </div>

                <div>
                  <label
                    htmlFor="organizationEmail"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Organization Email*
                  </label>
                  <input
                    type="email"
                    id="organizationEmail"
                    value={organizationEmail}
                    onChange={(e) => setOrganizationEmail(e.target.value)}
                    className={inputClassName}
                    placeholder="Enter Organization Email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="organizationPhone"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Organization Phone*
                  </label>
                  <input
                    type="tel"
                    id="organizationPhone"
                    className={inputClassName}
                    placeholder="Enter Organization Phone"
                    required
                    value={organizationPhone}
                    onChange={(e) => setOrganizationPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* User Role & Organization Link */}
            <div className="p-4 bg-black/10 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-200/50 pb-2">
                User Role & Organization Link
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="organizationId"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Organization ID (From API)
                  </label>
                  <input
                    type="number"
                    id="organizationId"
                    className={inputClassName}
                    value={organizationId}
                    onChange={(e) => setOrganizationId(e.target.value)}
                    placeholder="e.g 9007199254740991"
                  />
                </div>

                <div>
                  <label
                    htmlFor="roleIds"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Role ID (From API)
                  </label>
                  <input
                    type="number"
                    id="roleIds"
                    className={inputClassName}
                    value={roleIds}
                    onChange={(e) => setRoleIds(e.target.value)}
                    placeholder="e.g 9007199254740991"
                  />
                </div>
              </div>
            </div>

            {/* Terms And Conditions */}
            <div className="pt-2 text-sm text-gray-200 text-center">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-[#FBC531] hover:underline">
                Terms of service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-[#FBC531] hover:underline">
                Privacy Policy
              </Link>
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-[#192A56] hover:bg-[#FBC531] text-white hover:text-[#192A56] font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-[#FBC531] shadow-md transition duration-300"
            >
              Create Account
            </button>

            {/* Social login simplified */}
            <div className="border-t border-gray-200/50 pt-4 mt-6">
              <div className="flex items-center justify-center mb-4">
                <span className="text-white text-sm font-semibold bg-transparent px-4">
                  Or SignUp With
                </span>
              </div>
              <div className="flex justify-around">
                <button className="text-gray-100 hover:text-[#FBC531]">
                  <FaGoogle className="w-6 h-6 text-red-500" />
                </button>

                <button className="text-gray-100 hover:text-[#FBC531]">
                  <FaTwitter className="w-6 h-6 text-blue-400" />
                </button>

                <button className="text-gray-100 hover:text-[#FBC531]">
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

export default SignUp;
