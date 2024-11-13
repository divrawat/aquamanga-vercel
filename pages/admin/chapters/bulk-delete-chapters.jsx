import { useState } from 'react';
import { bulkRemoveChapters } from '@/actions/chapter';
import AdminDashboard from '@/components/AdminDashboard';
import { isAuth, getCookie } from '@/actions/auth';
import toast, { Toaster } from 'react-hot-toast';

const token = getCookie('token');

const DeleteChapters = () => {
    const [manganame, setmanganame] = useState('');

    // const capitalizeWords = (str) => { return str.replace(/\b\w/g, (char) => char.toUpperCase()); };

    const capitalizeWords = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const handleChange = (e) => {
        const formattedValue = capitalizeWords(e.target.value);
        setmanganame(formattedValue);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleDelete = async () => {
        try {
            const result = await bulkRemoveChapters(token, manganame);
            if (result.error) {
                toast.error(result.error);
                hideModel();
            } else {
                toast.success(result.message);
                setmanganame('');
                hideModel();
                setInputValue('');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const showModal = () => { setIsOpen(true); };
    const hideModel = () => { setIsOpen(false); };

    const confirmationText = "Yes Delete It";
    const isDeleteDisabled = inputValue !== confirmationText;

    return (
        <AdminDashboard>
            <Toaster />

            <div className='max-w-[600px] mx-auto  p-6 rounded-lg'>

                <h2 className='text-2xl font-bold text-white text-center mb-6'>Bulk Delete Chapters</h2>

                <div className="block mb-6 text-sm font-medium text-white">Manga Name</div>
                <input required type="text" value={manganame} onChange={handleChange} autoComplete="off" className="bg-gray-800 border mb-8 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />

                <button onClick={() => showModal()} className="bg-blue-500 flex mx-auto justify-center hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:scale-105 active:scale-95 transition-transform">
                    Delete
                </button>
            </div>


            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px] ${isOpen ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-70"></div>
                <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg z-10">
                    <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                    <p className="mb-4">Are you sure you want to Bulk Delete</p>
                    <div className="text-sm text-[#d35e5e] mb-3">Type the confirmation text below to proceed with deletion</div>
                    <div className='font-semibold text-white text-sm'>" Yes Delete It "</div>

                    <input autoComplete="off" required type="text" placeholder="Type the confirmation text here" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="border border-gray-600 bg-gray-800 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none rounded-md" />

                    <div className="flex justify-end mt-8">
                        <button className={`bg-red-500 text-sm hover:bg-slate-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2 ${isDeleteDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleDelete()} disabled={isDeleteDisabled}>  Delete </button>

                        <button onClick={() => hideModel()} className="bg-slate-800 text-sm hover:bg-slate-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2">Cancel</button>

                    </div>
                </div>
            </div>


        </AdminDashboard>
    );
};

export default DeleteChapters;
