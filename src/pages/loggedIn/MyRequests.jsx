import React, { useEffect, useState } from 'react'
import { nhrcRequest, nhrcRequestUpdate, payslipRequest, sendNotification } from '../../util/api';
import TableDemo from '../../components/TableDemo';
import { toast } from 'sonner';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atom/UserAtom';
import { usersEnum } from '../../util/userEnums';

export default function MyRequests() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const user = useRecoilValue(userState)
    const { salary, ...others } = user


    const payload = {
        amount: salary,
        ...others
    }
    const requestPayslip = async () => {
        setLoading(true)
        await nhrcRequest(payload).then((res) => {
            toast.success(res.message)
            getallRequests()
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
    }

    const getallRequests = () => {
        payslipRequest().then((res) => {
            const newData = res.data?.map((item) => {
                const { _id, __v, updatedAt, requestType, ...others } = item
                return others
            })
            const filteredData = newData.filter((res) => res.email == user.email)
            setData(filteredData)


        })
    }

    useEffect(() => {
        getallRequests()
    }, [])


    return (
        <div className="">
            <button
                onClick={requestPayslip}
                disabled={loading}
                className="btn__pri ml-auto">
                {loading ? <i className='pi pi-spin pi-spinner'></i> : <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.3011 8.69881L8.17808 11.8219M8.62402 12.5906L8.79264 12.8819C10.3882 15.6378 11.1859 17.0157 12.2575 16.9066C13.3291 16.7974 13.8326 15.2869 14.8397 12.2658L16.2842 7.93214C17.2041 5.17249 17.6641 3.79266 16.9357 3.0643C16.2073 2.33594 14.8275 2.79588 12.0679 3.71577L7.73416 5.16033C4.71311 6.16735 3.20259 6.67086 3.09342 7.74246C2.98425 8.81406 4.36221 9.61183 7.11813 11.2074L7.40938 11.376C7.79182 11.5974 7.98303 11.7081 8.13747 11.8625C8.29191 12.017 8.40261 12.2082 8.62402 12.5906Z"
                        stroke="white" stroke-width="1.6" stroke-linecap="round" />
                </svg>}
                <span className="">Request Payslip</span>
            </button>
            <TableDemo loading={loading} hideBtn={true} data={data} name={'My Payslip Requests'} hideExport>
            </TableDemo>
        </div>
    )
}
