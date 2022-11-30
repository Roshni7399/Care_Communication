import React from "react";
import { useState, useEffect } from "react";
import NursinghomeSidebar from "../components/NursinghomeSidebar";
import {
  PhysicianList,
  CountList,
  nurseList,
} from "../services/Auth.nursehome";
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

export default function NursingHomeDash() {
  const userdata = useSelector((state) => state.auth.data.result);
  let url = `http://localhost:8080/uploads/${userdata.image}`;
  // console.log(url);

  // const [show, setShow] = useState([])
  const [count, setCount] = useState({});
  console.log("count", count.countNurse);
  const [phy, setphy] = useState([]);
  const [nur, setnur] = useState([]);

  useEffect(() => {
    const test = async (e) => {
      const countdata = await CountList();
      setCount(countdata.data);
      const responses = await AllList();
      setphy(responses.data.phy);
      setnur(responses.data.nursedata);
    };
    test();
  }, []);


  return (
    <>
      <NursinghomeSidebar />
      <main id="main" className="main">
        <nav className="inner_nav">
          <div className="navbar-title">
            <a href="#">{userdata.name}</a>
          </div>
          <div className="admin_box">
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
                  <h5>Physicians</h5>
                  <p>{count.countPhysician}</p>
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
                  <h5>Nurses</h5>
                  <p>{count.countNurse}</p>
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

            <div className="col-md-4 ">
              <ResponsiveContainer width="100%" height="100%" aspect={2}>
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
                    {nur.map((data, index) => {
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
