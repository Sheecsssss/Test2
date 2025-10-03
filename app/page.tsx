'use client'

import React, { useEffect, useState } from 'react'

export default function HomePage() {
  const [status, setStatus] = useState('Loading...')
  useEffect(() => {
    fetch('/api/health').then(r => r.json()).then(j => setStatus(j.status)).catch(()=>setStatus('Error'))
  }, [])
  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <h1>M&A Staffing – MVP</h1>
      <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12 }}>
        <h3>Status</h3>
        <p>{status}</p>
      </div>
      <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 12 }}>
        <h3>Links</h3>
        <ul>
          <li><a href="/my-week">My Week</a></li>
          <li><a href="/staffing">Staffing (Team)</a></li>
        </ul>
      </div>
    </main>
  )
}
