import './globals.css'
import React from 'react'

export const metadata = {
  title: 'M&A Staffing',
  description: 'Internal staffing planner'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
