
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import moment from 'moment';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';

export default function TableDemo({ data, name, children, setDialog, createItemBtn, loading, showSendBtn, printBtn, getEmailData, hideExport }) {

    const [productDialog, setProductDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const products = data ?? []
    const allColumns = data?.length > 0 ? Object.keys(data?.[0])?.map((res) => res) : []
    const wrapper_ref = React.useRef();
    const openNew = () => {
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const getDialog = () => {
        const data = setDialog
        if (!data) {
            hideDialog()
        }
    }


    const handleData = (info) => {
        getEmailData(info)
    }

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                {createItemBtn && <button className='btn__sec' onClick={openNew} >
                    <i className='pi pi-plus'></i>
                    New</button>}

            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <button className="btn__pri" onClick={exportCSV}>
            <i className='pi pi-file-excel'></i>
            Export to CSV
        </button>;
    };

    const barCodeTemplate = (rowData) => {
        return <div ref={wrapper_ref}>
            <QRCode
                size={80}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={JSON.stringify(rowData)}
                viewBox={`0 0 256 256`}
            />
            {/* <Barcode height={40} displayValue={false} fontSize={20} value={JSON.stringify(rowData)} /> */}
        </div>;
    };

    const printBarcode = (e) => {
        const opt = {
            scale: 4
        }
        const elem = wrapper_ref.current;
        html2canvas(elem, opt).then(canvas => {
            const iframe = document.createElement('iframe')
            iframe.name = 'printf'
            iframe.id = 'printf'
            iframe.height = 0;
            iframe.width = 0;
            document.body.appendChild(iframe)

            const imgUrl = canvas.toDataURL({
                format: 'jpeg',
                quality: '1.0'
            })

            const style = `
               height:50vh;
               width:100vw;
           `;

            const url = `<img style="${style}" src="${imgUrl}"/>`;
            var newWin = window.frames["printf"];
            newWin.document.write(`<body onload="window.print()">${url}</body>`);
            newWin.document.close();

        });
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                {showSendBtn && <button onClick={() => handleData(rowData)} disabled={loading} className='btn__sec !border-black/30 !h-[40px]'> {loading && <i className='pi pi-spin pi-spinner'></i>} Send Email</button>}
                {
                    printBtn && <button onClick={printBarcode} disabled={loading} className='btn__sec !border-black/30 !h-[40px]'> {loading && <i className='pi pi-spin pi-spinner'></i>} Print 🖨️</button>
                }
            </>
        )
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <span>
                {rowData.creaetedAt ? moment(rowData.createdAt).format("MMMM Do YYYY") : moment(rowData.assignedAt).format("MMMM Do YYYY")}
            </span>
        );
    };

    const adminBodyTemplate = (rowData) => {
        return (
            <span
            >
                {rowData.department === 'Admin' ?
                    'Admin/hr' : rowData.department

                }
            </span>
        );
    };

    const tabBodyTemplate = (rowData) => {
        return (
            <div>
                {
                    rowData?.requestSent ?
                        <span className='text-sm p-1 rounded-full px-3 bg-green-200 text-green-600'>Sent</span>
                        :
                        <span className='text-sm p-1 rounded-full px-2 bg-yellow-200 text-yellow-600'>Pending</span>
                }
            </div>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText className='text-sm' type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );

    useEffect(() => {
        getDialog()
    }, [setDialog])


    return (
        <div>
            <Toast ref={toast} />
            <h4 className="m-0 font-bold py-3 text-xl">List of all {name}</h4>
            <div className="card">
                {!hideExport && <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>}
                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} " globalFilter={globalFilter} header={header}>

                    {allColumns && allColumns?.map((item) => (

                        <Column className='text-sm' field={item} header={item.split('_').join(" ")} body={(item == 'createdAt' || item == 'assignedAt') ? statusBodyTemplate : item == 'requestSent' ? tabBodyTemplate : item == 'department' ? adminBodyTemplate : item == 'barcode' ? barCodeTemplate : ''}></Column>

                    ))
                    }
                    {/* <Column
                        body={statusBodyTemplate}
                        className="border-b"
                        header="Created At"
                    /> */}
                    <Column body={actionBodyTemplate} ></Column>
                </DataTable>
            </div>

            <Dialog modal visible={productDialog} draggable={false} resizable={false} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header={`New ${name}`} className="p-fluid" onHide={hideDialog}>
                {children}
            </Dialog>


        </div>
    );
}
