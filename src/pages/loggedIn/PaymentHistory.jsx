import React, { useEffect, useState } from 'react'
import TableDemo from '../../components/TableDemo'
import { getEmolumentRequest, nhrcEmolumentUpdate, sendEmolument } from '../../util/api'
import { toast } from 'sonner'
import { userState } from '../../atom/UserAtom'
import { useRecoilValue } from 'recoil'
import { usersEnum } from '../../util/userEnums'

export default function PaymentHistory() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const user = useRecoilValue(userState)

  const getallRequests = () => {
    getEmolumentRequest().then((res) => {
      const newData = res?.data?.map((item) => {
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
    try {
      const payload = {
        ...data,
        staffName: data.name,
      }
      await Promise.all([
        sendEmolument(payload),
        nhrcEmolumentUpdate(data)
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
    <div>
      <TableDemo getEmailData={getRowData} showSendBtn hideBtn={true} data={data} name={'Emolument Request'} loading={loading} />
    </div>
  )
}
