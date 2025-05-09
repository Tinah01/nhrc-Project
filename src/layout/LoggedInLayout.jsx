import React from 'react'
import { Navigate, Outlet } from 'react-router'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useRecoilValue } from 'recoil'
import { userState } from '../atom/UserAtom'

export default function LoggedInLayout() {

    const userData = useRecoilValue(userState)

    if (Object.entries(userData).length == 0) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <div className="">
                <div className="fixed top-0 left-0 h-screen  ">
                    <Sidebar />
                </div>
                <div className=" absolute right-0 lg:w-[calc(100vw-300px)] w-full h-screen p-4 lg:p-10">
                    <Header />
                    <div className=" mt-[80px]">
                        <Outlet />
                    </div>
                </div>
            </div>

        </div>
    )
}
