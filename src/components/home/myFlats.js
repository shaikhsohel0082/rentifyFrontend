import React from "react";
import { postSelector } from "../../redux/postReducer";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/userRedux";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ownerSelector } from "../../redux/userRedux";

import { deletePostAsync, likePostAsync } from "../../redux/postReducer";

export const MyFlats = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postSelector);
  //   console.log(posts);
  const owner = useSelector(ownerSelector);
  const user = useSelector(currentUser);
  //   console.log(user);
  const myPosts = posts.filter((post) => post.userId === user._id);
  console.log(myPosts);
  return (
    <>
      <h1 class='mt-3 mb-3'>My Flats</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div></div>

        {myPosts.map((post) => (
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
              <p className="card-text ">
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
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Price: {post.price}</li>
              <li className="list-group-item">Flat type: {post.room}BHK</li>
              <li className="list-group-item">Area: {post.area}</li>
              <li className="list-group-item">Likes: {post.likes}</li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};
