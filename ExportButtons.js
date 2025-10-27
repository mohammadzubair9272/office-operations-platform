import React from 'react'
import { Button } from '@mui/material'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { CSVLink } from 'react-csv'

export default function ExportButtons({ data = [], filename = 'report' }) {
  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text('Report', 14, 10)
    const head = [Object.keys(data[0] || {})]
    const body = data.map((row) => Object.values(row))
    autoTable(doc, { startY: 20, head, body })
    doc.save(`${filename}.pdf`)
  }

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, `${filename}.xlsx`)
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Button variant="contained" onClick={exportPDF}>Export PDF</Button>
      <Button variant="contained" onClick={exportExcel}>Export Excel</Button>
      <CSVLink data={data} filename={`${filename}.csv`} style={{ textDecoration: 'none' }}>
        <Button variant="contained">Export CSV</Button>
      </CSVLink>
      <Button variant="outlined" onClick={() => window.print()}>Print</Button>
    </div>
  )
}
