import React from "react";
import PhysicianSidebar from "../components/PhysicianSidebar";
import { AllList } from "../services/Auth.List";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function PhysicianDash() {
  const userdata = useSelector((state) => state.auth.data.result);
  let url = `http://localhost:8080/uploads/${userdata.image}`;
//   console.log(url);

  const [home, sethome] = useState([]);
  const [nur, setnur] = useState([]);

  useEffect(() => {
    const test = async (e) => {
      const responses = await AllList();
      sethome(responses.data.nursinghome);
      setnur(responses.data.nursedata);
    };
    test();
  }, []);

  return (
    <>
      <PhysicianSidebar />
      <main id="main" class="main">
        {/* navbar */}
        <nav class="inner_nav">
          <div class="navbar-title">
            <a href="#">{userdata.name} </a>
          </div>
          <div class="admin_box">
            <div class="bell_icon">
              <span>
                <i class="fa-sharp fa-solid fa-bell" />
              </span>
            </div>
            <div class="avtar_box">
              <span>
                <img src={url} class="img-fluid" alt="" />
              </span>
            </div>
          </div>
        </nav>
        {/* navbar close */}

        {/* Nurses */}
        <div className="row">
          <div className="col-md-6">
            <section class="dashboard_section">
              <div class="row">
                <div class="col-md-12">
                  <div class="assist_box">
                    <div class="inner_box">
                      <div class="title">
                        <h4>Nurses</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="table-responsive border-1 assist_table">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Contact No.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nur.map((data, index) => {
                          return (
                            <tr>
                              <td>
                                <div className="imgBox">
                                  <img
                                    src="../../assets/images/user.png"
                                    className="img-fluid"
                                    alt=""
                                  />
                                  <span>{data.name}</span>
                                </div>
                              </td>
                              <td>{data.email}</td>
                              <td>{data.contact}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* Nurses close */}

          {/* Nursing home start */}
          <div className="col-md-6">
            <section class="dashboard_section">
              <div class="row">
                <div class="col-md-12">
                  <div class="assist_box">
                    <div class="inner_box">
                      <div class="title">
                        <h4>Nursing Home</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="table-responsive border-1 assist_table">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        {home.map((data, index) => {
                          return (
                            <tr>
                              <td>
                                <div className="imgBox">
                                  <img
                                    src="../../assets/images/user.png"
                                    className="img-fluid"
                                    alt=""
                                  />
                                  <span>{data.name}</span>
                                </div>
                              </td>
                              <td>{data.location}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* Nursing home close */}
        </div>
      </main>
    </>
  );
}
