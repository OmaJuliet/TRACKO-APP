import React, { useState } from 'react'
import Todo from './Todo'
import InProgress from './InProgress'
import Done from './Done'

const Lists = () => {
    
    return (
        <>
         {/* <section className="pl-24 pr-8 fixed mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"> */}
         <section className="pl-6 lg:pl-24 lg:w-4/12 grid grid-cols-1 msm:pl-0 lg:fixed mb-4">
            <Todo />
            {/* <InProgress />
            <Done /> */}
         </section>
        </>
    )
}

export default Lists