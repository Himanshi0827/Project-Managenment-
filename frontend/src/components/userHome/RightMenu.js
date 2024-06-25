


import React, {  useEffect,useState } from 'react'; // Import useState

const RightMenu = ({ closeRightMenu, setContent }) => {
  const sidebarStyle = {
    display: 'none',
    width: '350px',
    backgroundColor: '#e2e8f0',
    position : 'absolute',
    zIndex: 1,
    overflowX: 'hidden',
    transition: '0.5s',
    right: 0,
    paddingTop: '60px'
  };
  const [showQueries, setShowQueries] = useState(false);
  const [queries, setQueries] = useState([]);
  // State to manage the visibility and data of query forms
  const [queryForms, setQueryForms] = useState({});
  const [queryInputs, setQueryInputs] = useState({}); // Manage input data
  const handleQueryResolve = (queryId) => {
    // Implement query resolution logic here
    alert(`Resolving query ${queryId}`);
  };
  const buttonStyle = {
    position: 'absolute',
    top: '5px',
    right: '10px',
  
    fontSize: '36px',
    marginRight: '5px',
    color: 'black',
    border: 'none',
    cursor: 'pointer'
  };

  const linkStyle = {
    padding: '8px 8px 8px 32px',
    textDecoration: 'none',
    fontSize: '25px',
    color: '#333',
    display: 'block',
    transition: '0.3s'
  };
  const linkStyle2 = {
    margin :'10px 32px',
    padding: ' 8px',
   
  };
  const toggleQueryForm = () => {
    // Assume some unique ID to toggle, here using a placeholder ID '123'
    setQueryForms(prevForms => ({
      ...prevForms,
      '123': !prevForms['123'] // Toggle visibility based on an example ID
    }));
  };

  const handleQueryInputChange = (e, requirementId) => {
    const { name, value } = e.target;
    setQueryInputs(prevInputs => ({
      ...prevInputs,
      [requirementId]: {
        ...prevInputs[requirementId],
        [name]: value,
      },
    }));
  };
  useEffect(() => {
    fetch("http://localhost:5000/queries")
.then((response) => response.json())
.then((data) => setQueries(data))
.catch((error) => console.error("Error fetching queries:", error));
}, []);
  const handleQueryFormSubmit = (e, requirementId) => {
    e.preventDefault();
    console.log("Query submitted for requirement:", requirementId);
    console.log("Query details:", queryInputs[requirementId]);
    // Here you would handle form submission, e.g., sending data to a server
  };

  return (
    <div style={sidebarStyle} id="rightMenu">
      <button onClick={closeRightMenu} style={buttonStyle}>&times;</button>
      <button onClick={toggleQueryForm} style={linkStyle2} className="bg-blueGray-800 ml-4 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150 mb-3 ml-4">
        Create Query
      </button>
      {/* <a onClick={() => setContent('Aim')} style={linkStyle}>Our Aim</a>
      <a onClick={() => setContent('Vision')} style={linkStyle}>Our Vision</a>
      <a onClick={() => setContent('Service1')} style={linkStyle}>Service 1</a>
      <a onClick={() => setContent('Service2')} style={linkStyle}>Service 2</a>
      <a onClick={() => setContent('Service3')} style={linkStyle}>Service 3</a> */}
      <button onClick={() => setShowQueries(!showQueries)} style={linkStyle2} className="bg-blueGray-800 ml-4 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150 mb-3 ml-4">
            {showQueries ? "Hide Queries" : "Show Queries"}
          </button>
      {queryForms['123'] && ( // Conditional rendering based on state
        <form onSubmit={(e) => handleQueryFormSubmit(e, '123')} className="mt-4 bg-blueGray-50 p-4 rounded shadow-inner" style={linkStyle2}>
          <div className="form-group mb-4">
            <label className="block text-blueGray-600 text-sm font-bold mb-2">
              Requirement ID:
            </label>
            <input
              type="text"
              name="requirementId"
              value={'123'} // Static ID for demo purposes
              readOnly // Make this readOnly if ID shouldn't change or input if it should
              className="form-control w-full"
            />
            <label className="block text-blueGray-600 text-sm font-bold mb-2">
              Enter your query:
            </label>
            <textarea
              name="query"
              value={queryInputs['123']?.query || ""}
              onChange={(e) => handleQueryInputChange(e, '123')}
              className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-blueGray-600 text-sm font-bold mb-2">
              Choose priority:
            </label>
            <select
              name="priority"
              value={queryInputs['123']?.priority || ""}
              onChange={(e) => handleQueryInputChange(e, '123')}
              className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="text-center mt-6">
            <button
            type="submit"
                                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                                >
                                  Submit Query
                                </button>
                              </div>
                            </form>
                          )}
                          {showQueries && (
         <div className="mt-4" style={linkStyle2}>
           <h2 className="text-blueGray-800">Queries</h2>
           {queries.map((query) => (
             <div key={query.id} className="bg-white p-4 my-2 rounded shadow-md">
               <p>{query.text}</p>
               <button onClick={() => handleQueryResolve(query.id)} className="bg-blueGray-600 text-white px-4 py-2 rounded shadow hover:bg-blueGray-700">
                 Resolve
               </button>
             </div>
             
           ))}
    </div>
  )}
  </div>
  );
};

export default RightMenu;
















