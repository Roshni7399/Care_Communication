import React from "react";
import "../assets/css/Editassist.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AllList } from "../services/Auth.List";
import { addUser } from "../services/Auth.add";
import { getSearchById } from "../services/Auth.nursehome";
import { useParams } from "react-router";

export default function SetupPage() {

  let navigate = useNavigate();
  const { id } = useParams();
  // console.log("getUserId", id);
  const [password, setpassword] = useState("");
  const [phy, setPhy] = useState({});
  // console.log("phy", phy.email);

  useEffect(() => {
    setInput({
      name: phy.name,
      email: phy.email,
      location: phy.location,
      contact: phy.contact,
    });
    const test = async () => {
      const response1 = await getSearchById(id);
      setPhy(response1.data.result);
    };
    test();
  }, []);

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

  const [input, setInput] = useState({
    image: "",
  });
  
  const handelSubmit = async (e) => {
    e.preventDefault();

    console.log("click");
    const formdata = new FormData();
    formdata.append("name", input.name);
    formdata.append("email", input.email);
    formdata.append("location", input.location);
    formdata.append("contact", input.contact);
    formdata.append("assissted_living_id", input.value);
    formdata.append("image", input.image);
    // formdata.append("nursing_home_id", input.value);
    formdata.append("password", input.password);
    const res = await addUser(formdata);
    if (res.data.status === 200) {
      navigate("/");
    }
  };

  const [valid, setValid] = useState({
    confirm: false,
    confirmError: "",
  });

  useEffect(() => {
    if (input.password === password) {
      setValid({
        confirm: false,
        confirmError: "",
      });
    } else {
      setValid({
        confirm: true,
        confirmError: "Password can't match",
      });
    }
  }, [input, password]);

  return (
    <div>
      <div class="container">
        <div class="card card-container-fluid">
          <h4 class="text-left">Set Up Profile</h4>
          <br />
          <br />
          <label>Profile Picture</label>
          <input
            type="file"
            id="profile-img"
            class="profile-img-card"
            //value={phy.image}
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
              value={phy.name}
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
              // value={phy.email}
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
                  value={phy.location}
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
                  value={phy.contact}
                  id="inputEmail"
                  class="form-control"
                  placeholder="Enter Contact No"
                  required
                  autofocus
                />
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-6">
                <label>Create Password</label>
                <input
                  type="name"
                  name="password"
                  id="inputEmail"
                  class="form-control"
                  placeholder="Enter Password"
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  autofocus
                />
              </div>
              <div className="col-6">
                <label>Confirm Password</label>
                <input
                  type="name"
                  name="password"
                  id="inputEmail"
                  class="form-control"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  required
                  autofocus
                />
                {valid.confirm && (
                  <span className="text-danger">{valid.confirmError}</span>
                )}
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
                    Submit
                  </Link>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
