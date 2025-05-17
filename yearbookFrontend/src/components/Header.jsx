// import React from 'react'
import { FaBars} from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';



export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

     const menuItems = [
    {
      name: 'The Legacy',
      href: '#',
    },
    {
      name: 'Memories',
      href: '#',
    },
    {
      name: 'Superlatives',
      href: '#',
    },
    {
      name: 'Chronicles',
      href: '#',
    },
  ];

    const handleToggle = () => {
        setIsOpen(!isOpen);
      };

  return (
    <div className='flex flex-col md:flex-row justify-between items-center p-4 font-[Quicksand] bg-slate-950 backdrop-blur-lg shadow-lg sticky top-0 z-50 text-[15px] opacity-90'>
        <div className="flex flex-row items-center justify-between w-full">

        <h1 className='text-xl text-gray-300'><span className='text-[18px]'>2K</span><span className='text-[#50C878]'>25</span></h1>
      {
       isOpen ? 
       <RxCross2 className='md:hidden text-gray-300 text-2xl hover:text-[#50C878] cursor-pointer transition duration-100' onClick={handleToggle} /> 
       :   
          <FaBars className='md:hidden text-gray-300 text-2xl hover:text-[#50C878] cursor-pointer transition duration-100' onClick={handleToggle}/>
      } 
        </div>
        <nav className="flex justify-between items-center space-x-4 ">
            <ul className="hidden md:flex space-x-4">
              <li>
                <a
                  href=""
                  className="text-white hover:text-gray-300 text-nowrap no-underline relative group"
                >
                  The Legacy
                  <span className="absolute left-0 right-0  h-[0.129rem] rounded mt-[21px] bg-[#50C878]  transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-in-out"></span>
                </a>
              </li>

              <li>
                <a
                  href="#skills"
                  className="text-white  no-underline relative group"
                >
                  Memories 
                  <span className="absolute left-0 right-0  h-[0.129rem] rounded mt-[21px] bg-[#50C878]  transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-in-out"></span>
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-white  no-underline relative group"
                >
                  Superlatives 
                  <span className="absolute left-0 right-0  h-[0.129rem] rounded mt-[21px] bg-[#50C878]  transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-in-out"></span>
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white hover:text-gray-300 no-underline relative group"
                >
                  Chronicles
                  <span className="absolute left-0 right-0  h-[0.129rem] rounded mt-[21px] bg-[#50C878]  transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-in-out"></span>
                </a>
              </li>
            </ul>
             {isOpen && (
        <div className="md:hidden">
          {menuItems.map((item, index) => (
            <div key={index}>
              <a
                href={item.href}
                className="block py-2 px-4 text-sm hover:scale-105 text-gray-300  transition duration-300"
              >
               <span className="text-gray-300 hover:text-[#50C878]">
                 {item.name}
                </span>
              </a>
            </div>
          ))}
        </div>
      )}
          </nav>
        
    </div>
  )
}
