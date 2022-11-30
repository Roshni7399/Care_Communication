import React from "react";
import { useState, useEffect } from "react";
import "../assets/css/style.min.css";
import { Link } from "react-router-dom";
import { multiLogin } from "../services/Auth.nursehome";
import { useNavigate } from "react-router";
import NursingHome from "../dashboard/NursingHomeDash";
import { useDispatch } from "react-redux";
import { userlogin } from "../Slice/AuthSlice";

export default function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setInput({ ...input, showPassword: !input.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setInput({ ...input, [prop]: event.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await multiLogin(input);
      console.log(response.data.role, "response");
      if (response.data.role === "0") {
        dispatch(userlogin(response.data));
        navigate("/admindashboard");
      } else {
      }
      if (response.data.role === "1") {
        dispatch(userlogin(response.data));
        navigate("/nursinghome");
        console.log("NursingHome");
      } else {
      }
      if (response.data.role === "2") {
        dispatch(userlogin(response.data));
        navigate("/assistedliving");
      } else {
      }
      if (response.data.role === "3") {
        dispatch(userlogin(response.data));
        navigate("/physician");
      } else {
      }
      if (response.data.role === "4") {
        dispatch(userlogin(response.data));
        navigate("/nurse");
      } else {
      }
    } catch (e) {
      console.warn(e);
    }
  };
  console.log(input);

  return (
    <>
      <section class="login_section">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-5">
              <img
                src="../../assets/images/login.png"
                class="img-fluid login_icon"
                alt=""
              />
              <h3>Login</h3>
              <div class="form_box">
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                  <div class="form-group">
                    <label for="" class="form-label">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="text"
                      class="form-control"
                      placeholder="name@gmail.com"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="" class="form-label">
                      Password
                    </label>
                    <div class="input_box">
                      <input
                        name="password"
                        type={input.showPassword ? "text" : "password"}
                        onChange={handlePasswordChange("password")}
                        value={input.password}
                        class="form-control"
                        placeholder="*********"
                        onChange={handleChange}
                      />
                      <i
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {input.showPassword ? (
                          <i class="fa-solid fa-eye-slash"></i>
                        ) : (
                          <i class="fa-solid fa-eye"></i>
                        )}
                      </i>
                    </div>
                  </div>
                  <p>
                    <a href="#">Forgot Password?</a>
                  </p>

                  <button class="login_btn">Login</button>
                </form>
              </div>
            </div>

            <div class="col-md-5">
              <div class="rBox">
                <img
                  src="../../assets/images/login_bg.png"
                  class="img-fluid login_bg"
                  alt=""
                />
                <img
                  src="../../assets/images/rImg.png"
                  class="img-fluid"
                  alt=""
                />
                <h2>
                  Dock <span>Nock</span>
                </h2>
                <p>
                  A Communication <span>Lifeline</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
