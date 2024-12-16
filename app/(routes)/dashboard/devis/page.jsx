"use client"

import React, { useState, useEffect } from 'react'
import Loading from '@/components/ui/Loading'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import DownloadButton from '@/components/ui/DownloadButton'
import Error from '@/components/ui/Error'
import { useGetAllDevis } from '@/hooks/useFetchDevis'

const ParticipantsCellRenderer = ({ value }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-blue-100 text-blue-800 font-semibold py-1 px-3 rounded-full text-sm">
        {value}
      </div>
    </div>
  );
};

const BooleanCellRenderer = ({ value }) => {
  const bgColor = value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  const displayText = value ? 'Yes' : 'No';

  return (
    <div className="flex items-center justify-center">
      <div className={`${bgColor} font-semibold py-1 px-3 rounded-full text-sm`}>
        {displayText}
      </div>
    </div>
  );
};

const DescriptionCellRenderer = ({ value }) => {
  return (
    <div
      className="whitespace-pre-wrap"
      title={value} // Tooltip to show full description on hover
    >
      {value}
    </div>
  );
};

export default function Devis() {
  const { data: initialDevis, error, isLoading, getAllDevis } = useGetAllDevis()

  const [devis, setDevis] = useState([])
  const [gridApi, setGridApi] = useState(null)

  useEffect(() => {
    getAllDevis()
  }, [])

  useEffect(() => {
    if (initialDevis) {
      setDevis(initialDevis)
    }
  }, [initialDevis])

  const onGridReady = (params) => {
    setGridApi(params.api)
  }

  const columnDefs = [
    { field: '_id', headerName: 'Devis ID', sortable: true, filter: true },
    { field: 'fullName', headerName: 'Full Name', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    { field: 'phone', headerName: 'Phone', sortable: true, filter: true },
    { field: 'areaId', headerName: 'Area ID', sortable: true, filter: true },
    { field: 'serviceType', headerName: 'Service Type', sortable: true, filter: true },
    {
      field: 'participantsNumber',
      headerName: 'Participants',
      sortable: true,
      filter: true,
      cellRenderer: ParticipantsCellRenderer,
    },
    {
      field: 'patnership',
      headerName: 'Partnership',
      sortable: true,
      filter: true,
      cellRenderer: BooleanCellRenderer,
    },
    {
      field: 'description',
      headerName: 'Description',
      sortable: true,
      filter: true,
      cellRenderer: DescriptionCellRenderer,
      autoHeight: true, // Enable auto height for this column
    },
  ]

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  }

  if (isLoading) return <Loading />
  if (error) return <Error />

  return (
    <div className="ag-theme-alpine h-[600px] w-full">
           <div className='text-4xl font-raleway font-semibold mb-4'>
           Devis
      </div>
      <div className=' flex justify-between items-center mb-4'>
        <div className='sm:flex-col flex text-base text-primary1 items-start space-x-2'>
          <div>All Devis ({devis.length || 0})</div>
          {/* <div>Available Rooms (TBD)</div>
          <div>Booked Rooms (TBD)</div> */}
        </div>
        <div>
        <DownloadButton 
        url="https://api.cnsl-tikjda.com/api/devis/export"
        title="Download Devis"
        className='border  bg-transparent border-primary1 text-primary1 hover:bg-primary1  hover:text-white  rounded-full font-bold text-lg'

    />
        </div>
      </div>
      <AgGridReact
        rowData={devis}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        paginationPageSize={6}
        onGridReady={onGridReady}
        rowHeight={70}
      />
    </div>
  )
}
