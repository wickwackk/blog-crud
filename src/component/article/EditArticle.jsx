import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

export const EditArticle = ({ article, updateArticle }) => {
  const [categories, setCategories] = useState([]);
  const [text, setText] = useState(article.text);
  const [description, setDescription] = useState(article.description);
  const [imageUrl, setImageUrl] = useState(article.imageUrl);
  const [title, setTitle] = useState(article.title);
  const [categoryId, setCategoryId] = useState(article.id);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/categories`)
      .then((res) => setCategories(res.data));
  });

  function submitHandler() {
    const editedArticle = {
      title,
      imageUrl,
      categoryId: Number(categoryId),
      description,
      text,
    };

    axios
      .patch(`http://localhost:8000/articles/${article.id}`, editedArticle)
      .then((res) => {
        updateArticle(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
    >
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Article title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          type="text"
          placeholder="Image URL"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          aria-label="Default select example"
        >
          <option hidden value={""}>
            Open this select menu
          </option>
          {categories.map((category, index) => {
            return (
              <option key={index} value={category.id}>
                {category.title}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          as="textarea"
          rows={3}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Text</Form.Label>
        <Form.Control
          value={text}
          onChange={(e) => setText(e.target.value)}
          as="textarea"
          rows={10}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
