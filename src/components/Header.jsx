import { Avatar } from 'antd'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { UserOutlined } from '@ant-design/icons';
import { userState } from '../atom/UserAtom'
import logo from '../assets/images/nhrc__logo.png'
import Sidebar from './Sidebar'
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
import { usersEnum } from '../util/userEnums';


export default function Header() {
    const [userdata, setUserdata] = useRecoilState(userState)
    const [open, setOpen] = useState(false)

    const logout = () => {
        setUserdata({})
    }

    const openMenu = () => {
        setOpen(!open)
    }

    const closeMenu = () => {
        setOpen(false)
    }

    return (
        <>
            <div className=' hidden lg:block h-[80px] w-full lg:w-[calc(100vw-300px)] p-5 z-[1000] fixed right-0 top-0 bg-white shadow-xl shadow-gray-50'>
                <div className="flex items-center justify-baseline w-full">
                    <div className="w-full flex items-center gap-3 ">
                        <Avatar size={34} icon={<UserOutlined />} />
                        <div className="flex gap-2 items-center">
                            <div className='text-lg font-bold  '>{userdata?.name} </div>
                        </div>
                        <div className=" text-sm p-1 px-3 rounded-full bottom-[20%] text-green-600 bg-green-100">{userdata?.department} Department</div>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* <Link to='/settings' className="link">
                            <SettingsIcon size={20} />
                            <span>Settings</span>
                        </Link> */}
                        <div className="link" onClick={logout}>
                            <LogOutIcon size={20} />
                            <span>Logout</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="block fixed bg-white shadow-2xl shadow-gray-100 top-0 left-0 w-full  lg:hidden h-[80px]">
                <div className=" w-[90%] h-full flex items-center justify-between m-auto">
                    <img src={logo} alt="" className='h-[43px] object-cover ' />
                    <div className="h-[45px] w-[45px] shadow-2xl cursor-pointer flex items-center justify-center" onClick={openMenu}>
                        <i className='pi pi-bars'></i>
                    </div>
                </div>
            </div>
            {
                open &&
                <div>
                    <aside className="w-full bg-white h-screen fixed top-0 left-0 z-50  p-5">
                        <div className="flex items-center justify-between">
                            <img src={logo} alt="" className='h-[43px]' />

                            <div className="h-[45px] w-[45px] shadow-2xl cursor-pointer flex items-center justify-center" onClick={openMenu}>
                                <i className='pi pi-times'></i>
                            </div>
                        </div>
                        <div className="flex flex-col w-full justify-between h-[90%]">
                            <nav className="mt-10 h-fit ">
                                <ul className="space-y-3">
                                    <NavLink to='/dashboard' onClick={closeMenu} className="link">
                                        <HomeIcon size={20} />
                                        <span>{userdata.role == 'user' ? 'Home' : 'Dashboard'}</span>
                                    </NavLink>
                                    {(userdata?.department == 'Admin/Hr') || (userdata.role == usersEnum.superAdmin) ? <NavLink to='/staff' onClick={closeMenu} className="link">
                                        <ContactIcon size={20} />
                                        <span>Staff</span>
                                    </NavLink> : ""}
                                    {(userdata?.department == 'Admin/Hr') || (userdata.role == usersEnum.superAdmin) ? <NavLink to='/department' onClick={closeMenu} className="link">
                                        <BuildingIcon size={20} />
                                        <span>Department</span>
                                    </NavLink> : ""}
                                    {(userdata?.department == 'Finance' && userdata?.role !== 'user') ?
                                        <NavLink to='/requests' onClick={closeMenu} className="link">
                                            <GalleryVerticalEnd size={20} />
                                            <span>Payslip Requests</span>
                                        </NavLink> : ""}
                                    <NavLink to='/my-requests' onClick={closeMenu} className="link">
                                        <GalleryVerticalEnd size={20} />
                                        <span>My Payslip Requests</span>
                                    </NavLink>
                                    {(userdata?.department == 'Procurement' && userdata?.role !== 'user') || (userdata?.role == usersEnum.superAdmin) && <><NavLink onClick={closeMenu} to='/all-devices' className="link">
                                        <ScreenShare size={20} />
                                        <span>All Devices</span>
                                    </NavLink>
                                        <NavLink to='/assigned-devices' onClick={closeMenu} className="link">
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
                                    <NavLink to='/settings' onClick={closeMenu} className="link">
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
            }
        </>
    )
}
