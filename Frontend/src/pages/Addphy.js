import React, { useEffect, useState } from "react";
import "../assets/css/Editassist.css";
import { Link, useNavigate } from "react-router-dom";
import { AllList } from "../services/Auth.List";
import { addPhy } from "../services/Auth.add";

export default function Addphy() {
  let navigate = useNavigate();
  const [home, sethome] = useState([]);
  const [assist, setassist] = useState([]);

  useEffect(() => {
    const test = async () => {
      const response = await AllList();
      console.log(response.data.assist);
      setassist(response.data.assist);
      sethome(response.data.nursinghome);
    };
    test();
  }, []);

  const handleCancel = async () => {
    navigate("/physicianpage");
  };

  const [input, setInput] = useState({
    image: "",
  });
  // console.log(input);

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
    // console.log("click");
    const formdata = new FormData();
    formdata.append("name", input.name);
    formdata.append("email", input.email);
    formdata.append("location", input.location);
    formdata.append("contact", input.contact);
    formdata.append("assissted_living_id", input.value);
    formdata.append("image", input.image);
    // formdata.append("nursing_home_id", input.value);
    formdata.append("role", "3");

    const response = await addPhy(formdata);
    if (response.data.status === "200") {
      navigate("/physicianpage");
    }
  };

  return (
    <>
      <div class="container">
        <div class="card card-container-fluid">
          <h4 class="text-left">Add Physician</h4>
          <br />
          <br />
          <label>Profile Picture</label>
          <input
            type="file"
            id="profile-img"
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
            <label>Email ID</label>
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
            <div className="row">
              <div className="col-6">
                <div class="form-group">
                  <label for="">Assisted Living</label>
                  <select
                    class="form-select"
                    name="value"
                    aria-label="Default select example"
                    onChange={handleChange}
                  >
                    <option selected="">Select Assisted Living </option>
                    {assist.map((data) => {
                      return <option value={data._id}>{data.name}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div class="form-group">
                  <label for="">Nursing Home</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    name="value"
                    onChange={handleChange}
                  >
                    <option selected="">Select Nursing Home</option>
                    {home.map((data) => {
                      return <option value={data._id}>{data.name}</option>;
                    })}
                  </select>
                </div>
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
