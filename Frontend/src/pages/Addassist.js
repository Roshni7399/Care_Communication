import React from "react";
import "../assets/css/Editassist.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addAssist } from "../services/Auth.add";

export default function Addassist() {
  let navigate = useNavigate();

  const [input, setInput] = useState({
    image: null,
  });
  // console.log(input);


  const handleCancel = async () => {
    navigate("/assistedlivingpage");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFileChange = (e) => {
    setInput((previous) => ({
      ...previous,
      image: e.target.files[0],
    }));
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    const fromdata = new FormData();
    fromdata.append("name", input.name);
    fromdata.append("description", input.description);
    fromdata.append("image", input.image);
    fromdata.append("role", "2");

    const response = await addAssist(fromdata);
    if (response.data.status === 200) {
      navigate("/assistedlivingpage");
    }
    console.log(response);
  };
  
  return (
    <>
      <div class="container">
        <div class="card card-container-fluid">
          <input
            id="profile-img"
            class="profile-img-card"
            type="file"
            onChange={onFileChange}
          />
          <p id="profile-name" class="profile-name-card"></p>
          <form class="form-signin">
            <span id="reauth-email" class="reauth-email"></span>
            <label>Name</label>
            <input
              type="name"
              name="name"
              id="inputEmail"
              class="form-control"
              placeholder="Enter Name"
              onChange={handleChange}
              required
              autofocus
            />
            <br />
            <label>Description</label>
            <input
              name="description"
              type="description"
              id="inputPassword"
              class="form-control"
              placeholder="Enter Description"
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <div className="text-left">
              <div>
                <button
                  class="btn btn-success rounded-pill"
                  style={{ backgroundColor: "#64BD05" }}
                  onClick={handelsubmit}
                >
                  <Link class="nav-link active" to="">
                    Add
                  </Link>
                </button>
                &nbsp;
                <button
                  class="btn btn-light rounded-pill"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
