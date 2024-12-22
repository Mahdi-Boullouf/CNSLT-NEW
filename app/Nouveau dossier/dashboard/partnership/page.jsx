"use client"
import React, { useState, useEffect ,useMemo } from 'react'
import { useGetAllPartnership } from '@/hooks/useFetchPartnership'
import Loading from '@/components/ui/Loading'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import Error from '@/components/ui/Error'
import { useDeletPartnership } from '@/hooks/useFetchPartnership'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Download ,Trash } from "lucide-react";

export default function Page() {
  const { data, error, isLoading, getAllPartnership } = useGetAllPartnership()
  const {deletPartnership} = useDeletPartnership()
  const [partnership, setPartnership] = useState([])

  useEffect(() => {
    getAllPartnership()
  }, [])

  useEffect(() => {
    if (data) {
      setPartnership(data)
    }
  }, [data])

//   const openPDF = (id) => {
//   }

  const deletePDF = async (id) => {
    try {
         const {data}=  await deletPartnership(id);
         setPartnership(partnership.filter((item) => item._id !== id))
         toast.success(data.message)
      } catch (error) {
        console.error("Error deleting event:", error);
      }
  }

  const downloadPDF = (id) => {
    window.open(`https://api.cnsl-tikjda.com/api/files/download/${id}`, '_blank')

  }
  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth:30 ,
    resizable: true,
  }), [])
  const columnDefs = [
    { headerName: 'ID', field: '_id',  filter: true },
    { headerName: 'File Name', field: 'fileLink', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div className="flex items-center justify-center p-2">
      
          <Button 
          onClick={() => downloadPDF(params.data._id)}
       
        className="text-black flex items-center border px-2 py-1 text-sm rounded mr-2 bg-green-500 hover:bg-opacity-60 active:bg-green-200"
      >
        <Download className="h-4 w-4 text-white" />
      </Button>
      <Button
        onDoubleClick={() => deletePDF(params.data._id)}
        className="text-black flex items-center border px-2 py-1 text-sm rounded mr-2 bg-red-500 hover:bg-opacity-60 active:bg-blue-200"
      >
        <Trash className="h-4 w-4 text-white" />
      </Button>
    </div>
      )
    }
  ]

  if (isLoading) return <Loading />
  if (error) return <Error message={error} />

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
     
     
      <AgGridReact
        columnDefs={columnDefs}
        rowData={partnership}
        pagination={true}
        paginationPageSize={10}
        rowHeight={70}
        defaultColDef={defaultColDef}


      />
    </div>
  )
}