import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import TableData from '@/data/TableData'
import React from 'react'

const page = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <section className="container mx-auto flex justify-center lg:pl-32">
        <TableData />
      </section>
    </>
  )
}

export default page