// import React from 'react'
import { FaBars} from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";



export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

     const menuItems = [
    {
      name: 'The Legacy',
      href: '/legacy',
    },
    {
      name: 'Memories',
      href: '/memories',
    },
    {
      name: 'Mugshots',
      href: '/mugshots',
    },
  ];

    const handleToggle = () => {
        setIsOpen(!isOpen);
      };

       const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);



  return (
    <div className='flex flex-col md:flex-row justify-between items-center p-4 font-[Quicksand] bg-[#E8F4F1] backdrop-blur-lg shadow-lg fixed top-0 z-50 text-[15px] opacity-95 w-full'>
        <div className="flex flex-row items-center justify-between w-full">

       <Link to={'/'}>
       <h1 className='text-xl text-[#2C3E50] '>Class of <span className='text-[18px]'>2K</span><span className='text-[#7FB3A7]'>25</span></h1>
       </Link> 
      {
       isOpen ? 
       <RxCross2 className='md:hidden text-[#2C3E50] text-2xl hover:text-[#50C878] cursor-pointer transition duration-100' onClick={handleToggle} /> 
       :   
          <FaBars className='md:hidden text-[#2C3E50] text-2xl hover:text-[#50C878] cursor-pointer transition duration-100' onClick={handleToggle}/>
      } 
        </div>
        <nav className="flex justify-between items-center space-x-4 ">
            <ul className="hidden md:flex space-x-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className="text-[#2C3E50] font-medium text-nowrap no-underline relative group"
                  >
                    {item.name}
                    <span className="absolute left-0 right-0  h-[0.129rem] rounded mt-[21px] bg-[#7FB3A7]  transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-in-out"></span>
                  </Link>
                </li>
              ))}
            </ul>
             {isOpen && (
        <div className="md:hidden">
          {menuItems.map((item, index) => (
            <div key={index}>
              <Link
                to={item.href}
                className="block py-2 px-4 text-sm hover:scale-105 transition duration-300 hover:text-[#50C878]"
              >
               <span className="text-[#2C3E50] font-bold hover:text-[#50C878]">
                 {item.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      )}
          </nav>
        
    </div>
  )
}
