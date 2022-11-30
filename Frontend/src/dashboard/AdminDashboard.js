import React from "react";
import { useState, useEffect } from "react";
import {
  PhysicianList,
  nurseList,
  NursinghomeList,
} from "../services/Auth.nursehome";
import Sidebar from "../components/Sidebar";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { AllList } from "../services/Auth.List";
import { useSelector, useDispatch } from "react-redux";

// Sample chart data
const pdata = [
  {
    name: "jan",
    Textmessage: 11,
    fax: 90,
  },
  {
    name: "feb",
    Textmessage: 20,
    fax: 40,
  },
  {
    name: "mar",
    Textmessage: 5,
    fax: 50,
  },
  {
    name: "apr",

    Textmessage: 40,
    fax: 20,
  },
  {
    name: "may",
    Textmessage: 9,
    fax: 5,
  },
  {
    name: "jun",
    Textmessage: 7,
    fax: 40,
  },
  {
    name: "jul",
    Textmessage: 10,
    fax: 10,
  },
  {
    name: "aug",
    Textmessage: 4,
    fax: 6,
  },
  {
    name: "sep",
    Textmessage: 10,
    fax: 10,
  },
  {
    name: "oct",
    Textmessage: 4,
    fax: 20,
  },
  {
    name: "nov",
    Textmessage: 10,
    fax: 40,
  },
  {
    name: "dec",
    Textmessage: 50,
    fax: 90,
  },
];

export default function AdminDashboard() {
  const userdata = useSelector((state) => state.auth.data.result);
  let url = `http://localhost:8080/uploads/${userdata.image}`;
  // console.log(url);

  const [phy, setphy] = useState([]);
  const [nurse, setNurse] = useState([]);
  const [counthome, setcounthome] = useState([]);

  useEffect(() => {
    const test = async () => {
      const response1 = await AllList();
      setphy(response1.data.phy);
      setNurse(response1.data.nursedata);
      setcounthome(response1.data.nursinghome);
    };
    test();
  }, []);

  var phyCount = phy.length;
  var nurseCount = nurse.length;
  var nursingHomeCount = counthome.length;

  return (
    <>
      <Sidebar />
      <main id="main" className="main">
        <nav className="inner_nav">
          <div className="navbar-title">
            <a href="#">{userdata.name}</a>
          </div>
          <div className="admin_box">
            <div className="form-group">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Select Nursing Home</option>
                <option value="1">Nursing Home 1</option>
                <option value="2">Nursing Home 2</option>
                <option value="3">Nursing Home 3</option>
              </select>
              <i className="fa-solid fa-angle-down"></i>
            </div>
            <div className="bell_icon">
              <span>
                <i class="fa-sharp fa-solid fa-bell" />
              </span>
            </div>
            <div className="avtar_box">
              <span>
                <img src={url} className="img-fluid" alt="" />
              </span>
            </div>
          </div>
        </nav>

        <section className="dashboard_section">
          <div className="row">
            <div className="col-md-4">
              <div className="box nurshing">
                <div className="circle"></div>
                <div className="lBox">
                  <h5>Nursing Home</h5>
                  <p>{nursingHomeCount}</p>
                </div>
                <div className="rBox">
                  <img
                    src="../../assets/images/nurshing_card.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="box physician">
                <div className="circle"></div>
                <div className="lBox">
                  <h5>Physicians</h5>
                  <p>{phyCount}</p>
                </div>
                <div className="rBox">
                  <img
                    src="../../assets/images/doc_card.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="box nurse">
                <div className="circle"></div>
                <div className="lBox">
                  <h5>Nurses</h5>
                  <p>{nurseCount}</p>
                </div>
                <div className="rBox">
                  <img
                    src="../../assets/images/nurse_card.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          {/*  -------Physician---------   */}
          <div className="row mt-4">
            <div className="col-md-7">
              <div className="title">
                <h4>Physicians</h4>
                <a href="#">View All</a>
              </div>

              <div className="physician_box">
                <div className="table-responsive border-1 dashboard_physicain_table">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact No.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phy.map((data, index) => {
                        console.log("data", data);
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
            {/* ------------------- */}
            <div className="col-md-5">
              <div className="title">
                <div className="lBox">
                  <a href="">
                    <span className="chat_status"></span> Text Messages
                  </a>
                  <a href="" className="fax_btn">
                    <span className="fax_status"></span> Fax
                  </a>
                </div>
              </div>

              <div>
                <ResponsiveContainer width="100%" height="150%" aspect={3}>
                  <LineChart data={pdata} margin={{ right: 10, left: 0 }}>
                    <CartesianGrid />
                    <XAxis dataKey="name" interval={"preserveStartEnd"} />

                    <Legend />
                    <Tooltip />
                    <Line
                      dataKey="Textmessage"
                      stroke="green"
                      activeDot={{ r: 8 }}
                    />
                    <Line dataKey="fax" stroke="blue" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* <div className="chart_box">
                  <img src="../assets/images/graph-chart.png" className="img-fluid" alt="" />
                </div> */}

              {/* ---------------------Nurses-------------------- */}
              <div className="title my-4">
                <h4>Nurses</h4>
                <a href="#">View All</a>
              </div>

              <div className="table-responsive border-1 dashboard_nurse_table">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>

                  <tbody>
                    {nurse.map((data, index) => {
                      console.log("data", data);
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* </div> */}
            {/* ---------------------------------- */}
          </div>
        </section>
      </main>
    </>
  );
}
