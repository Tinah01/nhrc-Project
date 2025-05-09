import React, { useState } from 'react'
import { Link } from 'react-router';
import { useRecoilState } from 'recoil';
import { userState } from '../../atom/UserAtom';
import { loginUser } from '../../util/api';
import { toast } from 'sonner';
import { allDepartments } from '../../util/userEnums';

export default function Login() {
  const [userdata, setUserData] = useRecoilState(userState)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    department: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    loginUser(form).then((res) => {
      console.log(res);
      toast.success('login successful')
      setLoading(false)
      setUserData(res.data)
    }).catch((err) => {
      setLoading(false)
    })
  };

  return (
    <div className='flex items-center jutify-center h-full w-full'>
      <form
        onSubmit={handleSubmit}
        className="w-full p-6 h-fit rounded-lg "
      >
        <h2 className="text-3xl text-[var(--primary)] font-bold mb-10 ">Hello, <br /> Welcome Back</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
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
        <div className='mb-4'>
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
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>

        <button
          disabled={form.department.length == 0 || form.password?.length == 0 || form.email.length == 0 || loading}
          type="submit"
          className='btn__pri !w-full'

        >
          {loading && <i className='pi pi-spin pi-spinner'></i>}
          Login
        </button>
        {/* <div className="flex items-center justify-between">
          <Link to='/forget-password' className='py-3 text-[var(--primary)] text-sm'>Forgot Password</Link>
        </div> */}
      </form>
    </div>
  )
}
