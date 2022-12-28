import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Blog.css";
const Blog = (props) => {
  const navigate = useNavigate();
  const {_id, tittle,image,description } = props.book;;
  const handler = async () => {
    await axios
      .delete(`http://localhost:3005/blogs/${_id}`)
      .then((res) => res.data)
      .then(() => navigate("/home"))
      .then(() => navigate("/blogs/:id"));
  };
 

  return (
    <div className="container">
        
    <div className="card">
    <NavLink to="/blogs/:id"><h3>{tittle}</h3></NavLink>
      <img src={image} alt={tittle}  />
      <p>{description}</p>
    </div>
    {handler}
    </div>
  );
};

export default Blog;