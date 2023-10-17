import React from 'react';
import Image from 'next/image';

const Done = () => {
  return (
    <>
    <section className="">
        <section className="bg-gray-100 rounded-lg p-4 w-96 h-4/6 overflow-auto">
          <section className="flex flex-row justify-between border-b-4 border-green-500 pb-4">
            <section className="flex">
              <span className="bg-green-500 rounded-full p-1 w-2 h-2 text-sm flex justify-center items-center mt-2"></span>
              <span className="mx-2 text-black">Done</span>
              <span className="bg-gray-300 rounded-full p-2 w-6 h-6 text-sm flex justify-center items-center">1</span>
            </section>
          </section>

          <section className="mt-6">
            <section className="bg-white rounded-lg p-4">
              <section className="flex flex-row justify-between">
                <p className="text-green-500 bg-green-100 text-sm rounded py-1 px-2">Completed</p>
                <Image
                  src="../Assets/Icons/dots.svg"
                  className=""
                  width={24}
                  height={24}
                  alt="dots"
                />
              </section>
              <section className="mt-2">
                <h1 className="font-semibold text-lg">Heading</h1>
                <p className="text-sm mt-1 text-gray-500">Descriptive texts here. Descriptive texts here Descriptive texts here Descriptive texts here </p>
                <p className="pt-2">Assigned to: </p>
              </section>
            </section>
            
          </section>
        </section>
      </section>
  </>
  )
}

export default Done