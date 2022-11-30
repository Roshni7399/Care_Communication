import React, { useEffect, useState } from "react";
import PhysicianSidebar from "../components/PhysicianSidebar";
import { nurseList } from "../services/Auth.nursehome";
import ReactPaginate from "react-paginate";

export default function Nurse() {
  const [show, setshow] = useState([]);
  const [page, setPage] = useState({});
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState(1);

  const handlePageClick = (data) => {
    setSelect(data.selected + 1);
  };

  useEffect(() => {
    const test = async () => {
      const response = await nurseList(search, 1, select);
      console.log(response.data.data);
      setshow(response.data.data.docs);
      setPage(response.data.data.totalPages);
    };
    test();
  }, [select, search]);

  return (
    <>
      <PhysicianSidebar />
      <main id="main" class="main">
        <nav class="inner_nav">
          <div class="navbar-title">
            <a href="#">Name of physician</a>
          </div>
          <div class="admin_box">
            <div class="bell_icon">
              <span>
                <i class="fa-sharp fa-solid fa-bell" />
              </span>
            </div>
            <div class="avtar_box">
              <span>
                <img
                  src="../../assets/images/profile-img.jpg"
                  class="img-fluid"
                  alt=""
                />
              </span>
            </div>
          </div>
        </nav>
        <section class="dashboard_section">
          <div class="row">
            <div class="col-md-12">
              <div class="assist_box">
                <div class="inner_box">
                  <div class="title">
                    <h4>Nurses</h4>
                  </div>
                  <div class="form-group form_box">
                    <input
                      type="text"
                      placeholder="Search"
                      class="form-control"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <i class="fa-solid fa-search"></i>
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
                      <th scope="col">Location</th>
                      <th scope="col">Contact No.</th>
                      <th scope="col">Nursing Home</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {show.map((data, index) => {
                      console.log("data", data);
                      return (
                        <tr>
                          <td>
                            <div class="imgBox">
                              <img
                                src="../../assets/images/user.png"
                                class="img-fluid"
                                alt=""
                              />
                              <span>{data.name}</span>
                            </div>
                          </td>
                          <td>{data.email}</td>
                          <td>{data.location}</td>
                          <td>{data.contact}</td>
                          <td>Rebalance Home</td>
                          <td>
                            <div class="action_btn">
                              <button class="btn">
                                <i class="fa-solid fa-pen"></i>
                              </button>
                              <button className="btn">
                                <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div class="page_box">
                <p></p>
                <nav aria-label="Page navigation example">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={page}
                    previousLabel="<<<"
                    renderOnZeroPageCount={null}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                  />
                </nav>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
