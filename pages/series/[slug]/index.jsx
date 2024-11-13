export async function getServerSideProps({ params, res }) {
    try {
        const response = await getmangachaptersRelated(params?.slug);
        if (response?.error) { return { props: { errorcode: true } }; }

        const sortChapters = (chapters) => {
            return chapters?.sort((a, b) => {
                const parseChapter = (chapter) => {
                    const match = chapter.chapterNumber.match(/(\d+)([a-z]*)/i);
                    return [parseInt(match[1]), match[2] || ''];
                };
                const [numA, suffixA] = parseChapter(a);
                const [numB, suffixB] = parseChapter(b);
                return numA !== numB ? numA - numB : suffixA.localeCompare(suffixB);
            });
        };

        const sortedChapters = sortChapters(response?.data);
        const reversedChapters = sortedChapters.reverse();
        res.setHeader('Cache-Control', 'public, s-maxage=10800, stale-while-revalidate=59');
        return { props: { manga: response, chapterArray: reversedChapters } };

    } catch (error) {
        console.error('Error fetching manga data:', error);
        return { props: { errorcode: true } };
    }
}




import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { getmangachaptersRelated } from '@/actions/manga';
import { DOMAIN, APP_NAME, NOT_FOUND_IMAGE, APP_LOGO, IMAGES_SUBDOMAIN } from '@/config';
import { FaHome } from "react-icons/fa";
import { Rubik } from '@next/font/google';
import { AiFillChrome } from "react-icons/ai";
const roboto = Rubik({ subsets: ['latin'], weight: '800' });
const roboto2 = Rubik({ subsets: ['latin'], weight: '600', });
const roboto3 = Rubik({ subsets: ['latin'], weight: '300', });
import dynamic from 'next/dynamic';
// const DisqusComments = dynamic(() => import('@/components/DisQus'), { ssr: false });
// const MyDynamicComp = dynamic(() => import('@/components/MyDynamicComp'), { ssr: false });

// import React from 'react';
// import parse from 'html-react-parser';
// import { getAllMetaTags } from '@/actions/metatags';

export const runtime = 'experimental-edge';


const MangaPage = ({ errorcode, manga, chapterArray }) => {

    const mangaurl = manga?.manga?.slug;

    if (errorcode) {
        const head = () => (
            <Head>
                <title>{`404 Page Not Found: ${APP_NAME}`}</title>
            </Head >
        );
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

    const categoryNames = manga?.manga?.categories.map(category => category.name).join(', ');

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["Person", "Organization"],
                "@id": `${DOMAIN}/#person`,
                "name": `${APP_NAME}`,
                "sameAs": ["https://x.com/divrawat2001"],
                "logo": {
                    "@type": "ImageObject",
                    "@id": `${DOMAIN}/#logo`,
                    "url": `${APP_LOGO}`,
                    "contentUrl": `${APP_LOGO}`,
                    "caption": `${APP_NAME}`,
                    "inLanguage": "en-US",
                    "width": "80",
                    "height": "80"
                },
                "image": {
                    "@type": "ImageObject",
                    "@id": `${DOMAIN}/#logo`,
                    "url": `${APP_LOGO}`,
                    "contentUrl": `${APP_LOGO}`,
                    "caption": `${APP_NAME}`,
                    "inLanguage": "en-US",
                    "width": "80",
                    "height": "80"
                }
            },
            {
                "@type": "WebSite",
                "@id": `${DOMAIN}/#website`,
                "url": `${DOMAIN}`,
                "name": `${APP_NAME}`,
                "publisher": {
                    "@id": `${DOMAIN}/#person`
                },
                "inLanguage": "en-US"
            },
            {
                // {`${IMAGES_SUBDOMAIN}/${manga?.slug}/cover-image/1.webp`}
                "@type": "ImageObject",
                "@id": `${IMAGES_SUBDOMAIN}/${manga?.manga?.slug}/cover-image/1.webp`,
                "url": `${IMAGES_SUBDOMAIN}/${manga?.manga?.slug}/cover-image/1.webp`,
                "width": "1280",
                "height": "1830",
                "inLanguage": "en-US"
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${DOMAIN}/series/${mangaurl}/#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "item": {
                            "@id": `${DOMAIN}`,
                            "name": "Home"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "item": {
                            "@id": `${DOMAIN}/${mangaurl}`,
                            "name": `${manga?.manga?.name}`
                        }
                    },
                ]
            },
            {
                "@type": "WebPage",
                "@id": `${DOMAIN}/series/${mangaurl}/#webpage`,
                "url": `${DOMAIN}/series/${mangaurl}/#webpage`,
                "name": `${manga?.manga?.name} ${manga?.manga?.type}`,
                "datePublished": `${manga?.manga?.createdAt}`,
                "dateModified": `${manga?.manga?.createdAt}`,
                "isPartOf": {
                    "@id": `${DOMAIN}/#website`
                },
                "primaryImageOfPage": {
                    "@id": `${IMAGES_SUBDOMAIN}/${manga?.manga?.slug}/cover-image/1.webp`
                },
                "inLanguage": "en-US",
                "breadcrumb": {
                    "@id": `${DOMAIN}/series/${mangaurl}/#breadcrumb`
                }
            },
            {
                "@type": "Article",
                "headline": `${manga?.manga?.name} ${manga?.manga?.type}`,
                "datePublished": `${manga?.manga?.createdAt}`,
                "dateModified": `${manga?.manga?.createdAt}`,
                "articleSection": categoryNames,
                "author": {
                    "@id": `${DOMAIN}/series/${mangaurl}/#author`
                },
                "publisher": {
                    "@id": `${DOMAIN}/#person`
                },
                "description": `${manga?.manga?.description}`,
                "name": `${manga?.manga?.name} ${manga?.manga?.type}`,
                "@id": `${DOMAIN}/series/${mangaurl}/#richSnippet`,
                "isPartOf": {
                    "@id": `${DOMAIN}/${mangaurl}/#webpage`
                },
                "image": {
                    "@id": `${IMAGES_SUBDOMAIN}/${manga?.manga?.slug}/cover-image/1.webp`
                },
                "inLanguage": "en-US",
                "mainEntityOfPage": {
                    "@id": `${DOMAIN}/series/${mangaurl}/#webpage`
                }
            }
        ]
    }

    const DESCRIPTION = `Read ${manga?.manga?.name} ${manga?.manga?.type} online. ${manga?.manga?.description}`;


    const head = () => (
        <Head>
            <title>{`${manga?.manga?.name}`}</title>
            <meta name="description" content={DESCRIPTION} />
            <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta name="googlebot" content="noarchive" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="article" />
            <link rel="canonical" href={`${DOMAIN}/series/${mangaurl}`} />
            <meta property="og:title" content={`${manga?.manga?.name}`} />
            <meta property="og:description" content={DESCRIPTION} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/series/${mangaurl}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${IMAGES_SUBDOMAIN}/${manga?.manga?.slug}/cover-image/1.webp`} />
            <meta property="og:image:secure_url" content={`${IMAGES_SUBDOMAIN}/${manga?.manga?.slug}/cover-image/1.webp`} />
            <meta property="og:image:type" content="image/webp" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        </Head >
    );


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
            <Navbar />


            <main>
                <article>


                    <div className='max-w-[1100px] mx-auto md:flex md:gap-[80px] mt-8 text-white justify-center  bg-black border border-[#1e1e1e]'>

                        <div className='md:w-[400px] md:pt-0 pt-6'>
                            <img className='md:w-[300px] sm:w-[250px] w-[200px] md:mx-0 mx-auto' src={`${IMAGES_SUBDOMAIN}/${manga?.manga?.slug}/cover-image/1.webp`} alt={`${manga?.manga?.name} Cover`} />
                        </div>

                        <div className='md:w-[700px] md:pr-5 md:p-0 p-4'>
                            <h1 className={`${roboto.className} tracking-wider text-center font-bold text-2xl pt-6 pb-5 `}>{`${manga?.manga?.fullname} ${manga?.manga?.type}`}</h1>
                            <p className={`${roboto3.className} my-4 leading-[2] text-[15px] px-2 text-center `}>{manga?.manga?.description}</p>

                            {/* <div className="flex flex-wrap justify-center mt-5 gap-5 sm:px-4 px-2">
                                {manga?.manga?.categories?.map((category, index) => (
                                    <Link prefetch={false} href={`${DOMAIN}/categories/${category?.slug}?page=1`} key={index}
                                        className={`${roboto2.className} tracking-wider text-white sm:text-[13px] text-[12px] bg-[black] border border-[#2f2e2e] hover:bg-[#2c2b2b] font-bold py-1.5 sm:px-3 px-2 rounded hover:scale-110 active:scale-95 transition-transform`}>
                                        {category?.name}
                                    </Link>
                                ))}
                            </div> */}

                            <div className="flex justify-center items-center  pb-8 md:gap-16 gap-6 flex-wrap mt-14">
                                <div className="text-center">
                                    <p className={`${roboto2.className} font-bold sm:text-[18px] text-[14px] mb-2`}>Released</p>
                                    <p className={`${roboto2.className} sm:text-[16px] text-[13px]`}>{manga?.manga?.releaseDate}</p>
                                </div>

                                <div className="text-center">
                                    <p className={`${roboto2.className} font-bold sm:text-[18px] text-[14px] mb-2`}>Author</p>
                                    <p className={`${roboto2.className} sm:text-[16px] text-[13px]`}>{manga?.manga?.author}</p>
                                </div>

                                <div className="text-center">
                                    <p className={`${roboto2.className} font-bold sm:text-[18px] text-[14px] mb-2`}>Type</p>
                                    <p className={`${roboto2.className} sm:text-[16px] text-[13px]`}>{manga?.manga?.type}</p>
                                </div>
                            </div>


                        </div>




                    </div>


                    <div className={`${roboto.className} text-2xl px-2 font-bold tracking-wider text-center md:mt-[100px] mt-10 mb-5 text-white`}>{`Read ${manga?.manga?.name} ${manga?.manga?.type} Chapters`}</div>

                    <div className='flex justify-center text-[13px] px-4 flex-wrap items-center gap-3 mb-10 text-blue-300'>

                        <div className='flex items-center gap-2'>
                            {/* <div><FaHome /></div> */}
                            <div><Link prefetch={false} href={`${DOMAIN}`}>Home</Link></div>
                        </div>

                        <div>{`->`}</div>

                        <div className='flex items-center gap-2'>
                            {/* <div><AiFillChrome /></div> */}
                            <div><Link prefetch={false} href={`${DOMAIN}/series/${mangaurl}`}>{`${manga?.manga?.name}`}</Link></div>
                        </div>

                    </div>


                    <div className='mx-6'>
                        <div className={`${roboto3.className} mt-10 py-3 bg-black border border-[#323232] rounded max-w-[900px] mb-10 mx-auto px-3 flex flex-wrap justify-center max-h-[400px] overflow-y-scroll sm:gap-5 gap-3`}>

                            {chapterArray?.map((chapternumber, index) => (
                                <div className="flex hover:scale-105 active:scale-95 transition-transform my-1" key={index}>
                                    <Link prefetch={false} href={`${DOMAIN}/series/${mangaurl}/chapter-${chapternumber?.chapterNumber}`} className="sm:p-5 p-2  hover:underline text-white bg-black hover:bg-[#2c2b2b] border border-[#292828] rounded sm:w-[180px] w-[100px]">
                                        <p className="sm:text-[14px] text-[12px] tracking-wider font-semibold">{`Chapter  ${chapternumber?.chapterNumber}`}</p>
                                        {/* <MyDynamicComp> */}
                                        <p className="sm:text-[11px] text-[10px] font-normal pt-1.5">{formatCreatedAt(chapternumber?.createdAt)}</p>
                                        {/* </MyDynamicComp> */}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* <h2 className='md:text-4xl text-2xl font-bold text-center text-[white] font-blod px-4 mb-10 md:mt-[100px] mt-8'>Comment Section</h2>
                    <div className='py-10 max-w-[1100px] mx-auto bg-[black] border border-[#1d1c1c] rounded-md'>

                        <section className=' mx-auto px-5 '>
                            <DisqusComments url={`/series/${mangaurl}`} identifier={mangaurl} title={`${manga?.manga?.name} ${manga?.manga?.type}`} />
                        </section>
                    </div> */}


                    {/* <div className="max-w-[1200px] mx-auto mt-10 px-3">
                        <h2 className={`${roboto.className} text-center text-3xl font-bold pb-10 text-white`}>Related</h2>
                        <div className="flex justify-center sm:gap-10 gap-3 flex-wrap pb-10">
                            {manga?.relatedMangas?.map((manga, index) => (
                                <div className="bg-[black] hover:scale-110 transition-transform rounded shadow sm:w-[190px] w-[45%] text-white" key={index}>
                                    <Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}`}>
                                        <img src={`${IMAGES_SUBDOMAIN}/${manga?.slug}/cover-image/1.webp`} alt={`${manga?.name} Cover`} className="mb-2 sm:h-[200px] sm:w-[190px] h-[200px] w-full object-cover" />
                                        <div className='p-3'>
                                            <p className="sm:text-[11px] text-[10px] my-1 py-1  font-semibold">{`Total Chapters:  ${manga?.totalChapters ?? 0}`}</p>
                                            <p className={`${roboto2.className} sm:text-[14px] text-[10px] font-semibold mb-1 text-wrap break-words`}>{manga?.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div> */}




                </article >
            </main>
            <Footer />
        </>
    );
}


export default MangaPage;