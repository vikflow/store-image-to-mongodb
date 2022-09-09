import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewImage() {
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/getimg")
      .then((res) => {
        console.log(res);
        setImgs(res.data);
      })
      .catch(Error);
  }, []);

  return (
    <>
      <div
        style={{
          margin: "20px",
          display: "grid",
          overflow: "inherit",
          position: "relative",
          marginTop: "90px",
          //zIndex: "-1",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Here are your uploaded images</h1>
        {imgs.map((pic, key) => (
          <div
            key={key}
            style={{
              display: "inline-block",
              border: "1px solid grey",
              padding: "20px",
              marginBottom: "20px",
              marginLeft: "20%",
              borderRadius: "10px",
              justifyContent: "center",
              maxWidth: "640px",
            }}
          >
            <h1> {pic.name}</h1>
            <img
              src={`/uploads/${pic.image}`}
              alt=" ..."
              width={630}
              height={300}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewImage;
