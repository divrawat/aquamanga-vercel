
export async function getServerSideProps({ res }) {
    try {
        const data = await getLatestMangaChapters();
        // const metatags = await getAllMetaTags();

        res.setHeader('Cache-Control', 'public, s-maxage=10800, stale-while-revalidate=59');
        if (data.error) { return { props: { errorCode: 404 } }; }
        return {
            props: {
                latestmangachapters: data,
                // metatags: metatags?.data
            },
        };

    } catch (error) {
        console.error(error);
        return { props: { errorCode: 500 } };
    }
}

import { Rubik } from '@next/font/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLatestMangaChapters } from '@/actions/chapter';
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { DOMAIN, APP_NAME, IMAGES_SUBDOMAIN } from "@/config";
const roboto = Rubik({ subsets: ['latin'], weight: '800', });
const roboto3 = Rubik({ subsets: ['latin'], weight: '600', });
import Head from 'next/head';
// import React from 'react';
// import parse from 'html-react-parser';
// import { getAllMetaTags } from '@/actions/metatags';
export const runtime = 'experimental-edge';

export default function Home({ latestmangachapters }) {


    const DESCRIPTION = `Newly added chapters of all mangas, manhwas, manhuas, webtoons, and comics. Read and enjoy the latest chapters of your favorite manga series.`;

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${DOMAIN}/#organization`,
                "name": `${APP_NAME}`,
                "url": `${DOMAIN}`,
                "sameAs": [
                    "https://www.facebook.com/divyanshu.rawat.5055/",
                    "https://www.instagram.com/divrawat2001",
                    "https://www.linkedin.com/in/divrawat2001/",
                    "https://www.youtube.com/channel/UC6cpVPKJuqqxhFHdfg_37rZ5gw",
                    "https://x.com/divrawat2001"
                ],
                "logo": {
                    "@type": "ImageObject",
                    "@id": `${DOMAIN}/#logo`,
                    "inLanguage": "en-US",
                    "url": "",
                    "caption": `${APP_NAME}`
                },
                "image": {
                    "@id": `${DOMAIN}/#logo`
                }
            },
            {
                "@type": "WebSite",
                "@id": `${DOMAIN}/#website`,
                "url": `${DOMAIN}`,
                "name": `${APP_NAME}`,
                "description": "",
                "publisher": { "@id": `${DOMAIN}/#organization` },
                "inLanguage": "en-US"
            },
            {
                "@type": "CollectionPage",
                "@id": `${DOMAIN}/new-chapters/#webpage`,
                "url": `${DOMAIN}/new-chapters`,
                "name": `New Chapters`,
                "isPartOf": { "@id": `${DOMAIN}/#website` },
                "description": `${DESCRIPTION}`,
                "breadcrumb": { "@id": `${DOMAIN}/new-chapters/#breadcrumb` },
                "inLanguage": "en-US",
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${DOMAIN}/new-chapters/#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "item": {
                            "@type": "WebPage",
                            "@id": `${DOMAIN}`,
                            "url": `${DOMAIN}`,
                            "name": "Home"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "item": {
                            "@type": "WebPage",
                            "@id": `${DOMAIN}/new-chapters`,
                            "url": `${DOMAIN}/new-chapters`,
                            "name": "New Chapters"
                        }
                    }
                ]
            }
        ]
    };

    /*
    const parseMetaTags = (htmlString) => {
        if (!htmlString) return null;
        return parse(htmlString);
    };
    */

    const head = () => (
        <Head>
            <title>{`New Chapters`}</title>
            <meta name="description" content={DESCRIPTION} />
            <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            {/* {metatags?.map((metaTag, index) => (
                <React.Fragment key={index}>
                    {parseMetaTags(metaTag?.content)}
                </React.Fragment>
            ))} */}
            <meta name="googlebot" content="noarchive" />
            <meta name="robots" content="noarchive" />
            <link rel="canonical" href={`${DOMAIN}/new-chapters`} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={` New Chapters`} />
            <meta property="og:description" content={DESCRIPTION} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/new-chapters`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image:type" content="image/webp" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        </Head >
    );


    return (
        <>
            {head()}
            <Navbar />
            <br />

            <main>
                <article>

                    <h2 className={`${roboto.className} my-2 pb-6 font-bold text-2xl tracking-wider text-white text-center px-3`}>New Chapters</h2>


                    <div className='flex text-[13px] flex-wrap justify-center items-center gap-2 mb-10 text-blue-300'>

                        <div className='flex items-center gap-2'>
                            <div><FaHome /></div>
                            <div><Link prefetch={false} href={`${DOMAIN}`}>Home</Link></div>
                        </div>

                        <div>{`->`}</div>

                        <div><Link prefetch={false} href={`${DOMAIN}/new-chapters`}>New Chapters</Link></div>
                    </div>



                    <div className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8 py-4 text-white">
                        <div className="flex sm:gap-12 gap-3 flex-wrap justify-center">
                            {latestmangachapters?.map((manga, index) => (
                                <div key={index} className="bg-[black] border border-[#272626] overflow-hidden shadow rounded-b sm:w-[210px] w-[45%] flex flex-col">
                                    <Link href={`${DOMAIN}/manga/${manga?.slug}`}> <img className='sm:w-[210px] sm:h-[250px] object-cover w-full h-[200px]' src={`${IMAGES_SUBDOMAIN}/${manga?.slug}/cover-image/1.webp`} alt={manga?.manganame} /></Link>
                                    <div className="px-3 py-5">
                                        <Link prefetch={false} href={`${DOMAIN}/manga/${manga?.slug}`}>
                                            <p className={`${roboto3.className} h-[70px] text-center flex justify-center items-center sm:text-[15px] text-[12px] font-bold sm:w-[190px] pb-3`}>{manga?.mangaName}</p>
                                        </Link>

                                        <Link prefetch={false} href={`${DOMAIN}/manga/${manga?.slug}/chapter-${manga?.latestChapterNumber}`}>
                                            <div className='flex justify-between items-center bg-[black] border border-[#353535] sm:px-3 px-1 py-2 rounded-md hover:bg-[#0f0f0f]'>
                                                <div><p className="sm:text-[12px] text-[8px] font-semibold rounded  break-words text-wrap">{`Chapter ${manga?.latestChapterNumber ?? 0}`}</p></div>
                                                <div><p className='sm:text-[9px] text-[7px]'>{`${manga?.latestChapterDate ?? 0}`}</p></div>
                                            </div>
                                        </Link>


                                        <Link prefetch={false} href={`${DOMAIN}/manga/${manga?.slug}/chapter-${manga?.secondlatestChapterNumber}`}>
                                            <div className='flex justify-between items-center bg-[black] border border-[#353535] sm:px-3 px-1 py-2 rounded-md mt-3 hover:bg-[#0f0f0f] '>
                                                <div><p className="sm:text-[12px] text-[8px] font-semibold rounded  break-words text-wrap">{`Chapter ${manga?.secondlatestChapterNumber ?? 0}`}</p></div>
                                                <div><p className='sm:text-[9px] text-[7px]'>{`${manga?.secondlatestChapterDate ?? 0}`}</p></div>
                                            </div>
                                        </Link>


                                    </div>
                                </div>
                            )).slice(0, 50)}
                        </div>
                    </div>

                </article>

            </main>
            <br />
            <Footer />
        </>
    );
}