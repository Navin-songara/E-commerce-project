import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductCatgMgt = () => {
  const [pcatid, setPcatid] = useState(1); 
  const [pcatName, setPcatName] = useState("");
  const [pcatList, setPcatList] = useState([]);

  const handlePcatidText = (e) => {
    setPcatid(Number(e.target.value));
  };

  const handlePcatNameText = (e) => {
    setPcatName(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:9191/productcat/showproductcat")
      .then((res) => {
        console.log("API Response:", res.data);
        setPcatList(Array.isArray(res.data) ? res.data : []); 
        setPcatid(res.data.length ? res.data.length + 1 : 1);
      })
      .catch((err) => {
        console.error("Error fetching product categories:", err);
        setPcatList([]); 
      });
  }, []);

  const handleSaveButton = () => {
    if (!pcatName.trim()) {
      alert("Please enter a valid category name");
      return;
    }

    axios.post(`http://localhost:9191/productcatg/addproduct/${pcatid}/${pcatName}`)
      .then(() => {
        alert("Category added successfully!");
        setPcatName("");
        handleShowButton();
      })
      .catch((err) => {
        console.error("Error saving category:", err);
      });
  };

  const handleShowButton = () => {
    axios.get("http://localhost:9191/productcatg/showproductcat")
      .then((res) => {
        setPcatList(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setPcatList([]);
      });
  };

  return (
    <div>
      <center>
        <p style={{ color: "skyblue" }}>Product Category Form</p>
        <table>
          <tbody>
            <tr>
              <td>Product ID</td>
              <td> 
                <input
                  type="number"
                  className="form-control"
                  value={pcatid}
                  onChange={handlePcatidText}
                />
              </td>
            </tr>
            <tr>
              <td>Category Name</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={pcatName}
                  onChange={handlePcatNameText}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="button" onClick={handleSaveButton}>
                  Save
                </button>
              </td>
              <td>
                <button type="button" onClick={handleShowButton}>
                  Show
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p style={{ color: "blue", backgroundColor: "grey" }}>
          Product Category List
        </p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(pcatList) && pcatList.length > 0 ? (
              pcatList.map((item) => (
                <tr key={item.pcatid}>
                  <td>{item.pcatid}</td>
                  <td>{item.pcatName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No categories available</td>
              </tr>
            )}
          </tbody>
        </table>
      </center>
    </div>
  );
};

export default ProductCatgMgt;
