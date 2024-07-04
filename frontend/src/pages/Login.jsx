import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function onSubmitHandler(e) {
    e.preventDefault();
    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is NOT valid!";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required!";
    }
    setErrors({ ...validationErrors });

    const apiUrl = "http://localhost:5001/login";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.message.includes("Password is NOT valid!")) {
          validationErrors.password = data.message;
          setErrors({ ...validationErrors });
        } else if (data.message.includes("Email does NOT exist!")) {
          validationErrors.email = data.message;
          setErrors({ ...validationErrors });
        }
        return;
      }
      navigate('/homepage');
    } catch (err) {
      console.log("Error: " + err.message);
    }
  }

  return (
    <div className="background-image">
      <div className="auth-container">
        <div className="auth-form-container">
          <h2 className="auth-title">Login</h2>
          <form action="/auth" method="POST" onSubmit={onSubmitHandler}>
            <label className="auth-text">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span>{errors.email}</span>}
            <label className="auth-text">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span>{errors.password}</span>}
            <button className="auth-submit-btn">Submit</button>

            <label className="signup">
              Don't have an account?{" "}
              <Link
                className="link"
                style={{ textDecoration: "none" }}
                to="/signup"
              >
                <p>Sign Up</p>
              </Link>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
