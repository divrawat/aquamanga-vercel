import { useEffect, useState } from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import { isAuth, getCookie } from '@/actions/auth';
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { getAllContacts, removeContact } from '@/actions/contact';

const token = getCookie('token');

const AdminContacts = () => {


    const [blogs, setblogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogscount, setblogscount] = useState(0);
    const [currentuserID, setcurrentuserID] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [inputValue, setInputValue] = useState('');


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
            const data = await removeContact(id, token);
            if (data && data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setTimeout(() => { fetchData(); }, 350);
            }
        } catch (error) {
            console.error("Error while deleting chapter:", error);
        }
    };


    const fetchData = async () => {
        try {
            const data = await getAllContacts(currentPage, searchQuery, token);
            setblogs(data?.data); setblogscount(data?.totalContacts)
        } catch (error) { console.error('Error fetching Contacts:', error); }
    };

    const handlePageChange = (newPage) => { setCurrentPage(newPage); };


    const [searchQuery, setSearchQuery] = useState('');
    const handleChangeSearch = (e) => { setSearchQuery(e.target.value); setCurrentPage(1); };
    useEffect(() => { setTimeout(() => { fetchData(); }, 500) }, [currentPage, searchQuery]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };



    return (
        <AdminDashboard>
            <Toaster />

            <div className="text-center text-sm text-white font-bold mb-6">Total Contacts &nbsp;-&nbsp; {blogscount}</div>

            <input type="search" id="default-search" className="outline-none block w-full p-3 ps-10 text-sm text-white rounded-lg bg-gray-900" placeholder="Search Contacts" value={searchQuery} onChange={handleChangeSearch} />


            <div className="flex justify-center items-center gap-10 mt-8 text-sm ">
                <button className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[white] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span className="text-black">{currentPage}</span>
                <button className={`px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[white] active:scale-95 transition-transform ${((currentPage * 20) >= blogscount) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => handlePageChange(currentPage + 1)} disabled={(currentPage * 20) >= blogscount}>Next</button>
            </div>


            {blogscount === 0 && <div className="text-center text-[white] mt-10 text-lg">No Contact Found</div>}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10  text-white">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs  bg-gray-900 uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Subject
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Message
                            </th>

                            <th scope="col" className="px-6 py-3">
                                <span >Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                        {blogs && blogs.map((blog, index) => (

                            <tr key={index} className="bg-gray-800 ">
                                <th scope="row" className="px-6 py-4  whitespace-nowrap text-white font-normal">
                                    <div>{blog?.email}</div>
                                </th>

                                <th scope="row" className="px-6 py-4  whitespace-nowrap text-white font-normal">
                                    <div>{blog?.subject}</div>
                                </th>

                                <th scope="row" className=" px-6 py-4 whitespace-nowrap text-white font-normal">
                                    <div className='max-w-[300px] break-words text-wrap'>{blog?.message}</div>
                                </th>


                                <td className="flex items-center gap-10 px-6 py-4 ">
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


        </AdminDashboard >
    )
}



export default AdminContacts