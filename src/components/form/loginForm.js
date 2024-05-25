import { Link } from "react-router-dom";
import Styles from "./form.module.css";
import { useDispatch } from "react-redux";
import { loginUserAsynch } from "../../redux/userRedux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/userRedux";
import { toast } from "react-toastify";
export default function LoginForm() {
  const loggedUser = useSelector(currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAsynch(user));
    // console.log(loggedUser);

    setUser({ email: "", password: "" });
  };
  useEffect(() => {
    if (loggedUser) {
      toast.success("Logged in successfully");
      navigate("/");
    }
  }, [loggedUser]);
  return (
    <div>
      <form className={Styles.container} onSubmit={(e) => handleSubmit(e)}>
        <h1>Sign in </h1>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Sign In
        </button>
        <div class="mt-3">
          New User? &nbsp;
          <b>
            <Link to={"/register"}>Register Here</Link>
          </b>
        </div>
      </form>
    </div>
  );
}
