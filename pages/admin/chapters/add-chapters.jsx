import { useState } from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import toast, { Toaster } from 'react-hot-toast';
import { addChapter } from '@/actions/chapter';
import { isAuth, getCookie } from '@/actions/auth';
const token = getCookie('token');

const MangaForm = () => {
    const [manganame, setmanganame] = useState('');
    const [chapterNumber, setChapterNumber] = useState('');
    const [numImages, setNumImages] = useState('');

    const handleMangaNameChange = (e) => {
        const capitalizedMangaName = e.target.value
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        setmanganame(capitalizedMangaName);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) { toast.error('Please login to continue'); return; }

        const formData = new FormData();
        formData.append('manganame', manganame);
        formData.append('chapterNumber', chapterNumber);
        formData.append('numImages', numImages);

        try {
            const response = await addChapter(formData, token);
            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success(response.message);
            }
        } catch (error) {
        }
    };

    return (
        <AdminDashboard>
            <Toaster />
            <form onSubmit={handleSubmit} className='max-w-[600px] mx-auto  p-6 rounded-lg'>

                <h2 className='text-2xl font-bold text-white text-center mb-6'>Add New Chapter</h2>

                <div className="block mb-2 text-sm font-medium text-white">Manga Name</div>
                <input type="text" id="mangaName" value={manganame} onChange={handleMangaNameChange} required autoComplete="off"
                    className="bg-gray-800 border mb-5 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />


                <div className="block mb-2 text-sm font-medium text-white">Chapter Number</div>
                <input type="text" id="chapterNumber" value={chapterNumber} onChange={(e) => setChapterNumber(e.target.value)} required autoComplete="off"
                    className="bg-gray-800 border mb-5 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white"
                />

                <div className="block mb-2 text-sm font-medium text-white">Number Of Images</div>
                <input type="number" id="numImages" value={numImages} onChange={(e) => setNumImages(e.target.value)} required autoComplete="off"
                    className="bg-gray-800 border mb-5 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white"
                />


                <button type="submit" className="bg-blue-500 flex mx-auto justify-center hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:scale-105 active:scale-95 transition-transform">
                    Submit
                </button>

            </form>

        </AdminDashboard>
    );
};

export default MangaForm;
