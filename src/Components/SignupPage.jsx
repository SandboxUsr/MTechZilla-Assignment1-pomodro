import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";

export default function () {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");
  let [confirm, setConfirm] = useState("");

  let auth = getAuth();
  let navigate = useNavigate();

  let handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error while registering!! Try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create your Account</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Name:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm"
          >
            Confirm Password:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
          />
          {pass !== confirm && (
            <p className="text-red-500">Password does not match</p>
          )}
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleRegister}
            disabled={pass !== confirm}
          >
            Register
          </button>
        </div>
        <p className="mt-4 text-center">
          Already have Account?{" "}
          <Link to={"/"}>
            <a className="text-blue-500 hover:underline">Login</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
