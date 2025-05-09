import { BuildingIcon, SendIcon, ShoppingBagIcon, UserIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ChartDemo from '../../components/ChartDemo'

import { Drawer } from "antd";
import { sendNotification } from '../../util/api';
import { useRecoilValue } from 'recoil';
import { staffState } from '../../atom/StaffAtom';
import { Dropdown } from 'primereact/dropdown';
import { userState } from '../../atom/UserAtom';
import { useNavigate } from 'react-router';

export default function Dashboard() {
  const user = useRecoilValue(userState)
  const allStaff = useRecoilValue(staffState)

  const data = [
    { title: "Staff", value: "3,231", icon: <UserIcon size={30} color='green' /> },
    { title: "Departments", value: "18", icon: <BuildingIcon size={30} color='green' /> },
    { title: "Procurement", value: "2,518", icon: <ShoppingBagIcon size={30} color='green' /> },
  ]

  const navigate = useNavigate()

  const  currentUser = ()=> {
    if (user?.role == 'user') return navigate('/user')
  }

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };




  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true)
    const payload = {
      email: form.Email,
      staffName: form.Name,
      amount: parseInt(form.Salary, 10)
    }

    sendNotification(payload).then((res) => {
      alert(res.message)
      setLoading(false)
      setOpen(false)
    }).catch((err) => {
      setLoading(false)
      alert(err.message)
      setOpen(false)

    })
  };

  useEffect(() => {
    currentUser()
  }, [])

  return (
    <div className=''>
      <div className="">
        <div className="">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-4 gap-4">
            <h1 className=' text-3xl'>
              👋 Welcome,
              <span className=' font-bold pl-2 '>{user?.name}</span>
            </h1>
            {/* <button onClick={showDrawer} className='btn__sec !bg-gray-100 hover:!bg-black '>
              <SendIcon size={18} />
              Send Email Notification
            </button> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {data?.map((item, index) => (
              <div
                key={index}
                className="p-10 bg-gray-200/20 flex items-center justify-between rounded-xl  border border-gray-200"
              >
                <div className=" flex flex-col gap-1">
                  {item.icon}
                  <h2 className="text-[15px] text-black uppercase font-medium">
                    {item.title}
                  </h2>
                </div>
                <div className="">
                  <p className="text-xl font-bold mt-1 text-[var(--primary)]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ChartDemo />
      </div>
      <Drawer title="Send Email Notification" onClose={onClose} open={open}>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="flex flex-col gap-3 items-center space-x-2">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A4.992 4.992 0 0112 15c1.657 0 3.156.672 4.121 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zM19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"></path>
            </svg>
            <Dropdown value={form} onChange={(e) => setForm(e.value)} options={allStaff} optionLabel='Name' filter className='w-full' />
          </div>

          <button type="submit" className="!w-full btn__pri" disabled={loading}>
            {loading && <i className='pi pi-spin pi-spinner'></i>}
            Send</button>
        </form>

        <div className=""></div>
      </Drawer>
    </div>
  )
}
