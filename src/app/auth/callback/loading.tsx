import { Spinner } from "@/components/global/Loader/Spinner";
import React from "react";

const AuthLoading = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <Spinner />
    </div>
  );
};

export default AuthLoading;
