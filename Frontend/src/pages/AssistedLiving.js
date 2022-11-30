import React, { useEffect, useState } from "react";
import { getAssistList, getsearch } from "../services/Auth.List";
import { DataDelete } from "../services/Auth.nursehome";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";

export default function Nurse() {
  let navigate = useNavigate();
  const [show, setshow] = useState([]);
  const [input, setInput] = useState("");
  // console.log(input);
  const [page, setPage] = useState({});
  const [data, setData] = useState([]);
  const [select, setSelect] = useState(1);

  const handlePageClick = (data) => {
    setSelect(data.selected + 1);
  };

  useEffect(() => {
    const test = async () => {
      const response = await getAssistList(input, 8, select);
      console.log(response);
      setData(response.data.result.docs);
      setPage(response.data.result.totalPages);
      // setshow(response.data.result)
    };
    test();
  }, [input, select]);

  const handelDelete = async (_id) => {
    console.log(_id);
    const response = await DataDelete(_id);
    console.log(response);
    if (response) {
      console.log("dele api ");
      const response = await getAssistList(input, 8, select);
      setData(response.data.result.docs);
      //toast.error("Deleted Successsfully");
    }
  };

  const handleEdit = async () => {
    navigate("/editassist");
  };

  return (
    <>
      <Sidebar />
      <main id="main" class="main">
        <nav class="inner_nav">
          <div class="navbar-title">
            <a href="#">Hello, Assist Living Page!</a>
          </div>
          <div class="admin_box">
            <div class="form-group">
              <select class="form-select" aria-label="Default select example">
                <option selected>Select Nursing Home</option>
                <option value="1">Nursing Home 1</option>
                <option value="2">Nursing Home 2</option>
                <option value="3">Nursing Home 3</option>
              </select>
              <i class="fa-solid fa-angle-down"></i>
            </div>
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
                    <h4>Assisted Living</h4>
                  </div>
                  <div class="form-group form_box">
                    <input
                      type="text"
                      placeholder="Search"
                      class="form-control"
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <i class="fa-solid fa-search"></i>
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

                <div class="add_btn nurse_box">
                  <Link to="/addassist">
                    <i class="fas fa-plus"></i>Add Assist Living
                  </Link>
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
                      <th scope="col">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((data, index) => {
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
                          <td>{data.description}</td>
                          <td>
                            <div class="action_btn">
                              <button class="btn" onClick={() => handleEdit()}>
                                <i class="fa-solid fa-pen"></i>
                              </button>
                              <button
                                className="btn"
                                onClick={() => handelDelete(data._id)}
                              >
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
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={page}
                    previousLabel="<<"
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
