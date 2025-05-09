import React, { useEffect, useState } from 'react'
import TableDemo from '../../components/TableDemo'
import { useRecoilState, useRecoilValue } from 'recoil';
import { staffState } from '../../atom/StaffAtom';
import { nhrcAllUsers, register } from '../../util/api';
import { allDepartments, allUsers, usersEnum } from '../../util/userEnums';
import { userState } from '../../atom/UserAtom';
import { toast } from 'sonner';

export default function Staff() {
  const user = useRecoilValue(userState)

  // State to hold the list of employees and form input values
  const [data, setData] = useRecoilState(staffState);
  const [loading, setLoading] = useState(false)
  const [showCreateBtn, setShowCreateBtn] = useState(false)
  const [open, setOpen] = useState()
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: user?.department,
    amount: 0,
    role: usersEnum.user,
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
    const newEmployee = {
      name: form.name,
      email: form.email,
      department: form.department == 'Admin/Hr' ? "Admin" : form.department,
      amount: form.amount,
      role: form.role,
    };
    setLoading(true)
    register(newEmployee).then((res) => {
      setLoading(false)
      setOpen(false)
      getAllUsers()
      toast.success("Employee added successfully")
      setForm({
        name: '',
        email: '',
        department: user?.department,
        amount: 0,
        role: usersEnum.user,
      }); // Reset for

    }).catch((err) => {
      setLoading(false)
    })

  };

  const getAllUsers = () => {
    nhrcAllUsers().then((res) => {
      const newData = res?.data?.map((item) => {
        const { _id, creatorId, __v, updatedAt, verified, enabled, ...others } = item
        return others
      })

      const filteredData = newData.filter((res) => res.department == user.department)

      switch (user?.role) {
        case usersEnum.admin:
          setShowCreateBtn(true);
          setData(filteredData)
          break;
        case usersEnum.user:
          setShowCreateBtn(false);
          setData(filteredData)
          break;
        case usersEnum.superAdmin:
          setData(newData)
          setShowCreateBtn(true);
          break;
        default:
          break;
      }

    })
  }

  useEffect(() => {
    getAllUsers()
  }, [])


  return (
    <div>
      <TableDemo createItemBtn={showCreateBtn} data={data} name={'Staff'} setDialog={open} >
        <form onSubmit={handleSubmit} className="bg-white p-3 rounded-lg  space-y-2">
          <div>
            <label htmlFor="Name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="Email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-gray-700">Salary</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={form.amount}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          {user?.role == usersEnum.superAdmin && <> <div>
            <label htmlFor="Department" className="block text-gray-700">Department</label>
            <select
              id="department"
              name="department"
              value={form.department}
              onChange={handleInputChange}
              className="input"
              required
            >
              <option value="">Select a department</option>
              {allDepartments?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
            <div>
              <label htmlFor="role" className="block text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleInputChange}
                className="input"
                required
              >
                <option value="">Select a role</option>
                {allUsers?.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

          </>
          }


          <button
            type="submit"
            disabled={loading}
            className="!w-full flex items-center gap-3 mt-10 btn__pri"
          >
            {loading && <i className='pi pi-spin pi-spinner'></i>}
            Add Employee
          </button>
        </form>
      </TableDemo>
    </div>
  )
}
