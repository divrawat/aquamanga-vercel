
import { useEffect, useState } from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import { isAuth, getCookie } from '@/actions/auth';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { list, removeChapters, updateChapters } from '@/actions/chapter';
import toast, { Toaster } from 'react-hot-toast';

const token = getCookie('token');

const AllBlogs = () => {

    const [currentmanga, setCurrentmanga] = useState({
        fullname: '',
        name: '',
        description: '',
        author: '',
        slug: '',
        type: '',
        releaseDate: '',
        categories: [],
    });

    const [blogs, setblogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogscount, setblogscount] = useState(0);
    const [currentuserID, setcurrentuserID] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const hideModel2 = () => {
        setIsOpen2(false);
    }


    const showModal2 = (manga) => {
        setIsOpen2(true);
        setCurrentmanga(manga);
    };




    const handleCurrentMangaChange = (name) => (e) => {
        const value = e.target.value;
        setCurrentmanga({ ...currentmanga, [name]: value });
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
            const data = await removeChapters(id, token);
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
            const data = await list(currentPage, searchQuery, token); setblogs(data?.data); setblogscount(data?.totalBlogs)
        } catch (error) { console.error('Error fetching Blogs:', error); }
    };

    const handlePageChange = (newPage) => { setCurrentPage(newPage); };


    const [searchQuery, setSearchQuery] = useState('');
    const handleChangeSearch = (e) => { setSearchQuery(e.target.value); setCurrentPage(1); };
    useEffect(() => { setTimeout(() => { fetchData(); }, 500) }, [currentPage, searchQuery]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };





    const handleUpdate = (id) => {
        if (!token) { toast.error("Please sign in to publish or update the Chapter."); return; }

        const formdata2 = new FormData();
        formdata2.set('manganame', currentmanga?.manganame);
        formdata2.set('numImages', currentmanga?.numImages);
        formdata2.set('chapterNumber', currentmanga?.chapterNumber);

        updateChapters(formdata2, token, id).then(data => {
            if (data?.error) {
                toast.error(data?.error);
                return;
            } else {
                toast.success('Chapter updated successfully');
                hideModel2();
                fetchData();
            }
        });
    }



    return (
        <AdminDashboard>
            <Toaster />

            <div className="text-center text-sm text-white font-bold mb-6">Total Chapters &nbsp;-&nbsp; {blogscount}</div>

            <input type="search" id="default-search" className="outline-none block w-full p-3 ps-10 text-sm text-white rounded-lg bg-gray-900" placeholder="Search Mangas" value={searchQuery} onChange={handleChangeSearch} />


            <div className="flex justify-center items-center gap-10 mt-8 text-sm ">
                <button className="px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[white] active:scale-95 cursor-pointer transition-transform" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span className="text-black">{currentPage}</span>
                <button className={`px-3 py-1 bg-slate-900 rounded text-[12px] hover:scale-105 text-[white] active:scale-95 transition-transform ${((currentPage * 20) >= blogscount) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => handlePageChange(currentPage + 1)} disabled={(currentPage * 20) >= blogscount}>Next</button>
            </div>


            {blogscount === 0 && <div className="text-center text-[white] mt-10 text-lg font-bold">No Manga Found</div>}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 text-white">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs  bg-gray-900 uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                SHORT Name
                            </th>

                            <th scope="col" className="px-6 py-3">
                                ChapterNumber
                            </th>

                            <th scope="col" className="px-10 py-3">
                                Images
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
                                    <div>{blog?.manganame}</div>
                                </th>

                                <th scope="row" className="px-[70px] py-4 font-medium  whitespace-nowrap text-white">
                                    <div>{blog?.chapterNumber}</div>
                                </th>

                                <th scope="row" className="px-[60px] py-4 font-medium  whitespace-nowrap text-white">
                                    <div>{blog?.numImages}</div>
                                </th>


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
                    <p className="mb-4">Are you sure you want to delete &nbsp;<span className="font-bold text-xl">{currentuserID.manganame}</span></p>
                    <div className="text-sm text-[#d35e5e] mb-3">Type the name of the Manga</div>
                    <input autoComplete="off" value={inputValue} onChange={handleInputChange} required name="name" type="text" placeholder="Name" className="border border-gray-600 bg-gray-800  w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none rounded-md" />

                    <div className="flex justify-end mt-8">
                        <button disabled={inputValue !== currentuserID.manganame} onClick={() => handleConfirmDelete(currentuserID._id)} className={`text-sm bg-red-600 mr-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded ${inputValue !== currentuserID.manganame ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
                    <h2 className="text-lg text-gray-300 font-semibold mb-4">Edit Chapter</h2>

                    <input type="text" required autoComplete="off" value={currentmanga?.manganame} onChange={handleCurrentMangaChange('manganame')}
                        className="bg-gray-800 border mb-10 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />


                    <div className='text-white mb-3'>Chapter Number</div>
                    <input type="text" required autoComplete="off" value={currentmanga?.chapterNumber} onChange={handleCurrentMangaChange('chapterNumber')}
                        className="bg-gray-800 border mb-10 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />


                    <div className='text-white mb-3'>Images</div>
                    <input type="text" required autoComplete="off" value={currentmanga?.numImages} onChange={handleCurrentMangaChange('numImages')}
                        className="bg-gray-800 border mb-10 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />


                    <div className="flex justify-end mt-8">
                        <button onClick={() => handleUpdate(currentmanga?._id)} className="bg-[green] text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"> Update </button>
                        <button className="bg-[red] text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2" onClick={hideModel2} >Cancel</button>
                    </div>

                </div>

            </div>





        </AdminDashboard >
    )
}



export default AllBlogs