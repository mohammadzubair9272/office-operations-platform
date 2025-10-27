import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import api from '../utils/api'
import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material'

export default function TasksPage() {
  const [tasks, setTasks] = useState([])

  useEffect(() => { fetchTasks() }, [])
  const fetchTasks = async () => {
    try {
      const res = await api.get('/api/tasks')
      setTasks(res.data)
    } catch (e) {
      setTasks([])
    }
  }

  const toggleDone = async (task) => {
    await api.put(`/api/tasks/${task._id}`, { ...task, done: !task.done })
    fetchTasks()
  }

  return (
    <Layout>
      <h2>Tasks</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Done</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Assigned To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map(t => (
            <TableRow key={t._id}>
              <TableCell>
                <Checkbox checked={t.done} onChange={() => toggleDone(t)} />
              </TableCell>
              <TableCell>{t.title}</TableCell>
              <TableCell>{t.assignedToName || t.assignedTo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  )
}
