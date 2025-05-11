"use client"
import React, { useEffect } from "react";
import LoginForm from "../Components/auth/loginForm/LoginForm";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";


function page() {
  const {user} = useUserContext();
  const router = useRouter();
  useEffect(()=>{
    if(user && user.uid){
      router.push("/");
    }
  },[user,router])

  if(user & user.uid){
    return null;
  }
    return (
      <div className="auth-page w-full h-full flex justify-center items-center">
        <LoginForm />
      </div>
    );
  }
  
  export default page;
  