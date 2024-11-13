import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { DOMAIN } from "@/config";
import Head from "next/head";


const Dmca = () => {

    const head = () => (
        <Head>
            <title>DMCA</title>
            <meta name="robots" content="noindex, follow, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta property="og:url" content={`${DOMAIN}/dmca`} />
        </Head >
    );

    return (
        <>
            {head()}
            <Navbar />
            <div className="max-w-[1000px] mx-auto p-5 text-white">
                <h1 className="text-center font-bold text-3xl my-8">DMCA</h1>

                <p className="my-8 leading-[2]">Our website, {DOMAIN}, does not host any content on its servers. Instead, we link to or embed content uploaded to popular image hosting sites like Imgur, Cubeupload, Google Drive, and similar platforms.</p>
                <p className="my-8 leading-[2]">All trademarks, comics, trade names, service marks, copyrighted works, and logos referenced on our site belong to their respective owners or companies. If you have any legal issues, please contact the appropriate media file owners or host sites directly.</p>
                <p className="my-8 leading-[2]">This privacy policy aims to inform you about the types of information we collect when you visit {DOMAIN}.</p>
                <p className="my-8 leading-[2]">We may automatically collect certain non-personally identifiable information about your use of {DOMAIN} through third-party tracking services (e.g., Google Analytics) and store it in log files. This information may include IP addresses, browser type, Internet Service Provider (ISP), referring/exit pages, operating system, date/time stamps, and related data. We use this information, which does not identify individual users, solely to improve the quality of our services. Respecting your privacy, we do not link this automatically collected data to personally identifiable information.</p>
                <p className="my-8 leading-[2]">A cookie is a small text file stored on a user’s computer for record-keeping purposes. We use both session ID cookies and tracking cookies. Session cookies make it easier for you to use {DOMAIN} and expire when you close your browser. Tracking cookies help us better understand how you use our website and enhance your user experience. These cookies remain on your hard drive for an extended period. You are free to decline cookies, but doing so may limit your ability to take full advantage of all our offerings. We do not link the information stored in cookies to any personally identifiable information you submit while using {DOMAIN}.</p>


                <p className="my-8 leading-[2]">We may periodically update this policy. If you subscribe, we will attempt to notify you of material updates by email. Otherwise, you can view the updated version of this policy on our website at {DOMAIN}/dmca.</p>










            </div>
            <Footer />
        </>
    );
}

export default Dmca;