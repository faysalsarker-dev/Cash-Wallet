import { Button, Card, Input, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuth from "../hook/useAuth";

const Login = () => {
  const { Login, user, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (data) => {
    try {
      await Login(data.email, data.password);
      toast.success("Login successful");
      navigate("/");
      reset();
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card color="transparent" shadow={false} className="p-8">
        <Typography variant="h4" color="primary" className="text-center">
          Log In
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray">
              Email / Number
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-primary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("email", {
                required: "Email is required",
                pattern: {
              
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
            <Typography variant="h6" color="blue-gray">
              PIN
            </Typography>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-primary pr-10"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="mt-6 bg-primary"
            fullWidth
            variant="filled"
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            New here?
            <Link to="/register" className="font-medium text-primary ml-2">
              Register
            </Link>
          </Typography>
          <div className="flex justify-center mt-4">
            <Typography variant="h6" color="blue-gray">
              OR
            </Typography>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
