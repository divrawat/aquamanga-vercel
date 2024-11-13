import { useState, useEffect } from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import toast, { Toaster } from 'react-hot-toast';
import { getCookie } from '@/actions/auth';
const token = getCookie('token');
import { AddMetaTags, getAllMetaTags, removeMetaTag, updateMetaTag } from '@/actions/metatags';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function HeadTags() {
    const [name, setName] = useState('');
    const [content, setcontent] = useState('');

    const handleMetatagnameChange = (e) => { setName(e.target.value); };
    const handlecontentChange = (e) => { setcontent(e.target.value); };

    const handleSubmit = async (event) => {
        event.preventDefault();
        AddMetaTags({ name, content }, token).then(data => {
            if (data.error) { toast.error(data.error); }
            else {
                toast.success(data.message);
                setName('');
                setcontent('');
                fetchData();
            }
        })
    };




    const [currenttag, setcurrenttag] = useState({
        content: '',
        name: '',
    });

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };



    const [blogs, setblogs] = useState([]);
    const [currentuserID, setcurrentuserID] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const hideModel2 = () => {
        setIsOpen2(false);
    }


    const showModal2 = (manga) => {
        setIsOpen2(true);
        setcurrenttag(manga);
    };


    const handlecurrenttagChange = (name) => (e) => {
        const value = e.target.value;
        setcurrenttag({ ...currenttag, [name]: value });
    };


    const showModal = (user) => {
        setIsOpen(true);
        setcurrentuserID(user);
    };


    const hideModel = () => {
        setIsOpen(false);
        setcurrentuserID([]);
        setInputValue("");
    };


    const handleConfirmDelete = (id) => {
        handledelete(id);
        setIsOpen(false);
        setcurrentuserID([]);
        setInputValue("");
    };

    const handledelete = async (id) => {
        try {
            const data = await removeMetaTag(id, token);
            if (data && data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setTimeout(() => { fetchData(); }, 350);
            }
        } catch (error) {
            console.error("Error while deleting user:", error);
        }
    };




    const fetchData = async () => {
        try {
            const data = await getAllMetaTags();
            setblogs(data?.data);
        } catch (error) { console.error('Error fetching Tags:', error); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleUpdate = (id) => {
        if (!token) { toast.error("Please sign in to publish or update the meta tag."); return; }

        let content = currenttag?.content;
        let name = currenttag?.name;

        updateMetaTag({ name, content }, token, id).then(data => {
            if (data?.error) {
                toast.error(data?.error);
                return;
            } else {
                toast.success('Meta Tag updated successfully');
                hideModel2();
                fetchData();
            }
        });
    }

    return (
        <AdminDashboard>
            <Toaster />

            <form onSubmit={handleSubmit} className='max-w-[600px] mx-auto  p-6 rounded-lg'>

                <h2 className='text-2xl font-bold text-white text-center mb-6'>ADD META TAGS</h2>

                <div className="block mb-4 text-sm font-medium text-white">TAG NAME</div>
                <input type="text" id="mangaName" required autoComplete="off" value={name} onChange={handleMetatagnameChange}
                    className="bg-gray-800 border mb-10 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />


                <textarea required id="message" rows={4} value={content} onChange={handlecontentChange} className="block p-2.5 mb-10 w-full text-sm bg-gray-800 rounded-lg border border-gray-300 text-white"></textarea>


                <button type="submit" className="bg-blue-500 flex mx-auto justify-center hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:scale-105 active:scale-95 transition-transform">
                    Submit
                </button>

            </form>


            <h2 className='text-2xl text-white text-center font-bold mt-10'>Meta Tags</h2>



            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 text-white">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs  bg-gray-900 uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Content
                            </th>

                            <th scope="col" className="px-6 py-3">
                                <span >Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                        {blogs && blogs.map((blog, index) => (

                            <tr key={index} className="bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                    <div>{blog?.name}</div>
                                </th>
                                <td className="px-6 py-4">
                                    <div>{blog?.content}</div>
                                </td>

                                <td className="flex items-center gap-10 px-6 py-4">
                                    <div className="cursor-pointer text-white" onClick={() => showModal2(blog)}> <FaEdit size={20} /></div>
                                    <div className="cursor-pointer text-white" onClick={() => showModal(blog)}>  <MdDelete size={20} /></div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div >




















            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isOpen ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-70"></div>
                <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg z-10">
                    <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                    <p className="mb-4">Are you sure you want to delete</p>
                    <div className="text-sm text-[#d35e5e] mb-3">Type "Delete It"</div>
                    <input autoComplete="off" value={inputValue} onChange={handleInputChange} required name="name" type="text" placeholder="Name" className="border border-gray-600 bg-gray-800  w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none rounded-md" />

                    <div className="flex justify-end mt-8">
                        <button disabled={inputValue !== "Delete It"} onClick={() => handleConfirmDelete(currentuserID._id)} className={`text-sm bg-red-600 mr-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded ${inputValue !== "Delete It" ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            Delete
                        </button>
                        <button className="bg-slate-800 text-sm hover:bg-slate-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"
                            onClick={hideModel}
                        >Cancel</button>
                    </div>
                </div>
            </div>




















            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isOpen2 ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-90" onClick={() => hideModel2()}></div>
                <div className="bg-black p-8 rounded-lg shadow-lg z-10 border border-gray-300 h-[500px] w-[500px] overflow-y-auto">
                    <h2 className="text-lg text-gray-300 font-semibold mb-4">Edit Meta Tag</h2>



                    <div className='text-white mb-3'>Tag Name</div>
                    <input type="text" required autoComplete="off" value={currenttag?.name} onChange={handlecurrenttagChange('name')}
                        className="bg-gray-800 border mb-10 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />


                    <div className='text-white mb-3'>Tag Content</div>
                    <input type="text" required autoComplete="off" value={currenttag?.content} onChange={handlecurrenttagChange('content')}
                        className="bg-gray-800 border mb-10 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />



                    <div className="flex justify-end mt-8">
                        <button onClick={() => handleUpdate(currenttag?._id)} className="bg-[green] text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"> Update </button>
                        <button className="bg-[red] text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2" onClick={hideModel2} >Cancel</button>
                    </div>

                </div>

            </div>










        </AdminDashboard>
    );
}
