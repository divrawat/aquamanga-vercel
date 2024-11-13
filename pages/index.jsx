
export async function getServerSideProps({ res }) {
  try {
    // const page = 1;
    const [data, categories,
      // latestmangas,
      latestmangachapters, getmetatags] = await Promise.all([
        getMangasHomePage(),
        getCategories(),
        // GetLatestMangas(page),
        getLatestMangaChapters(),
        // getAllMetaTags()
      ]);


    if (data.error) { return { props: { errorCode: 404 } }; }
    res.setHeader('Cache-Control', 'public, s-maxage=10800, stale-while-revalidate=59');

    return {
      props: {
        mangas: data?.data || [],
        categories: categories?.categories || [],
        // latestmangas: latestmangas.mangas,
        latestmangachapters: latestmangachapters,
        // metatags: getmetatags?.data || [],
      },
    };
  } catch (error) {
    console.error(error);
    return { props: { errorCode: 500 } };
  }
}











import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Rubik } from '@next/font/google';
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/swiper-bundle.css";

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getMangasHomePage, GetLatestMangas } from "@/actions/manga";
// import { getAllMetaTags } from '@/actions/metatags';
import { getLatestMangaChapters } from '@/actions/chapter';
import { getCategories } from '@/actions/category';
import { FaArrowAltCircleRight } from "react-icons/fa";
import Head from 'next/head';
import Link from "next/link";
import { DOMAIN, APP_NAME, APP_LOGO, IMAGES_SUBDOMAIN } from "@/config";
const roboto = Rubik({ subsets: ['latin'], weight: '800', });
const roboto2 = Rubik({ subsets: ['latin'], weight: '400', });
const roboto3 = Rubik({ subsets: ['latin'], weight: '600', });
register();
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
const MyDynamicComp = dynamic(() => import('@/components/MyDynamicComp'), { ssr: false });


export const runtime = 'experimental-edge';



export default function Home({ mangas, categories, latestmangachapters }) {


  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/search?manganame=${query}`);
  };

  const DESCRIPTION = `Aqua Manga is your ultimate hub for enjoying a wide range of mangas, manhwas, and manhuas. Explore the latest releases, read for free, and enjoy high-quality images.`

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${DOMAIN}/#person`,
        "name": `${APP_NAME}`,
        // "sameAs": ["https://twitter.com/ozulscans"],
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
        "publisher": { "@id": `${DOMAIN}/#person` },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${DOMAIN}/search?manganame={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "CollectionPage",
        "@id": `${DOMAIN}/#webpage`,
        "url": `${DOMAIN}`,
        "name": `${APP_NAME}: Read Mangas, Manhwas, Manhuas`,
        "about": { "@id": `${DOMAIN}/#person` },
        "isPartOf": { "@id": `${DOMAIN}/#website` },
        "inLanguage": "en-US"
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

      <title>{`${APP_NAME}: Read Mangas, Manhwas, Manhuas`}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
      {/* {metatags && metatags?.map((metaTag, index) => (
        <React.Fragment key={index}>
          {parseMetaTags(metaTag?.content)}
        </React.Fragment>
      ))} */}
      <meta name="googlebot" content="noarchive" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={`${DOMAIN}`} />
      <meta property="og:title" content={`${APP_NAME}: Read Mangas, Manhwas, Manhuas`} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image:type" content="image/webp" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </Head >
  );


  return (
    <>
      {head()}
      {/* <div className='fixed z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl  after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl  before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]'></div> */}

      <div className='color'></div>

      <Navbar />
      <br />

      <form className="max-w-md mx-auto px-5" onSubmit={handleSubmit}>
        <label htmlFor='default-search' className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input autoComplete='off' value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a manga ..." type="search" id="default-search" className="bg-gray-900 block w-full p-4 ps-10 text-sm text-white border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
          <button type="submit" className="text-white absolute end-2.5 font-bold bottom-2.5 bg-gray-700 hover:scale-110 transition-transform focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2">Search</button>
        </div>
      </form>




      <h1 className={`${roboto.className}  text-[white] tracking-wider font-extrabold text-2xl px-3 text-center my-10`}>
        {`${APP_NAME}: Read Mangas, Manhwas, Manhuas`}
      </h1>


      {/* <MyDynamicComp>
        <div>
          <Swiper loop={true} centeredSlides={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, Navigation]} className="mySwiper" >

            {mangas?.map((manga, index) => (
              <SwiperSlide key={index}>
                <div className={`${roboto2.className} bg-[black] max-w-[1150px] shadow mx-auto md:h-[420px] rounded-lg overflow-hidden  text-white border border-[#2c2b2b]`}>
                  <div className="md:flex gap-28 justify-center cursor-pointer">
                    <div className="flex justify-center md:block sm:pt-0 pt-3">
                      <Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}`}>
                        <img src={`${IMAGES_SUBDOMAIN}/${manga?.slug}/cover-image/1.webp`} alt={manga?.fullname} className="hover:scale-105 transition-transform sm:h-[420px] h-[300px]" />
                      </Link>
                    </div>

                    <div className="p-4 flex-1">
                      <Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}`}>
                        <h2 className={`${roboto.className} text-2xl font-bold text-center tracking-wider md:text-left`}>{manga?.fullname}</h2>
                      </Link>

                      <p className="text-[15px] mt-5 md:pr-5 text-center md:text-left leading-[1.7]">{`${manga?.description}`}</p>


                      <div className='max-w-[600px] mx-auto md:mx-0'>
                        <div className="flex flex-wrap md:justify-start justify-center gap-4 mt-10 mb-5">
                          {manga?.categories?.map((category, index) => (
                            <Link prefetch={false} key={index} href={`${DOMAIN}/categories/${category?.slug}?page=1`} className="bg-[black] border border-[#2e2e2e] hover:bg-[#2c2b2b] hover:scale-110 transition-transform active:scale-95 text-white px-2 py-1.5 rounded-md inline-block text-sm">
                              {category?.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}`} className="flex justify-center md:block mb-5 mt-7">
                        <div className="bg-[black] border border-[#2e2e2e] hover:bg-[#2c2b2b] text-white px-3 py-2 w-[160px] rounded hover:scale-110 transition-transform active:scale-95 text-[15px]">

                          <div className="flex gap-3 items-center">
                            <div className='font-bold tracking-wider text-[14px]'>Start Reading</div>
                            <div><FaArrowAltCircleRight /></div>
                          </div>
                        </div>
                      </Link>

                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </MyDynamicComp> */}

      <h2 className={`${roboto.className} my-7 font-bold text-2xl tracking-wider text-white text-center px-3`}>Latest Chapters</h2>
      <div className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8 py-4 text-white">
        <div className="flex sm:gap-12 gap-3 flex-wrap justify-center">
          {latestmangachapters?.map((manga, index) => (
            <div key={index} className="bg-[black] overflow-hidden shadow rounded-b sm:w-[210px] w-[45%] flex flex-col border border-[#161616] hover:scale-105 transition-transform">
              <Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}`}>
                <img className='sm:w-[210px] sm:h-[250px] h-[190px] object-cover w-full' src={`${IMAGES_SUBDOMAIN}/${manga?.slug}/cover-image/1.webp`} alt={manga?.mangaName} /></Link>
              <div className="px-3 py-5">
                <Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}`}>
                  <div className={`${roboto3.className} h-[70px] sm:text-[15px] text-[12px] font-bold pb-3 flex items-center justify-center text-center`}>
                    {manga?.mangaName}
                  </div>

                </Link>

                <Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}/chapter-${manga?.latestChapterNumber}`}>
                  <div className='flex justify-between items-center bg-[black] border border-[#353535] sm:px-3 px-1 py-2 rounded-md hover:bg-[#2c2b2b]'>
                    <div><p className="sm:text-[12px] text-[8px] font-semibold rounded  break-words text-wrap">{`Chapter ${manga?.latestChapterNumber ?? 0}`}</p></div>
                    <div><p className='sm:text-[9px] text-[7px]'>{`${manga?.latestChapterDate ?? 0}`}</p></div>
                  </div>
                </Link>


                <Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}/chapter-${manga?.secondlatestChapterNumber}`}>
                  <div className='flex justify-between items-center bg-[black]  border border-[#353535] sm:px-3 px-2 py-2 rounded-md mt-3 hover:bg-[#2c2b2b] '>
                    <div><p className="sm:text-[12px] text-[8px] font-semibold rounded  break-words text-wrap">{`Chapter ${manga?.secondlatestChapterNumber ?? 0}`}</p></div>
                    <div><p className='sm:text-[9px] text-[7px]'>{`${manga?.secondlatestChapterDate ?? 0}`}</p></div>
                  </div>
                </Link>

              </div>
            </div>
          )).slice(0, 3)}
        </div>
      </div>






      {/* <div className={`${roboto.className} text-2xl text-center mb-10 text-white font-bold tracking-wider mt-10`}>All Categories</div> */}


      {/* <div className='max-w-[1200px] mx-auto px-5'>
        <div className='text-white flex gap-10 flex-wrap justify-center items-center'>
          {categories?.map((category, index) => (
            <Link prefetch={false} key={index} href={`${DOMAIN}/categories/${category.slug}?page=1`} className={`${roboto3.className} bg-[black] border border-[#343434] hover:bg-[#2c2b2b] px-4 py-2 font-bold rounded  text-sm hover:scale-110 transition-transform`}>
              {category?.name}
            </Link>
          ))}
        </div>
      </div> */}






      <br />
      <Footer />
    </>
  );
}














{/* <Suspense fallback={<div>Loading...</div>}>

        <div className='max-w-[1200px] mx-auto pt-8 px-2'>

          <div className={`${roboto.className} text-2xl text-center px-3 text-white font-bold tracking-wider my-5`}>Newly Added Mangas</div>
          <Swiper slidesPerView={1} spaceBetween={5} pagination={{ clickable: true }} modules={[Autoplay, Pagination]} className="mySwiper"
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              '@0.00': {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              '@0.75': {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              '@1.00': {
                slidesPerView: 3,
                spaceBetween: 5,
              },
              '@1.50': {
                slidesPerView: 4,
                spaceBetween: 5,
              },
              '@2': {
                slidesPerView: 5,
                spaceBetween: 5,
              },
            }}
          >

            {latestmangas?.map((manga, index) => (
              <SwiperSlide key={index}>
                <div className="hover:scale-110 transition-transform rounded shadow sm:w-[190px] sm:h-[330px] h-[280px] w-[140px]" >
                  <Link prefetch={false} href={`${DOMAIN}/series/${manga?.slug}`}>
                    <img src={`${IMAGES_SUBDOMAIN}/${manga?.slug}/cover-image/1.webp`} alt={`${manga?.name} Cover`} className="mb-2 sm:h-[200px] sm:w-[190px] h-[160px] w-[140px] object-cover" />
                    <div className=' px-2 py-3 text-white'>
                      <p className='sm:text-[12px] font-bold text-[9px] pb-1.5'>{`Total Chapters:  ${manga?.totalChapters ?? 0}`}</p>
                      <p className={`${roboto3.className} font-bold sm:text-[13px] text-[11px] mb-1 text-wrap break-words`}>{manga?.name}</p>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            )).slice(0, 25)}
          </Swiper>
        </div>

      </Suspense> */}