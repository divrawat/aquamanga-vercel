'use client'
import { CgProfile, CgMenuLeft } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { useRef, useState, useEffect, useMemo } from 'react';
import { PiSquaresFourFill } from "react-icons/pi";
import { usePathname } from 'next/navigation';
import { FaPlus } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { GoFileDirectoryFill } from "react-icons/go";
import { MdCategory } from "react-icons/md";
import { isAuth, getCookie, signout } from "@/actions/auth";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { FaPhoneSquare } from "react-icons/fa";

const token = getCookie('token');

const AdminDashboard = ({ children }) => {

    const [admin, setAdmin] = useState({});

    const router = useRouter();

    function sighnoutuser() { signout(() => router.push(`/divyanshu-admin`)) }




    const menuRef = useRef(null);
    const pathname = usePathname();


    const [activeItem, setActiveItem] = useState([]);

    const fetchData = async () => {

        if (!isAuth()) { router.push('/divyanshu-admin'); }
    }

    useEffect(() => { fetchData(); }, [])


    const toggle = (ref) => {
        if (ref.current.style.display === 'block') { ref.current.style.display = 'none'; }
        else { ref.current.style.display = 'block'; }
    };

    const toggleSubItems = (index) => {
        if (activeItem.includes(index)) {
            setActiveItem(activeItem.filter(item => item !== index));
        } else {
            setActiveItem([...activeItem, index]);
        }
    };


    const memoizedLinks = useMemo(() => [
        { pathname: '/admin', icon: <PiSquaresFourFill size={20} />, text: 'Dashboard', hasSubItems: false },
        { pathname: '/admin/category', icon: <MdCategory size={20} />, text: 'Categories', hasSubItems: false },

        {
            pathname: '', icon: <GoFileDirectoryFill size={20} />, text: 'Manga', arrow: <MdKeyboardArrowDown size={20} />,
            subItems: [
                { pathname: '/admin/manga/add-manga', icon: <FaPlus size={20} />, text: 'Add Mangas' },
                { pathname: '/admin/manga/allmangas', icon: <MdEditSquare size={20} />, text: 'All Mangas' },
            ], hasSubItems: true
        },

        {
            pathname: '', icon: <GoFileDirectoryFill size={20} />, text: 'Chapters', arrow: <MdKeyboardArrowDown size={20} />,
            subItems: [
                { pathname: '/admin/chapters/add-chapters', icon: <FaPlus size={20} />, text: 'Add Chapters' },
                { pathname: '/admin/chapters/bulk-addchapters', icon: <MdEditSquare size={20} />, text: 'Bulk Add Chapters' },
                { pathname: '/admin/chapters/allchapters', icon: <MdEditSquare size={20} />, text: 'All Chapters' },
                { pathname: '/admin/chapters/bulk-delete-chapters', icon: <MdEditSquare size={20} />, text: 'Bulk Delete Chapters' },
            ], hasSubItems: true
        },
        { pathname: '/admin/contact', icon: <FaPhoneSquare size={20} />, text: 'Contacts', hasSubItems: false },
        { pathname: '/admin/head-tags', icon: <MdCategory size={20} />, text: 'Head Tags', hasSubItems: false },

    ], []);


    useEffect(() => {
        memoizedLinks.forEach((link, index) => {
            if (link.subItems) {
                link.subItems.map((subItem) => {
                    if (pathname === subItem.pathname) {
                        setActiveItem([...activeItem, index]);
                    }
                });
            }
        });
    }, [pathname]);


    return (

        <>

            <div className="flex h-screen bg-[#07080d]">

                <div ref={menuRef} className="lg:w-[260px] pt-5 md:pt-0 h-[100vh] bg-[#121621] text-[white] hidden lg:block w-[100vw] absolute lg:mt-0 lg:fixed mt-[70px] overflow-y-auto">

                    <div className="flex gap-4 items-center md:pr-10 md:pt-3 pl-4">
                        <div><CgProfile size={60} /></div>
                        <div>
                            <div className="text-[14px] font-semibold">{isAuth()?.name}</div>
                            <div className="text-center font-semibold text-[13px]">Admin</div>
                        </div>
                    </div>


                    {/* <div className="mt-10 text-[white]">
                        {memoizedLinks.map((link, index) => (
                            <div key={index}>

                                <Link href={link.pathname} onClick={() => toggleSubItems(index)} className={`${pathname === link.pathname ? 'bg-[black] text-[white] font-semibold' : ''} hover:bg-[#161638] hover:font-semibold flex items-center justify-between pl-6 py-2 pb-2 mt-2 cursor-pointer`} >
                                    <div className="flex items-center gap-4">
                                        <div>{link.icon}</div>
                                        <div>{link.text}</div>
                                    </div>
                                    <div className={`pr-6 ${activeItem.includes(index) ? 'transform rotate-180 pl-6' : ''}`}>{link.arrow}</div>
                                </Link>

                                {activeItem.includes(index) && link.subItems && (
                                    <div className="bg-[black] py-2 ">
                                        {link.subItems.map((subItem, subIndex) => (
                                            <Link key={subIndex} href={subItem.pathname} target={subItem.target} className={`${pathname === subItem.pathname ? 'bg-[#161638] text-[white] font-semibold' : ''} hover:bg-[#161638] hover:font-semibold  flex items-center gap-3 pl-[30px] py-2 mb-3 cursor-pointer`}>
                                                <div>{subItem.icon}</div>
                                                <div>{subItem.text}</div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div> */}

                    <div className="mt-10 text-[white]">
                        {memoizedLinks.map((link, index) => (
                            <div key={index}>
                                {link.hasSubItems ? (
                                    <div
                                        onClick={() => toggleSubItems(index)}
                                        className={`${activeItem.includes(index) ? 'bg-[black] text-[white] font-semibold' : ''} hover:bg-[#161638] hover:font-semibold flex items-center justify-between pl-6 py-2 pb-2 mt-2 cursor-pointer`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div>{link.icon}</div>
                                            <div>{link.text}</div>
                                        </div>
                                        <div className={`pr-6 ${activeItem.includes(index) ? 'transform rotate-180 pl-6' : ''}`}>{link.arrow}</div>
                                    </div>
                                ) : (
                                    <Link prefetch={false} href={link.pathname} className={`${pathname === link.pathname ? 'bg-[black] text-[white] font-semibold' : ''} hover:bg-[#161638] hover:font-semibold flex items-center justify-between pl-6 py-2 pb-2 mt-2 cursor-pointer`}>

                                        <div className="flex items-center gap-4">
                                            <div>{link.icon}</div>
                                            <div>{link.text}</div>
                                        </div>

                                    </Link>
                                )}

                                {activeItem.includes(index) && link.subItems && (
                                    <div className="bg-[black] py-2">
                                        {link.subItems.map((subItem, subIndex) => (
                                            <Link prefetch={false} key={subIndex} href={subItem.pathname} className={`${pathname === subItem.pathname ? 'bg-[#161638] text-[white] font-semibold' : ''} hover:bg-[#161638] hover:font-semibold flex items-center gap-3 pl-[30px] py-2 mb-3 cursor-pointer`}>

                                                <div>{subItem.icon}</div>
                                                <div>{subItem.text}</div>

                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>


                </div>


                <div className="w-[100%]  max-h-screen overflow-y-auto text-[#494848]">

                    <div className="lg:ml-[260px]">

                        <div className="flex justify-between items-center pl-4 md:pl-[50px] h-[70px]  bg-[#07080d]">

                            <div className="flex items-center pr-1 text-gray-300 font-bold ">
                                <div className="lg:hidden block pr-4"><CgMenuLeft size={25} onClick={() => toggle(menuRef)} /></div>
                                <div>Admin Dashboard</div>
                            </div>

                            <div className="flex items-center md:mr-[80px] mr-5 gap-3">
                                <div>
                                    <button onClick={() => sighnoutuser()} className=" mr-5 px-3 py-2 bg-[#1c2434] text-sm font-semibold tracking-wide text-white rounded-[8px] hover:scale-105 active:scale-95 transition-transform  hover:text-[yellow] border border-gray-300">Signout</button>
                                </div>
                                {/* <div>DM</div> */}
                            </div>

                        </div>


                        <div className="md:pl-[100px] md:pr-[100px] px-5 pt-[20px] pb-[20px]">
                            {children}
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}


export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false })