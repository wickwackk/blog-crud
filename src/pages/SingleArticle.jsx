import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleArticle() {
  const { id } = useParams();
  const [singleArticle, setSingleArticle] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/articles/${id}`)
      .then((res) => {
        console.log(res.data);
        setSingleArticle(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h1 className="mb-3">{singleArticle.title}</h1>
        <img src={singleArticle.imageUrl} alt={singleArticle.title} />
        <p>{singleArticle.description}</p>
      </div>
    </>
  );
}
