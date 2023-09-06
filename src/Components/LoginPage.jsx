import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase.js';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function LoginPage() {

    let [email, setEmail] = useState("");
    let [pass, setPass] = useState("");

    let navigate = useNavigate();

    let handleLogin = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, pass);
        navigate("/homepage");
      } catch (error) {
        console.error("Login error:", error);
        alert("Invalid Credentials");
      }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Login with your credentials</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email Address"
            onChange={(e) => {
                setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
                setPass(e.target.value);
            }}
          />
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <p className="mt-4 text-center">
          New Here?{" "}
          <Link to={"/signup"}>
            <a className="text-blue-500 hover:underline">Signup</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
