import Link from "next/link";
import { DOMAIN, NavbarName } from "@/config";
import { FooterLinks } from "@/config";
import { Rubik } from '@next/font/google';
const roboto = Rubik({
    subsets: ['latin'],
    weight: '800',
});


export default function Footer() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();

    return (

        <footer className=" text-white mt-[50px]">
            <div className="py-2 max-w-[1100px] mx-auto">
                <div className="container mx-auto md:flex flex-wrap justify-between items-center">
                    <div className="md:flex items-center text-center">
                        <p className={`${roboto.className} text-[16px] font-bold p-3 uppercase`}>
                            <Link prefetch={false} href={`${DOMAIN}`}>{`© ${currentYear} @ ${NavbarName}`}</Link>
                        </p>
                    </div>
                    <ul className="md:flex md:space-x-7 text-center leading-[2.5] p-3 font-bold">
                        {FooterLinks.map((link, index) => (
                            <li key={index}>
                                <Link prefetch={false} href={link.href} className={`${roboto.className} text-[14px] hover:text-[#a5a5f3] tracking-wider hover:underline uppercase`}>
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </footer>
    );
}
