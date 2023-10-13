'use client'
import React from "react";
import { useState, useEffect } from "react";
import { FaArrowDown, FaFilter } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && event.target) {
        const modalContent = document.querySelector(".modal-content");
        if (modalContent && !modalContent.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const data = [
    { icon: "../Assets/Icons/clipboard.svg", text: "Copy link" },
    { icon: "../Assets/Icons/email.svg", text: "Email" },
    { icon: "../Assets/Icons/twitter.svg", text: "Twitter(X)" },
    { icon: "../Assets/Icons/whatsapp.svg", text: "Whatsapp" },
    { icon: "../Assets/Icons/facebook.svg", text: "Facebook" },
    { icon: "../Assets/Icons/dot.svg", text: "More" },
  ];


  return isOpen ? (
    <section className="fixed top-0 z-50 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
      <section className="bg-white rounded px-8 py-10 w-fit modal-content">
        <h2 className="text-lg font-medium mb-6 mx-2">☺ Share this app</h2>
        <section className="">
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {data.map((item, index) => (
            <article className="bg-gray-100 rounded px-4 py-4 mx-2 flex cursor-pointer" key={index}>
              <img src={item.icon} className="w-6 h-6" alt="" />
              <h1 className="ml-3 text-lg">{item.text}</h1>
            </article>
            ))}
          </section>
        </section>
      </section>
    </section>
  ) : null;
};


const Sorting: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSortBoxClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <>
      <section className="container py-10 mx-auto pl-24 pr-8">
        <section className="flex flex-row justify-between">
          <section className="flex flex-wrap relative">
            <section className="flex">
              <section className="w-32 mr-2 bg-white text-black flex flex-row border border-gray-500 px-3 cursor-pointer rounded">
                <FaFilter className="text-gray-400 mt-3 text-lg" />
                <p className="text-gray-400 text-lg ml-2 mt-2">Filter</p>
                <FaArrowDown className="text-gray-400 mt-3 ml-4 text-lg" />
              </section>
              <section className="w-32 mr-2 bg-white text-black flex flex-row border border-gray-500 px-3 ml-2 cursor-pointer rounded">
                <FaFilter className="text-gray-400 mt-3 text-lg" />
                <p className="text-gray-400 text-lg ml-2 mt-2">Today</p>
                <FaArrowDown className="text-gray-400 mt-3 ml-4 text-lg" />
              </section>
            </section>
          </section>


          <section className="">
            <section
              className="w-28 mr-2 bg-white text-black flex flex-row border border-gray-500 py-2 px-3 ml-2 cursor-pointer rounded"
              onClick={handleSortBoxClick}>
              <img src="../Assets/Icons/share.svg" className="" alt="" />
              <p className="text-gray-400 text-lg ml-2">Share</p>
            </section>
            <Modal isOpen={modalOpen} onClose={closeModal} />
          </section>
        </section>
      </section>
    </>
  )
}

export default Sorting