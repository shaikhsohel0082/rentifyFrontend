import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUserAsynch } from "../../redux/userRedux";
import Styles from "./form.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(user);
    dispatch(createUserAsynch(user));
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      type: "",
    });
    toast.success("User created successfully");
    navigate("/login");
  };

  return (
    <div>
      <form className={Styles.container} onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={user.firstName}
            required
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={user.lastName}
            required
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Mobile Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            required
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Type of user
          </label>
          <input
            type="text"
            className="form-control"
            id="typeofuser"
            required
            value={user.type}
            onChange={(e) => setUser({ ...user, type: e.target.value })}
            placeholder="buyer/seller"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <div className="mt-3">
          Already have an account? &nbsp;
          <b>
            <Link to="/login">Login Here</Link>
          </b>
        </div>
      </form>
    </div>
  );
}
