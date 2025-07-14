import React, { useState } from "react";
import axios from "axios";
import "../index";
// State mgt code
const StateMgt = () => {
  const [stid, setStid] = useState(0);
  const [stname, setStName] = useState("");
  const [status, setStatus] = useState("");
  const [stlist, setStList] = useState([]);

  const handleStidText = (e) => {
    setStid(e.target.value);
  };

  const handleStNameText = (e) => {
    setStName(e.target.value);
  };

  const handleStatusText = (e) => {
    setStatus(e.target.value);
  };

  const handleAddNewButton = () => {
    axios
      .get("http://localhost:9191/state/show")
      .then((res) => {
        setStid(res.data.length + 1);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSaveButton = () => {
    if (!stid || !stname || !status) {
      alert("Please Fill All Fields");
      return;
    }
    axios
      .post("http://localhost:9191/state/save", {
        stid: stid,
        stname: stname,
        status: status
      })
      .then((res) => {
        alert("State Saved");
        setStid("");
        setStName("");
        setStatus("");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleShowButton = () => {
    axios
      .get("http://localhost:9191/state/show")
      .then((res) => {
        setStList(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSearchButton = () => {
    if (stid) {
      axios
        .get(`http://localhost:9191/state/search/${stid}`)
        .then((res) => {
          if (res.data) {
            setStid(res.data.stid);
            setStName(res.data.stname);
            setStatus(res.data.status);
          } else {
            alert("Data Not Found");
          }
        });
    } else if (stname) {
      axios
        .get(`http://localhost:9191/state/searchbyname/${stname}`)
        .then((res) => {
          if (res.data) {
            setStid(res.data.stid);
            setStName(res.data.stname);
            setStatus(res.data.status);
          }
        });
    }
  };

  const handleUpdateButton = () => {
    if (!stid || !stname || !status) {
      alert("Please Fill all fields");
      return;
    }
    axios
      .put("http://localhost:9191/state/update", {
        stid: stid,
        stname: stname,
        status: status
      })
      .then((res) => {
        alert("State Updated");
      });
  };

  const handleDeleteButton = () => {
    if (stid) {
      axios
        .delete(`http://localhost:9191/state/delete/${stid}`)
        .then((res) => {
          alert("State Disabled");
        });
    }
  };

  return (
    <div>
      <center>
        <h3>State Management</h3>
        <div className="myDiv">
          <table>
            <tbody>
              <tr>
                <td>State ID</td>
                <td>
                  <input
                    type="number"
                    value={stid}
                    onChange={handleStidText}
                  />
                </td>
              </tr>
              <tr>
                <td>State Name</td>
                <td>
                  <input
                    type="text"
                    value={stname}
                    onChange={handleStNameText}
                  />
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td>
                  <input
                    type="number"
                    value={status}
                    onChange={handleStatusText}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td><button onClick={handleAddNewButton}>New</button></td>
                <td><button onClick={handleSaveButton}>Save</button></td>
                <td><button onClick={handleShowButton}>Show</button></td>
                <td><button onClick={handleSearchButton}>Search</button></td>
                <td><button onClick={handleUpdateButton}>Update</button></td>
                <td><button onClick={handleDeleteButton}>Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="myDiv2">
          <table>
            <thead>
              <tr>
                <th>State ID</th>
                <th>State Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stlist.map((item) => (
                <tr key={item.stid}>
                  <td>{item.stid}</td>
                  <td>{item.stname}</td>
                  <td>{item.status == 1 ? "Enabled" : "Disabled"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </div>
  );
};

export default StateMgt;