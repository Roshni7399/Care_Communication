import React, { useEffect, useState } from "react";
import { nurseList, DataDelete } from "../services/Auth.nursehome";
import PhysicianSidebar from "../components/PhysicianSidebar";
import { NursinghomeList } from "../services/Auth.nursehome";
import ReactPaginate from "react-paginate";

export default function Phynursinghome() {
  const [show, setshow] = useState([]);
  const [page, setPage] = useState({});
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState(1);

  const handlePageClick = (data) => {
    setSelect(data.selected + 1);
  };

  useEffect(() => {
    const test = async () => {
      const response = await NursinghomeList(search, 3, select);
      console.log(response);
      setshow(response.data.result.docs);
      setPage(response.data.result.totalPages);
    };
    test();
  }, [select, search]);

  return (
    <>
      <PhysicianSidebar />
      <main id="main" class="main">
        <nav class="inner_nav">
          <div class="navbar-title">
            <a href="#">Physician name</a>
          </div>
          <div class="admin_box">
            <div class="bell_icon">
              <span>
                <i class="fa-sharp fa-solid fa-bell"></i>
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
                    <h4>Nursing Home</h4>
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

                <div class="form-group location">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Location</option>
                    <option value="1">Noida </option>
                    <option value="2">Delhi</option>
                    <option value="3">Gurgaon</option>
                  </select>
                  <i class="fa-solid fa-angle-down"></i>
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
                      <th scope="col">Contact No.</th>
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
                          <td>{data.location}</td>
                          <td>{data.contact}</td>
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
