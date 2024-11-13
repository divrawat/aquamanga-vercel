import { useState } from 'react';
import { BulkAddChapters } from '@/actions/chapter';
import AdminDashboard from '@/components/AdminDashboard';
import toast, { Toaster } from 'react-hot-toast';
import { getCookie } from '@/actions/auth';
const token = getCookie('token');

export default function UploadChapters() {
    const [chaptersData, setChaptersData] = useState('');
    const [manganame, setManganame] = useState('');

    const handleManganameChange = (e) => {
        const inputString = e.target.value;
        const words = inputString.split(' ');

        const capitalizedWords = words.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });

        const capitalizedManganame = capitalizedWords.join(' ');
        setManganame(capitalizedManganame);
    };


    /*
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const chaptersArray = JSON.parse(chaptersData);
            const formattedData = chaptersArray.map(chapter => ({
                manganame: `${manganame}`,
                chapterNumber: chapter.chapterNumber,
                numImages: chapter.numImages
            }));

            const response = await BulkAddChapters(formattedData, token);
            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success(response.message);
                setChaptersData('');
                setManganame('');
            }
        } catch (error) {
            toast.error('Invalid data format');
        }
    };
    */

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Parse and format the chapters data
            const chaptersArray = JSON.parse(chaptersData);
            const formattedData = chaptersArray.map(chapter => ({
                manganame: manganame.trim(),
                chapterNumber: chapter.chapterNumber,
                numImages: chapter.numImages
            }));

            // Filter out duplicate chapters based on chapterNumber
            const uniqueChapters = formattedData.filter((chapter, index, self) =>
                index === self.findIndex((c) => (
                    c.chapterNumber === chapter.chapterNumber && c.manganame === chapter.manganame
                ))
            );

            // Send the filtered data to the backend
            const response = await BulkAddChapters(uniqueChapters, token);
            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success(response.message);
                setChaptersData('');
                setManganame('');
            }
        } catch (error) {
            toast.error('Invalid data format');
        }
    };



    return (
        <AdminDashboard>
            <Toaster />

            <form onSubmit={handleSubmit} className='max-w-[600px] mx-auto  p-6 rounded-lg'>

                <h2 className='text-2xl font-bold text-white text-center mb-6'>Bulk Add Chapters</h2>

                <div className="block mb-4 text-sm font-medium text-white">Manga Name</div>
                <input type="text" id="mangaName" required autoComplete="off" value={manganame} onChange={handleManganameChange}
                    className="bg-gray-800 border mb-10 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />


                <div className="block mb-4 text-sm font-medium text-white">Your Object with chapters and Images number &nbsp; &nbsp; (Don't include &nbsp; " ; " &nbsp; or export const Object name)</div>

                <textarea required id="message" rows={12} value={chaptersData} onChange={(e) => setChaptersData(e.target.value)} className="block p-2.5 mb-10 w-full text-sm bg-gray-800 rounded-lg border border-gray-300 text-white"></textarea>


                <button type="submit" className="bg-blue-500 flex mx-auto justify-center hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:scale-105 active:scale-95 transition-transform">
                    Submit
                </button>

            </form>

        </AdminDashboard>
    );
}
