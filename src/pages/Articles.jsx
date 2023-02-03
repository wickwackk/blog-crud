import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CreateArticle } from "../component/article/CreateArticle";
import { DynamicModal } from "../component/DynamicModal";
import { Button } from "react-bootstrap";
import { EditArticle } from "../component/article/EditArticle";

function ArticleCard(props) {
  const { article } = props;
  const { removeArticle } = props;
  const { showEditModal } = props;

  function deleteArticle() {
    axios
      .delete(`http://localhost:8000/articles/${article.id}`)
      .then((res) => removeArticle(res.data))
      .catch((err) => console.error(err));
  }
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={article.imageUrl}
        className="card-img-top"
        alt={article.title}
      />
      <div className="card-body">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text">{article.description}</p>
        <div className="d-flex justify-content-between">
          <Link to={`/articles/${article.id}`} className="btn btn-primary">
            Read more
          </Link>
          <div className="d-flex gap-1">
            <Button
              onClick={() => showEditModal(article)}
              variant="success"
              size="sm"
            >
              Edit
            </Button>
            <Button onClick={deleteArticle} variant="danger" size="sm">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const { categoryId } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const modalClose = () => {
    setModalShow(false);
  };

  function removeArticle(id) {
    const newArticles = articles.filter((article) => {
      if (article.id !== id) return article;
    });
    setArticles(newArticles);
  }

  function submitArticle(article) {
    setArticles([...articles, article]);
    modalClose();
  }

  function updateArticle(article) {
    const newArticles = articles.map((curArticle) => {
      if (article.id !== curArticle.id) return curArticle;
      return article;
    });
    console.log(newArticles);
    setArticles(newArticles);
    modalClose();
  }

  const showAddModal = () => {
    setModalTitle(`Create Article`);
    setModalContent(<CreateArticle submitArticle={submitArticle} />);
    setModalShow(true);
  };

  function showEditModal(article) {
    setModalTitle(`Edit Article`);
    setModalContent(
      <EditArticle article={article} updateArticle={updateArticle} />
    );
    setModalShow(true);
  }

  useEffect(() => {
    let dataUrl = `http://localhost:8000/articles`;

    if (categoryId)
      dataUrl = `http://localhost:8000/articles/categories/${categoryId}`;

    axios
      .get(dataUrl)
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => console.log(err));
  }, [categoryId]);

  return (
    <div className="row">
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={showAddModal}>Create</Button>
      </div>
      {articles.map((article, index) => {
        return (
          <ArticleCard
            key={`article-${index}`}
            article={article}
            removeArticle={removeArticle}
            showEditModal={showEditModal}
          />
        );
      })}

      <DynamicModal
        title={modalTitle}
        content={modalContent}
        handleClose={modalClose}
        show={modalShow}
      />
    </div>
  );
}
