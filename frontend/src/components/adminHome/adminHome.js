


import React, { useEffect, useState } from "react";

export default function AdminHome() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRole, setNewRole] = useState("");
  useEffect(() => {
    getAllUser();
  }, [searchQuery]);

  const getAllUser = () => {
    fetch(`http://localhost:5000/getAllUser?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./auth/login";
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const deleteUser = (id) => {
    if (window.confirm(`Are you sure you want to delete ${id}`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    }
  };
  const handleAddRole = () => {
    fetch("http://localhost:5000/addRole", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userRole: newRole,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setIsModalOpen(false);
        setNewRole("");
      });
  };
  return (
    <div  className="bg-blueGray-100 min-h-screen p-6 font-sans px-3 py-3">
      <nav className="bg-blueGray-800 text-white p-4 rounded flex justify-between items-center" style={{  color: "#fff", padding: "10px 20px", display: "flex", justifyContent: "space-between" }}>
        <h2 className="text-center item-center justify-between">Admin Panel</h2>
        <button onClick={logOut} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600" style={{  color: "#fff", border: "none", padding: "10px 20px", cursor: "pointer" }}>
          Log Out
        </button>
      </nav>
      <div className="auth-wrapper" style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <div className="auth-inner rounded" style={{ width: "fit-content", padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <h3 className="text-center item-center justify-between">Welcome Admin</h3>
          <div style={{ position: "relative", marginBottom: 10 }}>
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              style={{
                padding: "8px 32px 8px 32px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
            <span style={{ position: "absolute", right: 10, top: 8, color: "#aaa" }}>
              {searchQuery.length > 0 ? `Records Found ${data.length}` : `Total Records ${data.length}`}
            </span>
          </div>
          <button
            style={{ marginBottom: 20, padding: "10px 20px",  border: "none", cursor: "pointer" }}
              className="ml-auto  bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            onClick={() => setIsModalOpen(true)}
          >
            Add Role
          </button>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "center", backgroundColor: "#334155" }}>
                <th className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider" >Name</th>
                <th   className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider" >Email</th>
                <th   className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider" >User Type</th>
                <th   className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider" >Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((i) => (
                <tr key={i.email} style={{ textAlign: "center" }}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{i.fname}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{i.email}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{i.userType}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <button
                      onClick={() => deleteUser(i.email)}
                       className="ml-auto  bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      style={{  border: "none", padding: "5px 10px", cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundColor: "#fff", padding: 20, borderRadius: 4, width: "300px" }}>
            <h3>Add Role</h3>
            <input
              type="text"
              placeholder="Role name"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <button
              onClick={handleAddRole}
              style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "#fff", border: "none", cursor: "pointer" }}
            >
              Add
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{ width: "100%", padding: "10px", backgroundColor: "#f44336", color: "#fff", border: "none", cursor: "pointer", marginTop: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
