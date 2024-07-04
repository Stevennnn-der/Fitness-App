import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function onSubmitHandler(e) {
    e.preventDefault();
    const validationErrors = {};
    if (!username.trim()) validationErrors.username = "Username is required!";
    if (!email.trim()) {
      validationErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is NOT valid!";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required!";
    } else if (password.length < 2) {
      validationErrors.password = "Password should be at least 1 chars!";
    }
    
    setErrors({...validationErrors});

    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      const apiUrl = "http://localhost:5001/signup";
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        });

        if (!response.ok) {
          const data = await response.json();
          if (data.message.includes("Email already registered.")) {
            validationErrors.dup_email = "Email already registered.";
            setErrors({...validationErrors});
          }
          return;
        }
        navigate("/login");
        

        
      } catch (err) {
        console.log("Error: " + err.message);
      }
    }
  }

  return (
    <div className="sign">
      <div className="background_image">
        <div className="auth-container">
          <div className="auth-form-container">
            <h2 className="auth-title">Sign Up</h2>
            <form method="POST" onSubmit={onSubmitHandler}>
              <label className="auth-text">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span> {errors.email}</span>}
              {errors.dup_email && <span> {errors.dup_email}</span>}

              <label className="auth-text">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <span> {errors.username}</span>}
              <label className="auth-text">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span> {errors.password}</span>}
              <button className="auth-submit-btn" type="submit">
                Submit
              </button>

              <label className="login">
                Already have an account?{" "}
                <Link
                  className="link"
                  style={{ textDecoration: "none" }}
                  to="/login"
                >
                  <p>Login</p>
                </Link>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
