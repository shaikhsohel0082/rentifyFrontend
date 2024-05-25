import { NavLink, Outlet } from "react-router-dom";
import { currentUser } from "../../redux/userRedux";
import { useSelector } from "react-redux";
import { logoutUser } from "../../redux/userRedux";
import { useDispatch } from "react-redux";
import Styles from "./navbar.module.css";
export default function Navbar() {
  const dispatch = useDispatch();
  const loggedUser = useSelector(currentUser);
  console.log(loggedUser);
  return (
    <>
      <div className={Styles.navbar}>
        <div>
          <NavLink to={"/"}>
            <img
              className={Styles.logo}
              src="https://cdn-icons-png.flaticon.com/128/3638/3638682.png"
            />
            Rentify
          </NavLink>
        </div>
        <div>
          {loggedUser && loggedUser.type === "seller" ? (
            <NavLink to={"/createpost"}>Add new Flat </NavLink>
          ) : null}
        </div>
        <div>
          {loggedUser && loggedUser.type === "seller" ? (
            <NavLink to={"/myflats"}>Show my Flats</NavLink>
          ) : null}
        </div>
        <div>
          {!loggedUser ? (
            <NavLink to={"/login"}>Sign In</NavLink>
          ) : (
            <>
              <p>
                Hello, {loggedUser.firstName}&ensp;&ensp;&ensp;
                <span onClick={() => dispatch(logoutUser())}>Log Out</span>
              </p>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
