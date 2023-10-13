import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <>
    <Sidebar />
    <Header />
      <section className="container mx-auto flex justify-center mt-12">
        <p>Tasks page</p>
      </section>
    </>
  )
}

export default page