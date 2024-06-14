import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./home.module.css";
import {
  getPosts,
  postSelector,
  likePostAsync,
  sendMailAsync,
} from "../../redux/postReducer";
import { currentUser, findUserById } from "../../redux/userRedux";
import { NavLink } from "react-router-dom";
import { ownerSelector } from "../../redux/userRedux";
import { deletePostAsync } from "../../redux/postReducer";
import { toast } from "react-toastify";
import { startServer } from "../../redux/postReducer";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ room: null, price: null });
  const [sendMailData, setSendMailData] = useState(null);

  const fetchedPosts = useSelector(postSelector);
  const user = useSelector(currentUser);
  const dispatch = useDispatch();
  const owner = useSelector(ownerSelector);
  useEffect(() => {
    dispatch(startServer());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, posts]);

  useEffect(() => {
    setPosts(fetchedPosts);
  }, [fetchedPosts]);

  const handleFilterChange = (room) => {
    setFilter({ ...filter, room });
  };

  const handlePriceFilterChange = (price) => {
    setFilter({ ...filter, price });
  };

  const filteredPosts = posts.filter((post) => {
    if (filter.room !== null && post.room !== filter.room) return false;
    if (filter.price !== null) {
      const postPrice = parseInt(post.price.replace(/\D/g, ""), 10);
      switch (filter.price) {
        case "10K":
          if (postPrice > 10000) return false;
          break;
        case "10K-15K":
          if (postPrice < 10000 || postPrice > 15000) return false;
          break;
        case "15K-20K":
          if (postPrice < 15000 || postPrice > 20000) return false;
          break;
        case "20K+":
          if (postPrice < 20000) return false;
          break;
        default:
          break;
      }
    }
    return true;
  });
  useEffect(() => {
    if (sendMailData) {
      dispatch(sendMailAsync({ data: sendMailData }));
    }
  }, [sendMailData]);

  const handleInterestClick = (post) => {
    dispatch(findUserById(post.userId))
      .unwrap()
      .then((owner) => {
        setSendMailData({ user, post, owner });
      })
      .catch((err) => {
        console.error("Failed to fetch user by id: ", err);
      });
  };

  return (
    <div>
      <div className={Styles.filterDiv}>
        <div>
          <h5>Apply Filter</h5>
        </div>
        <div>
          Select price
          <br />
          <select onChange={(e) => handlePriceFilterChange(e.target.value)}>
            <option value="">Select Price</option>
            <option value="10K">Up to 10K</option>
            <option value="10K-15K">10k to 15k</option>
            <option value="15K-20K">15k to 20k</option>
            <option value="20K+">20k and above</option>
          </select>
        </div>
        <hr />
        <div>
          Flat type?
          <div>
            <input
              type="radio"
              name="radio"
              onChange={() => handleFilterChange(1)}
            />
            &nbsp; 1BHK
          </div>
          <div>
            <input
              type="radio"
              name="radio"
              onChange={() => handleFilterChange(2)}
            />
            &nbsp; 2BHK
          </div>
          <div>
            <input
              type="radio"
              name="radio"
              onChange={() => handleFilterChange(3)}
            />
            &nbsp; 3BHK
          </div>
        </div>
        <hr />
        <div>
          <label htmlFor="washroom1">Washroom attached?</label>&nbsp; Yes &nbsp;
          <input type="radio" name="washroom" id="washroom1" />
          &nbsp; No&nbsp;
          <input type="radio" name="washroom" id="washroom2" />
        </div>
        <hr />
        <div>
          <label htmlFor="clg1">Nearby college/hospital?</label>&nbsp; Yes
          &nbsp;
          <input type="radio" name="college" id="clg1" />
          &nbsp; No&nbsp;
          <input type="radio" name="college" id="clg2" />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setFilter({ room: null, price: null })}
          >
            clear filter
          </button>
        </div>
      </div>
      <div className={Styles.contentDiv}>
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="card mb-5 shadow-lg p-3 bg-body-tertiary rounded"
            style={{ width: "18rem" }}
          >
            <img src={post.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{post.description}</h5>
              <p className="card-text">
                Published on: {post.date.slice(0, 10)}
              </p>
              {/* <p className="card-text ">
                {!user ? (
                  <NavLink to={`/login`}>
                    <img
                      className="ms-3 me-5"
                      src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                      height={"30px"}
                      width={"30px"}
                    />
                  </NavLink>
                ) : (
                  <NavLink to={`/updatepost/${post._id}`}>
                    <img
                      className="ms-3 me-5"
                      src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                      height={"30px"}
                      width={"30px"}
                    />
                  </NavLink>
                )}

                <button
                  onClick={() => {
                    if (!user) {
                      toast.error("only user created post can delete it");
                      return;
                    }
                    console.log(post._id);
                    dispatch(deletePostAsync({ id: post._id }));
                    toast.success("Post deleted successfully");
                  }}
                >
                  <img
                    className="ms-5"
                    src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                    height={"30px"}
                    width={"30px"}
                  />
                </button>
              </p> */}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Price: {post.price}</li>
              <li className="list-group-item">Flat type: {post.room}BHK</li>
              <li className="list-group-item">Area: {post.area}</li>
              <li className="list-group-item">Likes: {post.likes}</li>
            </ul>
            <div className="card-body">
              {user ? (
                <button
                  type="button"
                  className="btn btn-primary me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleInterestClick(post)}
                >
                  I'm interested
                </button>
              ) : (
                <NavLink to="/login">
                  <button type="button" className="btn btn-primary me-3">
                    I'm interested
                  </button>
                </NavLink>
              )}
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Seller:&nbsp;
                        {/* {console.log(owner)} */}
                        {owner &&
                          `${owner.user.firstName} ${owner.user.lastName}`}
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Email with complete details has been sent to you!!!
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => dispatch(likePostAsync({ id: post._id }))}
              >
                Like
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
