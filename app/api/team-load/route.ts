import { NextResponse } from 'next/server'
export async function GET() {
  const data = Array.from({length: 21}).map((_,i)=>({ cell: i, utilization: Math.floor(Math.random()*120) }))
  return NextResponse.json({ data })
}
