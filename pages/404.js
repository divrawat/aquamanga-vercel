import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { NOT_FOUND_IMAGE } from "@/config";


const head = () => (
    <Head>
        <title>404 Page Not Found</title>
        <meta name="robots" content="noindex" />
    </Head>
);


const Custom404 = () => {
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

export default Custom404;