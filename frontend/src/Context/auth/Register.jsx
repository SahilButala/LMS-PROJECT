import { Skeleton } from "@/components/ui/skeleton";
import { RegisterInData, SigneInData } from "@/config";
import {
  CheckAuthinticated,
  LoginUser,
  registerUser,
} from "@/services/api-services";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LoginRegister = createContext(null);

export function LoginRegisterProvider({ children }) {
  // all variables
  const [signeInData, setSigneindata] = useState(SigneInData);
  const [RegisterData, setRegisterdata] = useState(RegisterInData);
  const [auth, setAuth] = useState({
    authinticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // all functions
  async function handleRegister(e) {
    e.preventDefault();
    const data = await registerUser(RegisterData);
    if (data.success) {
      toast.success(data?.message);
      navigate("/home");
    } else {
      toast.error(data.message);
    }
  }
  async function handleLogin(e) {
    e.preventDefault();
    const data = await LoginUser(signeInData);  
    if (data.success) {
      toast.success(data?.message);
      sessionStorage.setItem("token", JSON.stringify(data.data.token));
      setAuth({
        authinticate: true,
        user: data.data.user,
      });
    } else {
      toast.error(data.message);
      setAuth({
        authinticate: false,
        user: null,
      });
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/auth"); // Redirect to auth page if token is not present
    }
  }, [navigate]);

  // check authinticated or not function
  const checkauth = async () => {
    const data = await CheckAuthinticated();

    if (data.success) {
      setAuth({
        authinticate: true,
        user: data.data.user,
      });
      setLoading(false);
    } else {
      setAuth({
        authinticate: false,
        user: null,
      });
      setLoading(false);
    }
  };

  // clear credentials when user are  click logout btn
  const resetCreadentials = () => {
    setAuth({
      authinticate: false,
      user: null,
    });
    sessionStorage.clear();
  };

  useEffect(() => {
    checkauth();
  }, []);

  return (
    <LoginRegister.Provider
      value={{
        signeInData,
        setSigneindata,
        RegisterData,
        setRegisterdata,
        handleRegister,
        handleLogin,
        auth,
        resetCreadentials,
      }}
    >
      {loading ? <Skeleton /> : children}
    </LoginRegister.Provider>
  );
}
