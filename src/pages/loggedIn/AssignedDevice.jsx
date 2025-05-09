import React, { useEffect, useState } from 'react'
import { assignDevice, getAllFilteredAssignedDevices, listDevices, nhrcAllUsers, nhrcRequestUpdate, sendNotification } from '../../util/api';
import TableDemo from '../../components/TableDemo';
import { toast } from 'sonner';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atom/UserAtom';
import { allDepartments } from '../../util/userEnums';

export default function AssignedDevice() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState()
    const [devices, setDevices] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [form, setForm] = useState({
        deviceId: '',
        email: '',
        department: '',
        comment: "",
    });

    const user = useRecoilValue(userState)

    const getallRequests = () => {
        getAllFilteredAssignedDevices().then((res) => {
            const newData = res?.map((item) => {
                const { _id, __v, updatedAt, deviceId, comment, ...others } = item
                return others
            })
            setData(newData)
        })
    }

    useEffect(() => {
        getallRequests()
        listDevices().then((res) => {
            setDevices(res)
        })

        nhrcAllUsers().then((res) => {
            setAllUsers(res.data)
        })
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmployee = {
            deviceId: form.deviceId,
            email: form.email,
            department: form.department,
            // comment: form.comment,
        };
        setLoading(true)
        assignDevice(newEmployee).then((res) => {
            setLoading(false)
            setOpen(false)
            getallRequests()
            toast.success("device assigned successfully")
            setForm({
                deviceId: '',
                email: '',
                department: '',
                // comment: "",
            });

        }).catch((err) => {
            setLoading(false)
        })

    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const filteredData = allUsers.filter((item) => item.department == form.department)

    return (
        <TableDemo createItemBtn={true} loading={loading} hideBtn={true} data={data} name={'Assigned Device'} setDialog={open}>
            <form onSubmit={handleSubmit} className="bg-white p-3 rounded-lg  space-y-2">

                <div>
                    <label htmlFor="Department" className="block text-gray-700">Devices</label>
                    <select
                        id="department"
                        name="deviceId"
                        value={form.deviceId}
                        onChange={handleInputChange}
                        className="input"
                        required
                    >
                        <option value="">Select a device</option>
                        {devices?.map((item, index) => (
                            <option key={index} value={item.deviceId}>
                                {item.deviceName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="">
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
                    <label htmlFor="email" className="block text-gray-700">user</label>
                    <select
                        id="email"
                        disabled={form.department === ''}
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        className="input"
                        required
                    >
                        <option value="">Select a user</option>
                        {filteredData?.map((item, index) => (
                            <option key={index} value={item.email}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* <div className="">
                    <label htmlFor="comment" className="block text-gray-700">Comment</label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows={10}
                        cols={10}
                        value={form.comment}
                        onChange={handleInputChange}
                        className="input !h-[100px] resize-none"
                        required
                    />
                </div> */}

                <button
                    type="submit"
                    disabled={loading || form.department == '' || form.deviceId == '' || form.email == ''}
                    className="!w-full flex items-center gap-3 mt-10 btn__pri"
                >
                    {loading && <i className='pi pi-spin pi-spinner'></i>}
                    Assign Device
                </button>
            </form>
        </TableDemo>
    )
}
