import React, { useState } from "react";

const MissingPetReport = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    type: "",
    gender: "",
    missingSince: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/reportMissingPet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      alert("Report submitted successfully");
      setFormData({
        name: "",
        age: "",
        type: "",
        gender: "",
        missingSince: "",
        description: "",
      });
    } else {
      alert("Failed to submit report");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pet Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
      </label>
      <label>
        Gender:
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
      </label>
      <label>
        Missing Since:
        <input
          type="date"
          name="missingSince"
          value={formData.missingSince}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default MissingPetReport;
