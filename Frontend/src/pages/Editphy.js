import React from "react";
import "../assets/css/Editassist.css";
import { Link, useNavigate } from 'react-router-dom'

export default function Editphy() {
  let navigate = useNavigate();

  const handleCancel =async()=>{
    navigate("/physicianpage")
  }
  return (
    <>
      <div class="container">
        <div class="card card-container-fluid">
        <h4 class="text-left">Edit Physician</h4>
        <br/><br/>
        <label>Profile Picture</label>
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
              name="name"
              id="inputEmail"
              class="form-control"
              placeholder="Enter Name"
              required
              autofocus
            />
            <br/>
            <label>Email ID</label>
            <input
              type="name"
              name="email"
              id="inputEmail"
              class="form-control"
              placeholder="Enter Email"
              required
              autofocus
            />
            <br/>
            <br/>
            <div className="row">
                <div className="col-6">
                    <label>Location</label>
                    <input
                        type="location"
                        name="location"
                        id="inputEmail"
                        class="form-control"
                        placeholder="Enter Location"
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
                        required
                        autofocus
                  />
                </div>
            </div>
            <br/>
            <br/>
            <div className="row">
                <div className="col-6">
                    <div class="form-group">
                            <label for="">Assisted Living</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected="">Select</option>
                                <option value="1">1 </option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                    </div>
                </div>
                <div className="col-6">
                <div class="form-group">
                            <label for="">Nursing Home</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected="">Select</option>
                                <option value="1">1 </option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <div className="text-left">
              <div>
                <button class="btn btn-success rounded-pill" style={{backgroundColor:"#64BD05"}}>
                  <Link class="nav-link active" to="">
                    Add
                  </Link>
                </button>
                &nbsp;
                <button class="btn btn-light rounded-pill" onClick={()=>handleCancel()}>
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
