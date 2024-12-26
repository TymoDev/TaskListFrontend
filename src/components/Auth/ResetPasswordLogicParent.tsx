import React, { useState } from "react";
export const useResetPasswordLogic = () => {
    const [email, setEmail] = useState(""); // Стан для email
    return { email, setEmail };
  };


