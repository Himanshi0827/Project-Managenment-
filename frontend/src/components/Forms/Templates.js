import React, { useEffect, useState } from 'react';

function Templates() {
  const [taskNames, setTaskNames] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");

  useEffect(() => {
    const fetchTaskNames = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/templates");
        const data = await response.json();
        setTaskNames(data.map(template => template.templateName));
      } catch (error) {
        console.error("Error fetching task names:", error);
      }
    };

    fetchTaskNames();
  }, []);

  const handleChange = (event) => {
    setSelectedTask(event.target.value);
  };

  return (
    <div>
      <label htmlFor="taskSelect">Select a Task:</label>
      <select id="taskSelect" value={selectedTask} onChange={handleChange}>
        <option value="" disabled>Select a task</option>
        {taskNames.map((taskName, index) => (
          <option key={index} value={taskName}>
            {taskName}
          </option>
        ))}
      </select>
      {selectedTask && (
        <div>
          <p>You selected: {selectedTask}</p>
        </div>
      )}
    </div>
  );
}

export default Templates;
