"use client"
import {useUserContext} from "@/context/userContext";
import React from "react";
import IconGoogle from "@/public/icons/IconGoogle";

function LoginForm(){
    const { userState, handlerUserInput,loginUserWithGoogle,loginUser } = useUserContext();
  const { email, password } = userState;
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  
 
  return (
    <form className="relative m-[2rem] px-10 py-14 rounded-lg bg-white w-full max-w-[520px]">
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-[1.35rem] font-medium">
          Login to Your Account
        </h1>
        <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
          Login Now. Don't have an account?{" "}
          <a
            href="/register"
            className="font-bold text-[#00747C] hover:text-[#5C7285] transition-all duration-300"
          >
            Register here
          </a>
        </p>

        <div className="mt-[1rem] flex flex-col">
          <label htmlFor="email" className="mb-1 text-[#999]">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => handlerUserInput("email")(e)}
            name="email"
            className="px-4 py-3 border-[2px] rounded-md outline-[#00747C] text-gray-800"
            placeholder="xyz@abc.com"
          />
        </div>
        <div className="relative mt-[1rem] flex flex-col">
          <label htmlFor="password" className="mb-1 text-[#999]">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => handlerUserInput("password")(e)}
            name="password"
            className="px-4 py-3 border-[2px] rounded-md outline-[#00747C] text-gray-800"
            placeholder="***************"
          />
          <button
            type="button"
            className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
          >
            {showPassword ? (
              <i className="fas fa-eye-slash" onClick={togglePassword}></i>
            ) : (
              <i className="fas fa-eye" onClick={togglePassword}></i>
            )}
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <a
            href="/forgot-password"
            className="font-bold text-[#00747C] text-[14px] hover:text-[#5C7285] transition-all duration-300"
          >
            Forgot password?
          </a>
        </div>
        <div className="flex">
          <button
            type="button"
            disabled={!email || !password}
            onClick={loginUser}
            className="mt-[1.5rem] flex items-center justify-center gap-3 px-4 py-3 font-medium border border-black bg-transparent text-black rounded-md hover:bg-[#5C7285] hover:text-white transition-colors w-full"
            >
            Login Now
          </button>
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={loginUserWithGoogle}
            className="mt-[1.5rem] flex items-center justify-center gap-3 px-4 py-3 font-medium border border-black bg-transparent text-black rounded-md hover:bg-[#5C7285] hover:text-white transition-colors w-full"
            >
            <IconGoogle size={20} />
            Login With Google
          </button>
        </div>


      </div>
      {/* //<img src="/flurry.png" alt="" /> */}
    </form>
  );
}

export default LoginForm;
