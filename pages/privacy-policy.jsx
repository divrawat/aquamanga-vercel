import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { DOMAIN } from "@/config";

const PrivacyPolicy = () => {

    const head = () => (
        <Head>
            <title>Privacy Policy</title>
            <meta name="robots" content="noindex, follow, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta property="og:url" content={`${DOMAIN}/privacy-policy`} />
        </Head >
    );


    return (
        <>
            {head()}
            <Navbar />
            <div className="max-w-[1000px] mx-auto p-5 text-white">
                <h1 className="text-center font-bold text-3xl my-8">PrivacyPolicy</h1>


                <p className="my-8 leading-[2]">Thanks you for visiting our website. This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information when you visit our website or use our services through Google AdSense. By accessing or using our website, you consent to the practices described in this Privacy Policy.</p>


                <h2 className="text-2xl font-bold my-5">Information We Collect</h2>
                <p className="my-8 leading-[2]">When you visit our website, we do not collect certain information from and about you, which includes:</p>

                <p className="my-8 leading-[2]">Personal Information: We do not gather personal information such as your name, address, phone number, or email address through our website.</p>
                <p className="my-8 leading-[2]">Non-Personal Information: For analytical purposes aimed at enhancing our website's functionality and user experience, we may collect non-personal information about your visit. This may include your IP address, browser type, device information, operating system, referring/exit pages, and clickstream data.</p>


                <h2 className="text-2xl font-bold my-5">Cookies and Tracking Technologies</h2>
                <p className="my-8 leading-[2]">We do not utilize cookies, web beacons, and similar tracking technologies to gather information about your interactions with our website. These tools assist in analyzing trends, administering the site, tracking user movements around the site, and compiling demographic information.</p>


                <h2 className="text-2xl font-bold my-5">Third-Party Links</h2>
                <p className="my-8 leading-[2]">Our website may contain links to third-party websites or services that are not under our ownership or control. We do not assume responsibility for the privacy practices or content of these third-party sites and encourage you to review their privacy policies.</p>


                <h2 className="text-2xl font-bold my-5">Your Choices</h2>
                <p className="my-8 leading-[2]">You have the option to disable or block cookies orlocation through your browser settings. However, please be aware that disabling cookies may impact the functionality and user experience of our website.</p>

                <h2 className="text-2xl font-bold my-5">Children’s Privacy</h2>
                <p className="my-8 leading-[2]">Our website is not intended for individuals under the age of 13. We do not knowingly collect or solicit personal information from anyone under 13 years old. If you are under 13, please refrain from using our website or providing any personal information.</p>



                <h2 className="text-2xl font-bold my-5">Changes to This Privacy Policy</h2>
                <p className="my-8 leading-[2]">To reflect changes in our practices or for operational, legal, or regulatory reasons, we may periodically update this Privacy Policy. The revised policy will be posted on this page with an updated “Effective Date.”</p>


                <h2 className="text-2xl font-bold my-5">Contact Us</h2>
                <p className="my-8 leading-[2]">If you have any questions about this Privacy Policy, please reach out to us via our contact page.</p>

                <p className="my-8 leading-[2]">By using our website, you acknowledge that you have read and comprehended this Privacy Policy, agreeing to its terms and conditions.</p>

            </div>
            <Footer />
        </>
    );
}

export default PrivacyPolicy;