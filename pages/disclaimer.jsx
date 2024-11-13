import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { DOMAIN } from "@/config";


const Disclaimer = () => {

    const head = () => (
        <Head>
            <title>Disclaimer</title>
            <meta name="robots" content="noindex, follow, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta property="og:url" content={`${DOMAIN}/disclaimer`} />
        </Head >
    );


    return (
        <>
            {head()}
            <Navbar />
            <div className="max-w-[1000px] mx-auto p-5 text-white">
                <h1 className="text-center font-bold text-3xl my-8">Disclaimer</h1>


                <p className="my-8 leading-[2]">Thank you for visiting Our website. By using our website, you agree to comply with and be bound by the following disclaimer. If you do not agree with any part of this disclaimer, please do not use our website.</p>


                <h2 className="text-2xl font-bold my-5">1. Content Accuracy</h2>
                <p className="my-8 leading-[2]">While we strive to provide accurate and up-to-date information on our website, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>


                <h2 className="text-2xl font-bold my-5">2. External Links</h2>
                <p className="my-8 leading-[2]">Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>


                <h2 className="text-2xl font-bold my-5">3. Changes to the Website</h2>
                <p className="my-8 leading-[2]">Our website may contain links to third-party websites or services that are not under our ownership or control. We do not assume responsibility for the privacy practices or content of these third-party sites and encourage you to review their privacy policies.</p>


                <h2 className="text-2xl font-bold my-5">Your Choices</h2>
                <p className="my-8 leading-[2]">We reserve the right to modify, update, or discontinue our website at any time without prior notice. We are not liable for any consequences resulting from the unavailability of the website.</p>

                <h2 className="text-2xl font-bold my-5">4. No Professional Advice</h2>
                <p className="my-8 leading-[2]">The information provided on this website is for general informational purposes only and is not intended as professional advice. You should not rely on the information on this website as an alternative to professional advice.</p>



                <h2 className="text-2xl font-bold my-5">5. Limitation of Liability</h2>
                <p className="my-8 leading-[2]">In no event will we be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>


                <h2 className="text-2xl font-bold my-5">6. Changes to the Disclaimer</h2>
                <p className="my-8 leading-[2]">We reserve the right to amend or update this disclaimer at any time. Any changes will be posted on this page.</p>


                <h2 className="text-2xl font-bold my-5">7. Contact Information</h2>
                <p className="my-8 leading-[2]">If you have any questions regarding this disclaimer, you can contact us at divrawat2001@gmail.com</p>

            </div>
            <Footer />
        </>
    );
}

export default Disclaimer;