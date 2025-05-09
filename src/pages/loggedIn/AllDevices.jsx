import React, { useEffect, useState } from 'react'
import { addDevice, listDevices } from '../../util/api';
import TableDemo from '../../components/TableDemo';
import { toast } from 'sonner';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atom/UserAtom';

export default function AllDevices() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showCreateBtn, setShowCreateBtn] = useState(true)
    const user = useRecoilValue(userState)
    const [open, setOpen] = useState()
    const [form, setForm] = useState({
        deviceName: '',
    });


    const getAllDevices = () => {
        listDevices().then((res) => {
            const newData = res?.map((item) => {
                const { _id, __v, updatedAt, ...others } = item
                return others
            })
            setData(newData)
        })
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            deviceName: form.deviceName,
        };
        setLoading(true)
        console.log(payload);

        addDevice(payload).then((res) => {
            setLoading(false)
            setOpen(false)
            getAllDevices()
            toast.success("Device added successfully")
            setForm({
                deviceName: '',
            }); // Reset for

        }).catch((err) => {
            setLoading(false)
        })

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };


    useEffect(() => {
        getAllDevices()
    }, [])


    return (
        <TableDemo createItemBtn={showCreateBtn} loading={loading} printBtn hideBtn={false} data={data} name={'Device'} setDialog={open}>
            <form onSubmit={handleSubmit} className="bg-white p-3 rounded-lg  space-y-2">
                <div>
                    <label htmlFor="Name" className="block text-gray-700">Device Name</label>
                    <input
                        type="text"
                        id="deviceName"
                        name="deviceName"
                        value={form.deviceName}
                        onChange={handleInputChange}
                        className="input"
                        required
                    />
                </div>



                <button
                    type="submit"
                    disabled={loading || form.deviceName == ''}
                    className="!w-full flex items-center gap-3 mt-10 btn__pri"
                >
                    {loading && <i className='pi pi-spin pi-spinner'></i>}
                    Add Device
                </button>
            </form>
        </TableDemo>
    )
}
