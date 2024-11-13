export async function getServerSideProps({ params, res }) {
    try {
        const response = await getParticularMangachapterwithRelated(params.slug, params.chapter);
        // const metatags = await getAllMetaTags();
        if (response?.error) {
            return { props: { errorcode: true } };
        }

        const sortChapters = (chapterNumbers) => {
            return chapterNumbers?.sort((a, b) => {
                const parseChapter = (chapter) => {
                    const match = chapter.match(/(\d+)([a-z]*)/i);
                    return [parseInt(match[1]), match[2] || ''];
                };
                const [numA, suffixA] = parseChapter(a);
                const [numB, suffixB] = parseChapter(b);
                return numA !== numB ? numA - numB : suffixA.localeCompare(suffixB);
            });
        };

        const chapterNumbers = response?.allchapterNumbers?.map(chapter => chapter.chapterNumber) || [];
        const sortedChapterNumbers = sortChapters(chapterNumbers);

        // Set caching headers
        res.setHeader('Cache-Control', 'public, s-maxage=10800, stale-while-revalidate=59');

        return {
            props: {
                manga: response?.manga,
                chapterData: response?.chapterData,
                // relatedMangas: response?.relatedMangas,
                chapterArray: sortedChapterNumbers,
                // metatags: metatags?.data
            }
        };
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return { props: { errorcode: true } };
    }
}









import { getParticularMangachapterwithRelated } from "@/actions/chapter";
import Head from "next/head";
import Link from "next/link";
import { APP_NAME, DOMAIN, IMAGES_SUBDOMAIN, NOT_FOUND_IMAGE, APP_LOGO, DOMAIN_NAME } from "@/config";
// import { getAllMetaTags } from '@/actions/metatags';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Rubik } from '@next/font/google';
import { FaHome } from "react-icons/fa";
import { GiBlackBook } from "react-icons/gi";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { AiFillChrome } from "react-icons/ai";



import { FaTelegram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaRedditAlien } from "react-icons/fa";


const roboto = Rubik({ subsets: ['latin'], weight: '800', });
const roboto2 = Rubik({ subsets: ['latin'], weight: '500', });
// import React from 'react';
// import parse from 'html-react-parser';
// import dynamic from 'next/dynamic';
// const DisqusComments = dynamic(() => import('@/components/DisQus'), { ssr: false });
export const runtime = 'experimental-edge';



export default function Chapter({ errorcode, manga, chapterArray, chapterData }) {

    if (errorcode) {
        const head = () => (<Head> <title>{`404 Page Not Found: ${APP_NAME}`}</title> </Head>);
        return (
            <>
                {head()}
                <Navbar />
                <div className="text-center text-white">
                    <h1 className="text-3xl font-bold mt-5 mb-8">404 Page Not Found</h1>
                    <div className="flex justify-center items-center px-5">
                        <img height={350} width={350} src={`${NOT_FOUND_IMAGE}`} className="rounded-full" />
                    </div>
                </div>
                <Footer />
            </>
        );
    }



    // const [chaptersArray, setChaptersArray] = useState([]);
    // useEffect(() => { setChaptersArray(chapterArray); }, [manga?.slug]);

    const router = useRouter();
    const DESCRIPTION = `Read ${manga?.name} chapter ${chapterData?.chapterNumber} online. ${manga?.description}`;



    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${manga?.name}`,
        "description": `${manga?.description}`,
        "author": {
            "@type": "Person",
            "name": `${manga?.author}`
        },
        "publisher": {
            "@type": "Organization",
            "name": `${manga?.name}`,
            "logo": {
                "@type": "ImageObject",
                "url": `${APP_LOGO}`
            }
        },
        "datePublished": `${manga?.createdAt}`,
        "dateModified": `${manga?.createdAt}`,
        "image": `${IMAGES_SUBDOMAIN}/${manga?.slug}/cover-image/1.webp`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${DOMAIN}/series/${manga?.slug}/chapter-${chapterData?.chapterNumber}`
        }
    };


    const head = () => (
        <Head>
            <title>{`${manga?.name} Chapter ${chapterData?.chapterNumber}`}</title>
            <meta name="description" content={DESCRIPTION} />
            <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta name="googlebot" content="noarchive" />
            <link rel="canonical" href={`${DOMAIN}/series/${manga?.slug}/chapter-${chapterData?.chapterNumber}`} />
            <meta property="og:title" content={`${manga?.name} Chapter ${chapterData?.chapterNumber}`} />
            <meta property="og:description" content={DESCRIPTION} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/series/${manga?.slug}/chapter-${chapterData?.chapterNumber}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${IMAGES_SUBDOMAIN}/${manga?.slug}/cover-image/1.webp`} />
            <meta property="og:image:secure_url" content={`${IMAGES_SUBDOMAIN}/${manga?.slug}/cover-image/1.webp`} />
            <meta property="og:image:type" content="image/webp" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        </Head>
    );


    let currentIndexAfterSorting = chapterArray?.findIndex(ch => ch === chapterData?.chapterNumber);
    let prevChapter = currentIndexAfterSorting > 0 ? chapterArray[currentIndexAfterSorting - 1] : null;
    let nextChapter = currentIndexAfterSorting < chapterArray.length - 1 ? chapterArray[currentIndexAfterSorting + 1] : null;

    const images = [];
    for (let i = 1; i <= chapterData?.numImages; i++) { images.push(`${IMAGES_SUBDOMAIN}/${manga?.slug}/chapter-${chapterData?.chapterNumber}/${i}.webp`); }



    const currentChapterUrl = `${DOMAIN}/series/${manga?.slug}/chapter-${chapterData?.chapterNumber}`;

    const [selectedChapter, setSelectedChapter] = useState(currentChapterUrl);

    useEffect(() => { setSelectedChapter(currentChapterUrl); }, [currentChapterUrl]);

    const handleChange = (event) => {
        setSelectedChapter(event.target.value);
        navigateTo(event);
    };

    const navigateTo = (event) => {
        const selectedChapter = event.target.value;
        if (selectedChapter !== '') {
            router.push(`${selectedChapter}`);
        }
    };


    const TEXT = `Read ${manga?.type.toLowerCase()} <b>${manga?.name} chapter ${chapterData?.chapterNumber}</b> at ${APP_NAME}.`;

    // const postUrl = `${DOMAIN}/series/${manga?.slug}/chapter-${chapterData?.chapterNumber}`;
    // const encodedTitle = manga?.name;
    // const encodedUrl = postUrl;

    // const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`;
    // const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    // const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    // const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
    // const redditUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;

    const [chaptersArray, setChaptersArray] = useState([]);
    useEffect(() => { setChaptersArray(chapterArray); }, [manga?.slug]);


    const formatCreatedAt = (isoDateString) => {
        const date = new Date(isoDateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    };


    return (
        <>
            {head()}
            {/* <Navbar /> */}
            <main>
                <article>
                    <h1 className={`${roboto.className} text-white font-extrabold sm:text-2xl text-2xl text-center px-4 pt-5 mb-3`}>{`${manga?.name} Chapter ${chapterData?.chapterNumber}`}</h1>

                    <div className='flex justify-center flex-wrap items-center gap-2 px-3 text-[13px] mb-6 text-blue-300'>

                        <div className='flex items-center gap-2'>
                            {/* <div><FaHome /></div> */}
                            <div><Link prefetch={false} href={`${DOMAIN}`}>Home</Link></div>
                        </div>

                        <div>{`->`}</div>

                        <div className='flex items-center gap-2'>
                            {/* <div><AiFillChrome /></div> */}
                            <div><Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}`}>{`${manga?.name}`}</Link></div>
                        </div>

                        <div>{`->`}</div>

                        <div className='flex items-center gap-2'>
                            {/* <div><GiBlackBook /></div> */}
                            <div><Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}/chapter-${chapterData?.chapterNumber}`}>{` Chapter ${chapterData?.chapterNumber}`}</Link></div>
                        </div>

                    </div>



                    <div>
                        <p style={{ wordSpacing: "2px" }} className={`${roboto2.className} tracking-wider rounded-md  max-w-[1000px] mx-auto px-3 py-5 mb-2 text-[13.5px] text-white text-center`} dangerouslySetInnerHTML={{ __html: TEXT }} />
                    </div>

                    <div className="text-white text-center text-[11px]">{formatCreatedAt(manga?.createdAt)}</div>



                    <div className='mx-3  px-1 pb-5'>
                        <div className="flex justify-between max-w-[800px] items-center mx-auto md:pb-[50px] mt-5">
                            {prevChapter !== null ? (
                                <Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}/chapter-${prevChapter}`}>
                                    <button className="text-[black] font-bold text-[13px] hover:scale-105 active:scale-95 transition-transform rounded bg-[white] px-2 py-1.5">
                                        <div className='flex items-center gap-2 justify-center'>
                                            <div className='pt-[1.5px]'><FaArrowAltCircleLeft /></div>
                                            <div>Prev</div>
                                        </div>
                                    </button>
                                </Link>
                            ) : (
                                <button className="text-[white] text-[13px] rounded bg-[gray] px-2 py-1.5 font-bold cursor-not-allowed" disabled>
                                    <div className='flex items-center gap-2 justify-center'>
                                        <div className='pt-[1.5px]'><FaArrowAltCircleLeft /></div>
                                        <div>Prev</div>
                                    </div>
                                </button>
                            )}


                            <div className="w-[120px]">
                                <select value={selectedChapter} onChange={handleChange}
                                    className="bg-[white] cursor-pointer border border-gray-300 text-gray-900 text-[13.5px] rounded-lg block w-full p-1.5"
                                >
                                    {chaptersArray?.map((chapter, index) => (
                                        <option className='cursor-pointer' key={index} value={`${DOMAIN}/series/${manga?.slug}/chapter-${chapter}`}
                                        >
                                            {`Chapter ${chapter}`}
                                        </option>
                                    ))}
                                </select>
                            </div>



                            {nextChapter !== null ? (
                                <Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}/chapter-${nextChapter}`}>
                                    <button className="text-[black] text-[13px] hover:scale-105 active:scale-95 transition-transform rounded
                                 bg-[white] px-2 py-1.5 font-bold">
                                        <div className='flex items-center gap-2 justify-center'>
                                            <div>Next</div>
                                            <div className='pt-[1.5px]'><FaArrowAltCircleRight /></div>
                                        </div>
                                    </button>
                                </Link>
                            ) : (
                                <button className="text-[white] text-[13px] rounded bg-[gray] px-2 py-1.5 font-bold cursor-not-allowed" disabled>
                                    <div className='flex items-center gap-2 justify-center'>
                                        <div>Next</div>
                                        <div className='pt-[1.5px]'><FaArrowAltCircleRight /></div>
                                    </div>
                                </button>
                            )}

                        </div>
                    </div>





                    {images?.map((imageSrc, index) => (
                        <div className='allimages' key={index} >
                            <div>
                                <p className={`${roboto.className} font-bold text-[20px] text-white text-center mb-4`}>{`Chapter ${chapterData?.chapterNumber} - Image ${index + 1}`}</p>
                                <img key={index} src={imageSrc} alt={`${manga?.name} Chapter ${chapterData?.chapterNumber} Image ${index + 1}`} />

                            </div>
                        </div>
                    ))}



                    {/* <div className='py-10 bg-gray-900'>
                        <h2 className='text-4xl text-center text-[white] font-blod px-4 mb-10'>Comment Section</h2>
                        <section className='max-w-[1000px] mx-auto px-5'>
                            <DisqusComments url={`/series/${manga?.slug}/chapter-${chapterData?.chapterNumber}`} identifier={`${DOMAIN}/series/${manga?.slug}/chapter-${chapterData?.chapterNumber}`} title={`${manga?.name} Chapter ${chapterData?.chapterNumber}`} />
                        </section>
                    </div> */}


                    {/* <div className="max-w-[1300px] mx-auto mt-10">
                        <h2 className={`${roboto.className} text-center text-white text-3xl font-bold pb-10`}>Related</h2>
                        <div className="flex justify-center sm:gap-10 gap-3 flex-wrap pb-10 px-3">
                            {relatedMangas?.map((manga, index) => (
                                <div className="hover:scale-110 transition-transform text-white rounded shadow sm:w-[200px] w-[45%]" key={index}>
                                    <Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}`}>
                                        <img src={`${IMAGES_SUBDOMAIN}/${manga?.slug}/cover-image/1.webp`} alt={`${manga?.name} Cover`} className="mb-2 sm:h-[230px] sm:w-[200px] w-full h-[200px] object-cover " />
                                        <div className='px-2 py-3'>
                                            <p className="sm:text-[11.5px] text-[9px] mb-1 font-bold">{` Total Chapters:  ${manga?.chapterCount}`}</p>
                                            <p className="sm:text-[13.5px] text-[11px] font-bold mb-1 text-wrap break-words">{manga?.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div> */}


                </article>

            </main>
            <Footer />
        </>
    );

}