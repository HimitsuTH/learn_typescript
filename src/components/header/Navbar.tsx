import axios from "axios";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Token } from "../pages/Login";

type Props = {
  path: boolean;
};

interface User {
  id: string;
  name: string;
  email: string;
}

const navbar = ({ path }: Props) => {
  const [user, setUser] = useState<User>();

  const tokenString = localStorage.getItem("token");
  const token: Token | null = tokenString ? JSON.parse(tokenString) : null;

  const getUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
        "Content-Type": "application/json",
      },
    };
    if (token) {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/user/me`,
        config
      );

      setUser(res.data.user);
      // console.log(token.access_token);
    }
  };

  useEffect(() => {
    getUser();
  }, [token]);

  const handleToken = async () => {
    await localStorage.removeItem("token");
  };

  return (
    <div className="navbar p-2">
      {path ? (
        <Link to={"/"} className="bg-slate-100 p-2 rounded-md">
          back
        </Link>
      ) : token ? (
        <div className="m-2 flex place-items-center">
          <p className="text-white mr-5 select-none">{user?.email}</p>
          <Link
            to={"/user/login"}
            className="bg-slate-100 p-2 rounded-md"
            onClick={handleToken}
          >
            Logout
          </Link>
        </div>
      ) : (
        <Link to={"/user/login"} className="bg-slate-100 p-2 rounded-md">
          sign in
        </Link>
      )}
    </div>
  );
};

export default navbar;
