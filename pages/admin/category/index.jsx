"use client"
import { useState, useEffect } from 'react';
import { getCookie } from '@/actions/auth';
import AdminDashboard from '@/components/AdminDashboard';
import { create, getCategories, removeCategory } from '@/actions/category';
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';

const Category = () => {

    const token = getCookie('token');

    const [values, setValues] = useState({
        name: '',
        description: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false,
        loading: false
    });

    const { name, description, error, success, categories, loading, removed, reload } = values;

    const [currentuserID, setcurrentuserID] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
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


    const deleteCategory = (slug) => {
        removeCategory(slug, token).then(data => {
            if (data.error) {
                toast.error(data.error);
                console.log(data.error);
                setValues({ ...values, loading: false });
            }
            else {
                toast.success(data.message);
                setValues({ ...values, error: false, success: false, name: '', loading: false, removed: !removed, reload: !reload });

            }
        });
    };

    const handleConfirmDelete = (slug) => {
        setValues({ ...values, loading: true });
        deleteCategory(slug);
        setIsOpen(false);
        setcurrentuserID([]);
        setInputValue("");
    };

    useEffect(() => { loadCategories(); }, [reload]);

    const loadCategories = () => {
        getCategories().then(data => {
            if (data?.error) { console.log(data.error); }
            else {
                setValues({ ...values, categories: data?.categories });
            }
        });
    };

    const clickSubmit = e => {
        setValues({ ...values, loading: true });
        e.preventDefault();
        create({ name, description }, token).then(data => {
            if (data.error) {
                toast.error(data.error);
                setValues({ ...values, error: data.error, success: false, loading: false });
            }
            else {
                toast.success(data.message);
                setValues({ ...values, error: false, loading: false, success: true, name: '', description: '', removed: false, reload: !reload });
            }
        });
    };

    const handleChange = e => { setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' }); };
    const handleChangedesc = e => { setValues({ ...values, description: e.target.value, error: false, success: false, removed: '' }); };




    return (
        <AdminDashboard>
            <Toaster />

            <h1 className="text-center text-2xl font-bold">Categories</h1>

            <div className='lg:flex mt-8 gap-[7%] justify-center text-gray-200'>
                <div className=''>
                    <form onSubmit={clickSubmit}>
                        <div>Name</div>
                        <input type="text" onChange={handleChange} value={name} placeholder='Name' required className='border w-[320px] bg-gray-800 text-gray-300 h-5 px-3 py-5  mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md' />
                        <div className='mt-10 mb-2'>Description</div>
                        <textarea value={description} onChange={handleChangedesc} id="message" rows="8" className="block p-2.5 w-full text-sm outline-none s rounded-lg border bg-gray-700 text-gray-400  focus:ring-blue-500 focus:border-blue-500 " placeholder="Category Description"></textarea>
                        <div className='flex justify-center'>  <button className='mt-5 bg-[black] text-white px-4 py-2 font-bold tracking-wider rounded hover:scale-105 text-sm hover:text-[yellow] active:scale-95 transition-transform'>ADD</button></div>
                    </form>
                </div>


                <div className='lg:p-0 p-5'>
                    <div className="relative overflow-x-auto sm:rounded-lg mt-7">
                        <table className="xl:w-[600px] text-sm text-left rtl:text-right text-gray-300 mx-auto">
                            <thead className="text-xs uppercase  bg-gray-700 text-gray-300">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span >Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>


                                {categories && categories?.map((user, index) => (

                                    <tr key={index} className=" border-b bg-gray-800 border-gray-700  ">
                                        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                            {user?.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {user?.description}
                                        </td>

                                        <td className="flex items-center gap-10 px-6 py-4">
                                            <div className="cursor-pointer text-[red]" onClick={() => showModal(user)}>  <MdDelete size={20} /></div>
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>

            </div>




            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${isOpen ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">
                    <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                    <p className="mb-4">Are you sure you want to delete &nbsp;<span className="font-bold text-xl">{currentuserID.name}</span></p>
                    <div className="text-sm text-[#d35e5e]">Type the name of the Category</div>
                    <input autoComplete="off" value={inputValue} onChange={handleInputChange} required name="name" type="text" placeholder="Name" className="border border-red-500 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none rounded-md" />

                    <div className="flex justify-end mt-8">
                        <button disabled={inputValue !== currentuserID.name} onClick={() => handleConfirmDelete(currentuserID.slug)} className={`text-sm bg-red-600 mr-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded ${inputValue !== currentuserID.name ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            Delete
                        </button>
                        <button className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"
                            onClick={hideModel}
                        >Cancel</button>
                    </div>
                </div>
            </div>







        </AdminDashboard>
    );
};

export default Category;