import React, { useState } from "react";
export const useResetPasswordLogic = () => {
    const [email, setEmail] = useState(""); 
    return { email, setEmail };
  };


