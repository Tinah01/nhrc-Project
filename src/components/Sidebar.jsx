import React from 'react'
import {
  HomeIcon,
  DollarSignIcon,
  SettingsIcon,
  LogOutIcon,
  ContactIcon,
  BuildingIcon,
  BanknoteIcon,
  ShoppingBagIcon,
  GalleryVerticalEnd,
  ListMinus,
  ScreenShare,
  Table,
} from "lucide-react";

import logo from '../assets/images/nhrc__logo.png'
import { Link, NavLink } from 'react-router';
import { useRecoilState } from 'recoil';
import { userState } from '../atom/UserAtom';
import { staffState } from '../atom/StaffAtom';
import { allDepartments, usersEnum } from '../util/userEnums';

export default function Sidebar() {
  const [userdata, setUserdata] = useRecoilState(userState)
  const [staff, setStaff] = useRecoilState(staffState)

  console.log(userdata)


  const logout = () => {
    setUserdata({})
    setStaff(null)
  }

  return (
    <div>
      <aside className="w-[300px] bg-[var(--primary)]/20 h-screen  hidden lg:block p-5">
        <div className="text-xl font-bold  pt-4">
          <img src={logo} alt="" className='h-[43px]' />
        </div>
        <div className="flex flex-col w-full justify-between h-[90%]">
          {/* <div className="absolute text-sm p-1 px-3 rounded-full bottom-[20%] text-green-600 bg-green-100">{userdata?.department} Department</div> */}
          <nav className="mt-10 h-fit ">
            <ul className="space-y-3">
              <NavLink to='/dashboard' className="link">
                <HomeIcon size={20} />
                <span>{userdata.role == 'user' ? 'Home' : 'Dashboard'}</span>
              </NavLink>
              {(userdata?.department == 'Admin/Hr') || (userdata.role == usersEnum.superAdmin) ? <NavLink to='/staff' className="link">
                <ContactIcon size={20} />
                <span>Staff</span>
              </NavLink> : ""}
              {(userdata?.department == 'Admin/Hr') || (userdata.role == usersEnum.superAdmin) ? <NavLink to='/department' className="link">
                <BuildingIcon size={20} />
                <span>Department</span>
              </NavLink> : ""}
              {(userdata?.department == 'Finance' && userdata?.role !== 'user') ?
                <NavLink to='/requests' className="link">
                  <GalleryVerticalEnd size={20} />
                  <span>Payslip Requests</span>
                </NavLink> : ""}
              <NavLink to='/my-requests' className="link">
                <GalleryVerticalEnd size={20} />
                <span>My Payslip Requests</span>
              </NavLink>
              {(userdata?.department == 'Procurement'  && userdata?.role !== 'user' ) || (userdata?.role == usersEnum.superAdmin) && <><NavLink to='/all-devices' className="link">
                <ScreenShare size={20} />
                <span>All Devices</span>
              </NavLink>
                <NavLink to='/assigned-devices' className="link">
                  <Table size={20} />
                  <span>All Assigned Devices</span>
                </NavLink>
              </>}
              {/* {(userdata?.department == 'Finance') ? <NavLink to='/emolument-history' className="link">
                <ListMinus size={20} />
                <span>Emolument Requests</span>
              </NavLink> : ""}
              <NavLink to='/procurement' className="link">
                <ShoppingBagIcon size={20} />
                <span>Procurement</span>
              </NavLink> */}
            </ul>
          </nav>
          <div className="  flex items-end w-full">
            <ul className='h-fit w-full space-y-3'>
              <NavLink to='/settings' className="link">
                <SettingsIcon size={20} />
                <span>Settings</span>
              </NavLink>
              <div className="link" onClick={logout}>
                <LogOutIcon size={20} />
                <span>Logout</span>
              </div>
            </ul>
          </div>
        </div>
      </aside>

    </div>
  )
}
