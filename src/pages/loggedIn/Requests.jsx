import React, { useEffect, useState } from 'react'
import { nhrcRequest, nhrcRequestUpdate, payslipRequest, sendNotification } from '../../util/api';
import TableDemo from '../../components/TableDemo';
import { toast } from 'sonner';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atom/UserAtom';
import { usersEnum } from '../../util/userEnums';

export default function Requests() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const user = useRecoilValue(userState)

    const getallRequests = () => {
        payslipRequest().then((res) => {
            const newData = res.data?.map((item) => {
                const { _id, __v, updatedAt, requestType, ...others } = item
                return others
            })
            const filteredData = newData.filter((res) => res.department == user.department)

            switch (user?.role) {
                case usersEnum.user:
                    setData(filteredData)
                    break;
                case usersEnum.admin:
                case usersEnum.superAdmin:
                    setData(newData)
                    break;
                default:
                    break;
            }

        })
    }

    useEffect(() => {
        getallRequests()
    }, [])


    const getRowData = async (data) => {
        setLoading(true);
        const payload = {
            email: data.email,
            staffName: data.name,
            amount: data?.amount
        }
        try {
            await Promise.all([
                sendNotification(payload),
                nhrcRequestUpdate(data)
            ]);
            toast.success('Email sent successfully')
            setLoading(false);
            getallRequests()

        } catch (error) {
            setLoading(false);
            toast.error("Error occurred while fetching data:", error);
        }
    };

    return (
        <TableDemo loading={loading} getEmailData={getRowData} showSendBtn hideBtn={true} data={data} name={'Payslip Requests'}>
        </TableDemo>
    )
}
