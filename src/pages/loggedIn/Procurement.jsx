import React, { useState } from 'react'
import TableDemo from '../../components/TableDemo';

export default function Procurement() {
  const initialData = [
    { Laptop_Model: "HP Spectre x360", Laptop_Id: "LAP001", Possessed_by: "Chinedu Okafor", Department: "Admin & HR", HOD: "Ngozi Ibe", Date_Assigned: "2025-01-10" },
    { Laptop_Model: "Dell XPS 13", Laptop_Id: "LAP002", Possessed_by: "Ngozi Ibe", Department: "Finance", HOD: "Chinedu Okafor", Date_Assigned: "2025-01-12" },
    { Laptop_Model: "MacBook Pro 16", Laptop_Id: "LAP003", Possessed_by: "Adebayo Adeyemi", Department: "Procurement", HOD: "Tolulope Oladipo", Date_Assigned: "2025-01-15" },
    { Laptop_Model: "Lenovo ThinkPad X1", Laptop_Id: "LAP004", Possessed_by: "Tolulope Oladipo", Department: "Admin & HR", HOD: "Ngozi Ibe", Date_Assigned: "2025-01-08" },
    { Laptop_Model: "Microsoft Surface Laptop 4", Laptop_Id: "LAP005", Possessed_by: "Ifeoma Nwosu", Department: "Finance", HOD: "Chinedu Okafor", Date_Assigned: "2025-01-14" }
  ];

  // State to hold the list of laptop assignments and form input values
  const [data, setData] = useState(initialData);
  const [form, setForm] = useState({
    Laptop_Model: '',
    Laptop_Id: '',
    Possessed_by: '',
    Department: '',
    HOD: '',
    Date_Assigned: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  // List of departments for the dropdown
  const departments = [
    "Admin & HR",
    "Finance",
    "Procurement",
    "IT Support",
    "Marketing",
    "Sales",
    "Customer Service",
    "Operations",
    "Research & Development",
    "Legal"
  ];

  // Handle form submission to add a new laptop assignment
  const handleSubmit = (e) => {
    e.preventDefault();
    const newLaptop = {
      Laptop_Model: form.Laptop_Model,
      Laptop_Id: form.Laptop_Id,
      Possessed_by: form.Possessed_by,
      Department: form.Department,
      HOD: form.HOD,
      Date_Assigned: form.Date_Assigned
    };
    setData([...data, newLaptop]); // Add new laptop assignment to the data
    setForm({
      Laptop_Model: '',
      Laptop_Id: '',
      Possessed_by: '',
      Department: '',
      HOD: '',
      Date_Assigned: ''
    }); // Reset form
  };

  return (
    <div>
      <TableDemo data={data} name={'Laptop Assignments'} >
        <form onSubmit={handleSubmit} className="bg-white p-3 rounded-lg space-y-2">
          {/* Laptop Model */}
          <div>
            <label htmlFor="Laptop_Model" className="block text-gray-700">Laptop Model</label>
            <input
              type="text"
              id="Laptop_Model"
              name="Laptop_Model"
              value={form.Laptop_Model}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          {/* Laptop ID */}
          <div>
            <label htmlFor="Laptop_Id" className="block text-gray-700">Laptop ID</label>
            <input
              type="text"
              id="Laptop_Id"
              name="Laptop_Id"
              value={form.Laptop_Id}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          {/* Possessed by */}
          <div>
            <label htmlFor="Possessed_by" className="block text-gray-700">Possessed by</label>
            <input
              type="text"
              id="Possessed_by"
              name="Possessed_by"
              value={form.Possessed_by}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="Department" className="block text-gray-700">Department</label>
            <select
              id="Department"
              name="Department"
              value={form.Department}
              onChange={handleInputChange}
              className="input"
              required
            >
              <option value="">Select a department</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          {/* HOD */}
          <div>
            <label htmlFor="HOD" className="block text-gray-700">Head of Department (HOD)</label>
            <input
              type="text"
              id="HOD"
              name="HOD"
              value={form.HOD}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          {/* Date Assigned */}
          <div>
            <label htmlFor="Date_Assigned" className="block text-gray-700">Date Assigned</label>
            <input
              type="date"
              id="Date_Assigned"
              name="Date_Assigned"
              value={form.Date_Assigned}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="!w-full btn__pri"
          >
            Add Laptop Assignment
          </button>
        </form>
      </TableDemo>
    </div>
  );
}
