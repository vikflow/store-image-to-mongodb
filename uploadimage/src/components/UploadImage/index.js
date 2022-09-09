import React, { useState } from "react";
import axios from "axios";
import "./uploadImage.css";
import { Link } from "react-router-dom";

import { AddImageContainer } from "./uploadElements";

const Upload = () => {
  const [name, setName] = useState("");
  const [id, setid] = useState("");
  const [filename, setFilename] = useState("");
  const [message, setMessage] = useState("");

  const onChangeFile = (e) => {
    setFilename(e.target.files[0]);
  };

  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("id", id);
    formData.append("testImage", filename);

    setName("");
    setid("");

    axios
      .post("http://localhost:3003/upload", formData)
      .then((res) => setMessage(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AddImageContainer>
      <div className="container">
        <h1>upload image</h1>

        <form onSubmit={changeOnClick} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="id">Id</label>
            <input
              type="number"
              value={id}
              onChange={(e) => setid(e.target.value)}
              className="form-control"
              placeholder="id"
            />
            <div className="form-group">
              <input
                type="file"
                filename="testImage"
                onChange={onChangeFile}
                className="form-control-file"
              />
            </div>
          </div>
          <button type="submit">upload</button>
        </form>
        <span className="message"> {message} </span>
        <Link to="view" className="link">
          view uploaded images
        </Link>
      </div>
    </AddImageContainer>
  );
};

export default Upload;
