import React from "react";
import "./SigUp.css";
import { FaUserAlt } from "react-icons/fa";
import { PiPassword } from "react-icons/pi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useForm } from "react-hook-form";

// Thư viện toast
import { toast } from "react-toastify";

// đăng nhập đủ kí tự không
import { useState, useEffect } from "react";

// React hook form
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export default function SignUp() {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    axios
      .post("https://dummyjson.com/auth/login", data)
      .then((response) => {
        toast.success("Logged in successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // var pass = `${<p>{errors.password?.message}</p>}`

  // đăng nhập
  const [inputValue, setInputValue] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isInputClicked, setIsInputClicked] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu người dùng đã click vào input và độ dài của giá trị là 10, bạn có thể thực hiện các hành động tương ứng ở đây
    if (isInputClicked && inputValue.length === 10 && isErrorVisible) {
      setIsErrorVisible(false); // Ẩn thông báo khi đã nhập đủ
    } else if (isInputClicked && inputValue.length < 10 && !isErrorVisible) {
      setIsErrorVisible(true); // Hiển thị thông báo khi chưa nhập đủ và isErrorVisible là true
    }
  }, [inputValue, isErrorVisible, isInputClicked]); // useEffect sẽ chạy lại khi giá trị của inputValue, isErrorVisible, hoặc isInputClicked thay đổi

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputClick = () => {
    setIsInputClicked(true); // Đánh dấu rằng người dùng đã click vào input
    setIsErrorVisible(true); // Hiển thị thông báo khi người dùng bắt đầu nhập liệu
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="form">
      <body className="haha">
        <section>
          <div className="login-box">
            <span action="true">
              <h2>Login</h2>
              <div className="input-box">
                <span className="icon">
                  <FaUserAlt />
                </span>
                <div className="control block-cube block-input">
                  <input
                    {...register("username")}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                  />
                  {/* <p>{errors.username?.message}</p> */}
                  {isErrorVisible && inputValue.length < 10 && (
                    <p style={{ color: "red" }}>Vui lòng nhập đủ 10 kí tự.</p>
                  )}
                  <label className="hi">User name</label>
                </div>
              </div>
              <div className="input-box">
                <span className="icon">
                  <PiPassword />
                </span>
                <div className="control block-cube block-input">
                  <input
                    type="password"
                    {...register("password")}
                    placeholder=""
                  />

                  <label className="hi">Password</label>
                </div>
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="/some/valid/uri">Forgot Password?</a>
              </div>
              <button
                className="btn block-cube block-cube-hover "
                id="butnenha"
                type="submit"
              >
                Login
              </button>
              <div className="register-link">
                <p>
                  Don't have an account? <a href="/some/valid/uri">Register</a>
                </p>
              </div>
            </span>
          </div>
        </section>
      </body>
    </form>
  );
}
