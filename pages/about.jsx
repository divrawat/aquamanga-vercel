import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { DOMAIN, APP_NAME } from "@/config";

const About = () => {

    const head = () => (
        <Head>
            <title>About</title>
            <meta name="robots" content="noindex, follow, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta property="og:url" content={`${DOMAIN}/about`} />
        </Head >
    );

    return (
        <>
            {head()}
            <Navbar />
            <div className="max-w-[1000px] mx-auto p-5 text-white">
                <h1 className="text-center font-bold text-3xl my-8">About</h1>


                <p className="my-8 leading-[2]">Welcome to {APP_NAME} Haven, your ultimate destination for everything related to the epic manga series, {APP_NAME}!</p>

                <h2 className="text-2xl font-bold my-5">Our Journey</h2>
                <p className="my-8 leading-[2]">Our love for {APP_NAME} began years ago when we first dived into the world created by Makoto Yukimura. The rich storytelling, the complex characters, and the breathtaking artwork captivated us from the very first page. What started as a personal passion has grown into a thriving online community where fans from all around the world can come together to celebrate this incredible series.</p>


                <h2 className="text-2xl font-bold my-5">Our Mission</h2>
                <p className="my-8 leading-[2]">At {APP_NAME} Haven, our mission is to provide a comprehensive resource for all {APP_NAME} enthusiasts. Whether you're a long-time fan or a newcomer to the series, we aim to offer something for everyone. From detailed chapter summaries and character analyses to the latest news and fan theories, our goal is to create a space where the {APP_NAME} community can flourish.</p>



                <h2 className="text-2xl font-bold my-5">What We Offer</h2>
                <p className="my-8 leading-[2]">Missed an issue or need a refresher? Our detailed chapter summaries will keep you up to date. Dive deep into the lives of your favorite characters with our in-depth profiles and analyses. Stay informed with the latest updates on the manga, anime adaptations, and related media. Join discussions, share fan art, and connect with other {APP_NAME} fans in our vibrant community forums.</p>

                <h2 className="text-2xl font-bold my-5">Why {APP_NAME} ?</h2>
                <p className="my-8 leading-[2]">{APP_NAME} isn't just a manga; it's a journey through history, filled with intricate plots and unforgettable characters. Set during the Viking era, it combines historical accuracy with thrilling fiction, exploring themes of revenge, honor, and redemption. We believe that {APP_NAME} offers a unique experience that resonates deeply with its readers, and we are dedicated to sharing that experience with as many people as possible.</p>

                <h2 className="text-2xl font-bold my-5">Join Us</h2>
                <p className="my-8 leading-[2]">We invite you to explore our website, join our community, and immerse yourself in the world of {APP_NAME}. Whether you're here to catch up on the latest chapters, delve into character backstories, or simply share your love for the series, {APP_NAME} Haven is the place for you.</p>

                <p className="my-8 leading-[2]">Thank you for being part of our journey. Together, let's continue to celebrate the epic tale of {APP_NAME}!</p>


            </div>
            <Footer />
        </>
    );
}

export default About;