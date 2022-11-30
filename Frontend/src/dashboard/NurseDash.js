import React, { useEffect, useState } from "react";
import { PhysicianList, DataDelete } from "../services/Auth.nursehome";
import NurseSidebar from "../components/NurseSidebar";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";

export default function NurseDash() {
  const userdata = useSelector((state) => state.auth.data.result);
  // console.log(userdata);

  let url = `http://localhost:8080/uploads/${userdata.image}`;
  // console.log(url);

  const [show, setshow] = useState([]);
  const [page, setPage] = useState("");
  const [select, setSelect] = useState(1);
  const [search, setsearch] = useState("");
  const handlePageClick = (data) => {
    setSelect(data.selected + 1);
  };

  useEffect(() => {
    const test = async () => {
      const response = await PhysicianList(search, 2, select);
      setshow(response.data.result.docs);
      setPage(response.data.result.totalPages);
    };
    test();
  }, [select, search]);

  return (
    <>
      <NurseSidebar />
      <main id="main" class="main">
        <nav class="inner_nav">
          <div class="navbar-title">
            <a href="#">{userdata.name}</a>
          </div>
          <div class="admin_box">
            <div class="bell_icon">
              <span>
                <i class="fa-sharp fa-solid fa-bell"></i>
              </span>
            </div>
            <div class="avtar_box">
              <span>
                <img src={url} class="img-fluid" alt="" />
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
                    <h4>Physicians</h4>
                  </div>
                </div>
                <div class="form-group form_box">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control"
                    onChange={(e) => setsearch(e.target.value)}
                  />
                  <i class="fa-solid fa-search"></i>
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
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {show.map((data, index) => {
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
                          <td>
                            <div class="action_btn">
                              <button className="btn">
                                <i class="fas fa-phone-alt"></i>
                              </button>
                              <button className="btn">
                                <i class="fa-sharp fa-solid fa-message"></i>
                              </button>
                              <button className="btn">
                                <i class="fa fa-fax"></i>
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
