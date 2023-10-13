import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import NotificationPage from '@/components/notifications/Notification';

const page = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <section className="container mx-auto flex justify-center">
        <p>Notifications page</p>
      </section>
      <NotificationPage />
    </>
  )
}

export default page
