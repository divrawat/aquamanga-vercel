import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { DOMAIN } from "@/config";
import Head from "next/head";


const TermsCondition = () => {

    const head = () => (
        <Head>
            <title>Terms & Conditions</title>
            <meta name="robots" content="noindex, follow, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta property="og:url" content={`${DOMAIN}/terms-and-conditions`} />
        </Head >
    );


    return (
        <>
            {head()}
            <Navbar />
            <div className="max-w-[1000px] mx-auto p-5 text-white">
                <h1 className="text-center font-bold text-3xl my-8">Terms & Conditions</h1>


                <p className="my-8 leading-[2]">These terms and conditions (“Terms”, “Agreement”) are an agreement between the Website Operator (“Website Operator”, “us”, “we”, or “our”) and you (“User”, “you”, or “your”). This Agreement sets forth the general terms and conditions of your use of the {DOMAIN} website (the “Website”). By accessing or using the Website, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Website.</p>


                <h2 className="text-2xl font-bold my-8">Intellectual Property</h2>
                <p className="my-8 leading-[2]">The content, materials, and information displayed on the Website, including but not limited to text, graphics, images, logos, and software, are not the intellectual property of {DOMAIN}/ or its licensors. You may not reproduce, distribute, modify, display, or exploit any of the content without the written consent of the original owners.</p>


                <h2 className="text-2xl font-bold my-8">User Content</h2>
                <p className="my-8 leading-[2]">By submitting or posting any content, including comments, reviews, or media files, on the Website, you grant {DOMAIN}/ a non-exclusive, royalty-free, worldwide, perpetual, and irrevocable right to use, reproduce, modify, adapt, publish, translate, distribute, and display such content for any purpose related to the operation of the Website. You are solely responsible for the content you submit, and you represent that you have all the necessary rights to grant us these rights.</p>


                <h2 className="text-2xl font-bold my-8">Backups</h2>
                <p className="my-8 leading-[2]">We're not responsible for the content hosted on the Website. Under no circumstances shall we be held liable for any loss of content. It's your sole responsibility to keep appropriate backups of your content. However, in certain circumstances, we may, without any obligation, be able to restore some or all of your deleted data from a specific date and time. Please note that any backed-up data is primarily for our own purposes, and we make no guarantee that the data you require will be available.</p>


                <h2 className="text-2xl font-bold my-8">Advertisments</h2>
                <p className="my-8 leading-[2]">While using the website, you may engage in correspondence with or participate in promotions by advertisers or sponsors showcasing their goods or services through the Website. Any such interactions, along with any associated terms, conditions, warranties, or representations, are solely between you and the relevant third party. We bear no liability, obligation, or responsibility for any such correspondence, purchase, or promotion between you and any third party.</p>




                <h2 className="text-2xl font-bold my-8">Prohibited Uses</h2>
                <p className="my-8 leading-[2]">By accessing or using {DOMAIN}, you agree not to engage in any of the following prohibited activities:</p>

                <h2 className="text-2xl font-bold my-8">Violation of Laws</h2>
                <p className="my-8 leading-[2]">Using the Website in any way that violates applicable local, national, or international laws, regulations, or statutes is strictly prohibited.</p>

                <h2 className="text-2xl font-bold my-8">Intellectual Property Infringement</h2>
                <p className="my-8 leading-[2]">Engaging in any activity that infringes upon or violates the intellectual property rights of others, including copyright, trademark, or patent infringement, is not allowed.</p>

                <h2 className="text-2xl font-bold my-8">Unauthorized Access</h2>
                <p className="my-8 leading-[2]">Attempting to gain unauthorized access to the Website, its servers, or any other systems or networks associated with {DOMAIN} is prohibited.</p>

                <h2 className="text-2xl font-bold my-8">Malicious Activities</h2>
                <p className="my-8 leading-[2]">Engaging in any activity that is harmful, illegal, or disruptive, such as hacking, distributing malware, phishing, spamming, or any other malicious activities, is strictly forbidden.</p>

                <h2 className="text-2xl font-bold my-8">Data Mining or Scraping</h2>
                <p className="my-8 leading-[2]">Using automated means, such as data mining, scraping, or crawling, to collect or extract information from the Website without our prior written consent is prohibited.</p>

                <h2 className="text-2xl font-bold my-8">Disruption of Service</h2>
                <p className="my-8 leading-[2]">Engaging in any activity that disrupts or interferes with the proper functioning of the Website, including but not limited to distributing viruses, launching denial-of-service attacks, or any other actions that may harm or degrade the performance of the Website, is not allowed.</p>

                <h2 className="text-2xl font-bold my-8">Unauthorized Sharing of Personal Information</h2>
                <p className="my-8 leading-[2]">Collecting, storing, or disclosing personal information of other users of the Website without their consent is strictly prohibited.</p>

                <h2 className="text-2xl font-bold my-8">Content Violations</h2>
                <p className="my-8 leading-[2]">Posting, uploading, or sharing any content that is defamatory, obscene, offensive, or unlawful, including hate speech, discriminatory content, or content that promotes violence or illegal activities, is not allowed.</p>

                <h2 className="text-2xl font-bold my-8">Changes to Terms and Conditions</h2>
                <p className="my-8 leading-[2]">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. The most current version of the Terms will be posted on the Website. By continuing to access or use the Website after any revisions become effective, you agree to be bound by the revised Terms.</p>

                <h2 className="text-2xl font-bold my-8">Acceptance of these terms</h2>
                <p className="my-8 leading-[2]">You acknowledge that you have read this Agreement and agree to all its terms and conditions. By using the Website or its Services, you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access the Website.</p>

            </div>
            <Footer />
        </>
    );
}

export default TermsCondition;