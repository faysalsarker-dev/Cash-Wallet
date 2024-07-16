import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

export default function SignIn() {
  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [imgC, setImgC] = useState(false);
  const [err, setErr] = useState(false);

  const { createUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let imgData;
      if (imgC) {
        const formData = new FormData();
        formData.append("image", img);

        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=282254e4f4a6394581df08e10d438979`,
          formData
        );
        imgData = response.data;
      }

      const info = {
        name: data.name,
        email: data.email, 
        password: data.password,
        image: imgData?.data.display_url,
      };

      const result = await createUser(info);
      console.log(result);

      if (result.data.insertedId) {
        // Save user info to localStorage
        localStorage.setItem('user', JSON.stringify(info));

        toast.success("Registration successful!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again later.");
    }
  };

  const handleImg = (event) => {
    setImgC(true);
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    setImg(file);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card color="white" shadow={true} className="p-8 rounded-lg w-full max-w-md">
        <Typography variant="h4" color="primary" className="text-center mb-6">
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-full mx-auto">
          <div className="text-center relative mb-6">
            <label
              htmlFor="fileInput"
              className="flex flex-col items-center justify-center w-24 h-24 bg-gray-200 rounded-full cursor-pointer mx-auto"
            >
              {imageUrl ? (
                <img src={imageUrl} alt="Uploaded" className="w-full h-full rounded-full" />
              ) : (
                <>
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    alt="Uploaded"
                    className="w-full h-full m-auto rounded-full"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 absolute bottom-0 ml-12 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </>
              )}
              <input
                id="fileInput"
                type="file"
                onChange={handleImg}
                className="hidden"
              />
            </label>
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Full Name
            </Typography>
            <Input
              {...register("name", { required: true })}
              size="lg"
              placeholder="Your Name"
              className="!border-t-blue-gray-200 focus:!border-primary"
              labelProps={{ className: "before:content-none after:content-none" }}
            />
            {errors.name && <span className="text-red-600">Name is required</span>}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email / Number
            </Typography>
            <Input
              {...register("email", { required: true })}
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-primary"
              labelProps={{ className: "before:content-none after:content-none" }}
            />
            {errors.email && <span className="text-red-600">Email is required</span>}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-primary"
                labelProps={{ className: "before:content-none after:content-none" }}
                {...register("password", {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
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
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be at least 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">Password must be less than 20 characters</p>
            )}
          </div>

          {err && <p className="text-red-600">{err}</p>}

          <Button
            type="submit"
            className="mt-6 bg-primary"
            fullWidth
            variant="filled"
          >
            Sign Up
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?
            <Link to="/login" className="font-medium text-primary">
              {" "}
              Log In
            </Link>
          </Typography>

          <div className="flex justify-center mt-4">
            <h2 className="text-secondary">OR</h2>
          </div>
        </form>
      </Card>
    </div>
  );
}
