import React from 'react'
import { Navigate, Outlet } from 'react-router'
import logo from '../assets/images/nhrc__logo.png'
import { useRecoilValue } from 'recoil'
import { userState } from '../atom/UserAtom';

export default function AuthLayout() {

    const userData = useRecoilValue(userState)

     if (Object.entries(userData).length > 1) {
         return <Navigate to="/dashboard" />
     }

    return (
        <div className='grid md:grid-cols-2 bg-[var(--primary)]/2 h-screen overflow-hidden'>
            <div className="authBg bg-[var(--primary)]/50 bg-blend-screen hidden md:block  ">
            </div>
            <div className="p-10 h-[90%] w-full ">
                <div className="text-xl font-bold  pt-4">
                    <img src={logo} alt="" className='h-[73px]' />
                </div>
                <Outlet />
            </div>

        </div>
    )
}
