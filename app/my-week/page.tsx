'use client'

import React, { useEffect, useState } from 'react'

type Row = { dealId: string; dealName: string; role: string; actualS: number; s1: number; s2: number }

export default function MyWeek() {
  const [rows, setRows] = useState<Row[]>([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setRows([ { dealId: 'seed', dealName: 'Sell-side ABC', role: 'Analyst', actualS: 10, s1: 20, s2: 10 } ])
  }, [])

  async function submit() {
    setMsg('Saving...')
    const res = await fetch('/api/health').then(r=>r.json())
    setMsg(res.status === 'OK' ? 'Saved (demo)' : 'Error')
  }

  return (
    <main style={{ padding: 24 }}>
      <h2>My Week</h2>
      <p>Enter S (actual) and S+1/S+2 (forecast) – MVP demo.</p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>Deal</th><th>Role</th><th>S</th><th>S+1</th><th>S+2</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.dealName}</td>
              <td>{r.role}</td>
              <td><input defaultValue={r.actualS} /></td>
              <td><input defaultValue={r.s1} /></td>
              <td><input defaultValue={r.s2} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={submit} style={{ marginTop: 16, padding: '8px 12px' }}>Submit</button>
      <p>{msg}</p>
    </main>
  )
}
