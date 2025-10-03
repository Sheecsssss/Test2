import React from 'react'

export default function Staffing() {
  return (
    <main style={{ padding: 24 }}>
      <h2>Team Heatmap (MVP)</h2>
      <p>Placeholder – API `/api/team-load` to be connected.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:8 }}>
        {Array.from({length:21}).map((_,i)=>(
          <div key={i} style={{ padding:12, border:'1px solid #eee', textAlign:'center' }}>{Math.floor(Math.random()*120)}%</div>
        ))}
      </div>
    </main>
  )
}
