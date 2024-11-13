import { SearchAllMangas } from "@/actions/search";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DOMAIN, APP_NAME, IMAGES_SUBDOMAIN } from "@/config";
import { Rubik } from '@next/font/google';
import Head from "next/head";

const roboto = Rubik({ subsets: ['latin'], weight: '800' });

const SearchedPage = () => {
    const [mangas, setMangas] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { manganame } = router.query;

    function fetchMangas() {
        setLoading(true);
        SearchAllMangas(manganame).then((data) => {
            setMangas(data?.mangas);
            setLoading(false);
        });
    }

    useEffect(() => { if (manganame) { fetchMangas(); } }, [manganame]);


    const head = () => {
        <Head>
            <meta name="robots" content="noindex" />
        </Head>
    }



    return (
        <>
            {head()}
            <Navbar />

            <h1 className={`${roboto.className} text-2xl text-center text-white font-bold tracking-wider mt-5 mb-8`}>
                Search Results for <span className="text-blue-400 text-3xl px-3 underline">{manganame}</span>
            </h1>

            <div className="max-w-[1300px] mx-auto px-2 sm:px-6 lg:px-8 py-4 text-white">
                <div className="flex sm:gap-12 gap-3 flex-wrap justify-center">
                    {loading ? (
                        <div className="flex justify-center items-center w-full text-center">
                            <p>Loading...</p>
                        </div>
                    ) : (
                        mangas && mangas.length > 0 ? (
                            mangas.map((manga, index) => (
                                <Link prefetch={false} key={index} href={`${DOMAIN}/manga/${manga?.slug}`} className="bg-[#091e25] overflow-hidden shadow rounded-b sm:w-[190px] w-[45%] flex flex-col hover:scale-110 transition-transform">
                                    <img className='sm:w-[190px] sm:h-[220px] w-full object-cover h-[200px]' src={`${IMAGES_SUBDOMAIN}/${manga?.slug}/cover-image/1.webp`} alt={manga?.name} />
                                    <div className="px-4 py-5">
                                        <p className="sm:text-[12px] text-[9px] pb-1.5 font-bold">{`Total Chapters: ${manga?.totalChapters ?? 0}`}</p>
                                        <p className="sm:text-[14px] text-[11px] font-bold sm:w-[185px]">
                                            {manga?.name}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="flex justify-center items-center w-full text-center text-gray-400">
                                <p>No manga found.</p>
                            </div>
                        )
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SearchedPage;