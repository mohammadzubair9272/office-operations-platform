import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import ExportButtons from '../components/ExportButtons'
import api from '../utils/api'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function Home() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    api.get('/api/tasks').then((res) => setTasks(res.data)).catch(() => setTasks([]))
  }, [])

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <ExportButtons data={tasks} filename="tasks_report" />
      <div style={{ marginTop: 20 }}>
        <Link href="/tasks" passHref><Button variant="contained">Open Tasks</Button></Link>
      </div>
    </Layout>
  )
}
