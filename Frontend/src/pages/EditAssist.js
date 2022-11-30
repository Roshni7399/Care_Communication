import React from "react";
import "../assets/css/Editassist.css";
import { Link, useNavigate } from "react-router-dom";

export default function EditAssist() {
  let navigate = useNavigate();
  
  const handleCancel = async () => {
    navigate("/assistedlivingpage");
  };
  return (
    <>
      <div class="container">
        <div class="card card-container-fluid">
          <img
            id="profile-img"
            class="profile-img-card"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          />
          <p id="profile-name" class="profile-name-card"></p>
          <form class="form-signin">
            <span id="reauth-email" class="reauth-email"></span>
            <label>Name</label>
            <input
              type="name"
              id="inputEmail"
              class="form-control"
              placeholder="Enter Name"
              required
              autofocus
            />
            <br />
            <label>Description</label>
            <input
              type="description"
              id="inputPassword"
              class="form-control"
              placeholder="Enter Description"
              required
            />
            <br />
            <br />
            <div className="text-left">
              <div>
                <button
                  class="btn btn-success rounded-pill"
                  style={{ backgroundColor: "#64BD05" }}
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
