// components/Popup.js
import { useState, useEffect } from 'react';
import { IMAGES_SUBDOMAIN } from '@/config';
import { Rubik } from '@next/font/google';
import { FaTelegram } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { ImCross } from "react-icons/im";
const roboto = Rubik({ subsets: ['latin'], weight: '700' });
const roboto2 = Rubik({ subsets: ['latin'], weight: '500' });

export default function Popup() {


    const POPUP_KEY = 'popupLastShown';
    const EXPIRY_TIME = 6 * 60 * 60 * 1000;

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const lastShown = localStorage.getItem(POPUP_KEY);
        const now = Date.now();
        if (!lastShown || now - Number(lastShown) > EXPIRY_TIME) {
            const timer = setTimeout(() => { setIsVisible(true); }, 4500);
            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem(POPUP_KEY, Date.now());
    };

    if (!isVisible) return null;


    return (
        <div className="fixed inset-0 flex items-center justify-center text-white bg-black bg-opacity-90 z-50">
            <div className="bg-[#0e0e0e] p-4 rounded-md shadow-md m-4 border-4 border-[#8a8888]">


                <div className="flex justify-between gap-10 items-center mb-4">
                    <div>  <h2 className={`${roboto.className} text-lg font-bold`}></h2></div>
                    <div> <button onClick={handleClose} className="text-white hover:text-black"><ImCross /></button></div>
                </div>


                <div className='flex justify-center'><img src={`${IMAGES_SUBDOMAIN}/public/logo.webp`} height={100} width={100} className="rounded-full" alt="" /></div>


                <p className={`${roboto2.className} max-w-[300px] mx-auto my-3 text-center`}>Join our Telegram and Discord channels to stay updated</p>


                <div className='flex justify-center gap-5 items-center mt-5 mb-5'>
                    <div>
                        <a href="https://telegram.me/manga_chimp_toons" className="flex gap-1 items-center bg-blue-600 text-white rounded-md px-2 py-1">
                            <span><FaTelegram /></span>
                            <span className={`${roboto.className} text-[16px] tracking-wider`}>Telegram</span>
                        </a>
                    </div>

                    <div>
                        <a href="https://discord.gg/zK7s4FSxrJ" className="flex gap-1 items-center bg-indigo-500 text-white rounded-md px-2 py-1">
                            <span><FaDiscord /></span>
                            <span className={`${roboto.className} text-[16px] tracking-wider`}>Discord</span>
                        </a>
                    </div>
                </div>



            </div>
        </div>
    );
}
