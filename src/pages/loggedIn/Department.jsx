import React, { useState } from 'react'
import TableDemo from '../../components/TableDemo';
import { useRecoilState } from 'recoil';
import { departmentState } from '../../atom/DepartmentAtom';
import { allDepartmentsEnums } from '../../util/userEnums';

export default function Department() {

  const [data, setData] = useRecoilState(departmentState);
  const [form, setForm] = useState({
    Department: '',
    HOD: '',
    Department_Id: '',
    Number_of_Staff: ''
  });
  

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDepartment = {
      Department: form.Department,
      HOD: form.HOD,
      Department_Id: form.Department_Id,
      Number_of_Staff: parseInt(form.Number_of_Staff)
    };
    setData([...data, newDepartment]); // Add new department to the data
    setForm({
      Department: '',
      HOD: '',
      Department_Id: '',
      Number_of_Staff: ''
    }); // Reset form
  };

  return (
    <div>
      <TableDemo hideBtn={true} data={allDepartmentsEnums} name={'Departments'}>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg  space-y-4">
          <div>
            <label htmlFor="Department" className="block text-gray-700">Department</label>
            <input
              type="text"
              id="Department"
              name="Department"
              value={form.Department}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

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

          <div>
            <label htmlFor="Department_Id" className="block text-gray-700">Department ID</label>
            <input
              type="text"
              id="Department_Id"
              name="Department_Id"
              value={form.Department_Id}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="Number_of_Staff" className="block text-gray-700">Number of Staff</label>
            <input
              type="number"
              id="Number_of_Staff"
              name="Number_of_Staff"
              value={form.Number_of_Staff}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          <button
            type="submit"
            className="btn__pri !w-full"
          >
            Add Department
          </button>
        </form>
      </TableDemo>
    </div>
  )
}
