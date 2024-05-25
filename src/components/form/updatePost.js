import { useState } from "react";
import Styles from "./form.module.css";
import { createPost } from "../../redux/postReducer";
import { useDispatch } from "react-redux";
import { currentUser } from "../../redux/userRedux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postSelector } from "../../redux/postReducer";
import { useParams } from "react-router-dom";
import { updatePost } from "../../redux/postReducer";
export default function UpdatePost() {
  const user = useSelector(currentUser);
  let id;
  if (user) {
    id = user._id;
  }
  const dispatch = useDispatch();
  const { postid } = useParams();
  // console.log(postid);
  const post = useSelector(postSelector);
  const preFilledData = post.find((post) => post._id === postid);
  console.log(preFilledData);
  const [Flat, setFlat] = useState(preFilledData);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ id: preFilledData._id, data: Flat }));
    navigate("/");
    setFlat({
      image: "",
      area: "",
      description: "",
      price: null,
      room: null,
      likes: 0,
    });
    toast.success("Flat details Updated Successfully");
  };
  return (
    <div>
      <form className={Styles.container} onSubmit={(e) => handleSubmit(e)}>
        <h1>Update Flat Details</h1>
        <div className="mb-3">
          <label htmlFor="area" className="form-label">
            Area
          </label>
          <input
            type="text"
            className="form-control"
            id="area"
            value={Flat.area}
            required
            onChange={(e) => setFlat({ ...Flat, area: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            required
            value={Flat.price}
            onChange={(e) => setFlat({ ...Flat, price: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imgurl" className="form-label">
            Image Url
          </label>
          <input
            type="text"
            className="form-control"
            id="imgurl"
            required
            value={Flat.image}
            onChange={(e) => setFlat({ ...Flat, image: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="flat" className="form-label">
            Flat Type
          </label>
          <input
            type="number"
            className="form-control"
            id="flat"
            placeholder="1BHK/2BHK/3BHK"
            required
            value={Flat.room}
            onChange={(e) => setFlat({ ...Flat, room: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            required
            value={Flat.description}
            onChange={(e) => setFlat({ ...Flat, description: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}
