import React, { useState } from "react";
import "../assets/css/Editassist.css";
import { Link, useNavigate } from "react-router-dom";
import { addHome } from "../services/Auth.add";

export default function Addnursinghome() {
  let navigate = useNavigate();

  const handleCancel = async () => {
    navigate("/nursinghomepage");
  };
  const [input, setInput] = useState({
    image: null,
  });

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

  const handelSubmit = async (e) => {
    e.preventDefault();
    const fromdata = new FormData();
    fromdata.append("name", input.name);
    fromdata.append("email", input.email);
    fromdata.append("location", input.location);
    fromdata.append("contact", input.contact);
    fromdata.append("image", input.image);
    fromdata.append("role", "1");

    const response = await addHome(fromdata);
    if (response.data.status === true) {
      navigate("/nursinghomepage");
    }
    // console.log(response);
  };

  return (
    <>
      <div class="container">
        <div class="card card-container-fluid ">
          <h4 class="text-left">Add Nursing home</h4>
          <br />
          <br />
          <label>Profile Picture</label>
          <input
            id="profile-img"
            type="file"
            class="profile-img-card"
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
            <label>Email</label>
            <input
              type="name"
              name="email"
              id="inputEmail"
              class="form-control"
              placeholder="Enter Email"
              onChange={handleChange}
              required
              autofocus
            />
            <br />

            <br />
            <div className="row">
              <div className="col-6">
                <label>Location</label>
                <input
                  type="location"
                  name="location"
                  id="inputEmail"
                  class="form-control"
                  placeholder="Enter Location"
                  onChange={handleChange}
                  required
                  autofocus
                />
              </div>
              <div className="col-6">
                <label>Contact No</label>
                <input
                  type="contact"
                  name="contact"
                  id="inputEmail"
                  class="form-control"
                  placeholder="Enter Contact No"
                  onChange={handleChange}
                  required
                  autofocus
                />
              </div>
            </div>
            <br />
            <br />
            <div className="text-left">
              <div>
                <button
                  class="btn btn-success rounded-pill"
                  style={{ backgroundColor: "#64BD05" }}
                  onClick={handelSubmit}
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
