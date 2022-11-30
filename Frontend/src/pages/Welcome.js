import React from "react";
import "../assets/css/style.min.css";

export default function Welcome() {
  return (
    <div>
      <div className="setup_profilemodal">
        <div
          //className="Modal fade"
          id="editModal"
          //   tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Welcome
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <button
                type="button"
                className="save_btn"
                data-bs-dismiss="modal"
              >
                Set up Profile
              </button>
              {/* <li><Link className="navbar-brand" to="/Profilesignup"><a href="#">ProfileSignup</a></Link><span class="icon">
                                <i class="fa fa-ProfileSignup"></i></span></li> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
