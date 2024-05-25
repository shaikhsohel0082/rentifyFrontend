import { useState } from "react";
import Styles from "./form.module.css";
import { createPost } from "../../redux/postReducer";
import { useDispatch } from "react-redux";
import { currentUser } from "../../redux/userRedux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function CreatePost() {
  const user = useSelector(currentUser);
  let id;
  if (user) {
    id = user._id;
  }
  const dispatch = useDispatch();
  const [Flat, setFlat] = useState({
    image: "",
    area: "",
    description: "",
    price: null,
    room: null,
    likes: 0,
  });

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ id: id, data: Flat }));
    navigate("/");
    setFlat({
      image: "",
      area: "",
      description: "",
      price: null,
      room: null,
      likes: 0,
    });
    toast.success("New Flat details Added Successfully");
  };
  return (
    <div>
      <form className={Styles.container} onSubmit={(e) => handleSubmit(e)}>
        <h1>Add Flat Details</h1>
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
          Add
        </button>
      </form>
    </div>
  );
}
