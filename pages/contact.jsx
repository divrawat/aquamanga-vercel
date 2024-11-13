import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Contact } from "@/actions/contact";

const ContactForm = () => {

    const [values, setValues] = useState({
        email: '',
        subject: '',
        message: '',
    });

    const { email, subject, message } = values;


    const handleChange = name => e => { setValues({ ...values, error: false, [name]: e.target.value }) };


    const handleSubmit = e => {
        e.preventDefault();

        const contact = { email, subject, message };

        Contact(contact).then(data => {
            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success(data.message)
                setValues({ ...values, email: '', subject: '', message: '' })
            }
        });
    };


    return (
        <>
            <Navbar />
            <Toaster />
            <div className="pt-5 px-8 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl font-extrabold text-center tracking-wide text-white">Contact Us</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-300 text-[18px]">Got a technical issue ? Want to send feedback about our website ? Let us know.</p>
                <form autoComplete="off" onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white ">Your email</label>
                        <input value={email} onChange={handleChange('email')} type="email" id="email" className="shadow-sm bg-[#051015] border border-gray-500 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="name@gmail.com" required />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-white ">Subject</label>
                        <input value={subject} onChange={handleChange('subject')} type="text" id="subject" className="block p-3 w-full text-sm text-white bg-[#051015] rounded-lg border border-gray-500 shadow-sm focus:ring-primary-500 focus:border-primary-500 " placeholder="Let us know how we can help you" required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-white ">Your message</label>
                        <textarea value={message} onChange={handleChange('message')} id="message" rows="6" className="block p-2.5 w-full text-sm bg-[#051015] text-white  rounded-lg shadow-sm border border-gray-500 focus:ring-primary-500 focus:border-primary-500 " placeholder="Leave a comment..."></textarea>
                    </div>
                    <button type="submit" className="hover:scale-110 active:scale-95 transition-transform py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-[#0e2a36] sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 ">Send message</button>
                </form>
            </div>
            <Footer />
        </>
    )
}


export default ContactForm;