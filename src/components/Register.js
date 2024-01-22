"use client";
import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  // State to manage input values and errors
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    cpassword: "",
  });

  const [message, setMessage] = useState("");

  // Validation function
  const validateForm = () => {
    let isValid = true;

    const newErrors = {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      cpassword: "",
    };

    // Validation logic for each field
    if (formData.firstname.trim() === "") {
      newErrors.firstname = "First name is required";
      isValid = false;
    }
    if (formData.lastname.trim() === "") {
      newErrors.lastname = "Last name is required";
      isValid = false;
    }

    if (formData.username.trim() === "") {
      newErrors.username = "Username is required";
      isValid = false;
    }
    // Email validation
    if (!isEmailValid(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }
    // Password strength validation
    if (!isStrongPassword(formData.password)) {
      newErrors.password = "Password is not strong enough";
      isValid = false;
    }

    // Confirm password match validation
    if (formData.password !== formData.cpassword) {
      newErrors.cpassword = "Password and confirm password do not match";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  // Email validation function
  const isEmailValid = (email) => {
    // Use a regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength validation function
  const isStrongPassword = (password) => {
    // Implement your password strength criteria here
    // For example, a simple check for a minimum length
    return password.length >= 8;
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (validateForm()) {
        const { data } = await axios.post("http://3.25.58.228:8000/api/user/register", formData);
        setMessage("Data Submit Successfully");
      } else {
        setMessage("");
      }
    } catch (err) {
      setMessage("");
    }
  };

  // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section className="py-12 px-12">
      <div className="split-layout">
        <div className="relative w-[600px]">
          <img
            className="object-cover pl-8  h-[700px] w-full"
            src="https://i.ibb.co/dQfchzx/daniel-olah-Mdg-Io-Rb3-TNU-unsplash.jpg"
          />
        </div>
        <div className="absolute my-[24.8rem] object-cover text-center w-[520px] bg-violet-950 bg-opacity-50 rounded-b ">
          <h1 className="font-bold py-12 text-white text-5xl">Attitude Air</h1>
          <p className=" text-1xl text-white py-5 px-12 ">
            We promise to ensure that your well-being is taken care of while
            travelling with us. Boasting top in class fleet inventory and a 5
            star approval for our in-flight experience, you know you're getting
            the best from Altitude with no attitude.
          </p>
        </div>
        <div className="right-panel">
          <div className="flex justify-end items-end">
            <button className="py-2 px-4 mx-7 my-7 rounded border-solid border-2 border-indigo-700 text-indigo-700">
              SIGN IN
            </button>
          </div>
          <div className="flex py-6 justify-between items-center">
            <h1 className="font-bold text-indigo-700 text-4xl">
              Explore & Experience
            </h1>
          </div>
          <p className="mt-1 text-indigo-700 text-xl">
            Get onto your most comfortable journey yet. All the way up.
          </p>

          <div class="mt-10">
            <div className="flex justify-start">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleInputChange}
                className="border border-solid border-gray-300 p-3 mr-8 w-[340px] rounded mb-4"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleInputChange}
                className="border border-solid border-gray-300 p-3 rounded mb-4 w-[340px]"
              />
            </div>
            <p className="text-red-500">{errors.lastname}</p>
            <p className="text-red-500">{errors.firstname}</p>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
            />
            <p className="text-red-500">{errors.email}</p>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-input"
            />
            <p className="text-red-500">{errors.username}</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
            />
            <p className="text-red-500">{errors.password}</p>
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-input"
            />
            <p className="text-red-500">{errors.cpassword}</p>
            <p className="text-green-500">{message}</p>
            <button className="btn-primary" onClick={handleSubmit}>
              GET STARTED
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
