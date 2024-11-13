import { useState, useEffect } from 'react';
import { createManga, getAllMangas, updateManga } from '@/actions/manga';
import { getCategories } from '@/actions/category';
import AdminDashboard from '@/components/AdminDashboard';
import { getCookie } from '@/actions/auth';
import toast, { Toaster } from 'react-hot-toast';

const CreateManga = () => {

    const [values, setValues] = useState({
        formData: new FormData(),
        name: '',
        fullname: '',
        description: '',
        author: '',
        slug: '',
        type: '',
        releaseDate: '',
        loading: false,
        createText: 'Submit',
    });


    const [checked, setChecked] = useState([]);
    const [categories, setCategories] = useState([]);

    const { error, formData, loading, fullname, name, slug, type, releaseDate, createText, author, description } = values;
    const token = getCookie('token');



    useEffect(() => { fetchCategories(); }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data?.categories);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };



    const handleToggle = (c) => () => {
        setValues({ ...values, error: '' });
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];
        if (clickedCategory === -1) { all.push(c); }
        else { all.splice(clickedCategory, 1); }
        setChecked(all);
        formData.set('categories', all);
    };


    const showCategories = () => {
        return (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories?.map((c, i) => (
                    <li key={i} className="flex items-center p-3 bg-gray-800 rounded-lg">
                        <input onChange={handleToggle(c?._id)} type="checkbox" className="cursor-pointer mr-2" />
                        <label className="font-semibold text-gray-300 text-sm">{c?.name}</label>
                    </li>
                ))}
            </ul>
        );
    };

    // const capitalizeWords = (str) => {
    //     return str.replace(/\b\w/g, char => char.toUpperCase());
    // };

    const capitalizeWords = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const handleChange = (name) => (e) => {
        let value = e.target.value;
        if (['name', 'fullname', 'type', 'author'].includes(name)) {
            value = capitalizeWords(value);
        }
        formData.set(name, value);
        setValues({ ...values, [name]: value, error: '' });
    };

    const publishManga = (e) => {
        e.preventDefault();
        if (!token) { toast.error("Please sign in to publish the manga."); return; }

        createManga(formData, token).then(data => {

            if (data.error) {
                toast.error(data.error);
                setValues({ ...values, createText: 'Create Manga', loading: false, error: data.error });
            } else {
                toast.success('Manga created successfully');

                setValues({
                    ...values,
                    loading: false,
                    name: '',
                    fullname: '',
                    author: '',
                    description: '',
                    slug: '',
                    error: '',
                    success: '',
                    type: '',
                    releaseDate: '',
                    categories: [],
                });

                setChecked([]);
            }
        });
    };


    return (
        <AdminDashboard className="max-w-2xl mx-auto mt-10">
            <Toaster />

            <form onSubmit={publishManga} className="max-w-[600px] mx-auto">

                <h2 className='font-bold text-white text-center text-3xl mb-8'>Add Manga</h2>

                <div className="block mb-4 text-sm font-medium text-white">Full Name</div>
                <input type="text" id="mangaName" required autoComplete="off" value={fullname} onChange={handleChange('fullname')}
                    className="bg-gray-800 border mb-10 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />




                <div className="block mb-4 text-sm font-medium text-white">Short Name</div>
                <input type="text" id="mangaName" required autoComplete="off" value={name} onChange={handleChange('name')}
                    className="bg-gray-800 border mb-10 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />



                <div className="block mb-4 text-sm font-medium text-white">Description</div>
                <textarea required id="message" rows={6} autoComplete="off" value={description} onChange={handleChange('description')} className="block p-2.5 mb-10 w-full text-sm bg-gray-800 rounded-lg border border-gray-300 text-white"></textarea>


                <div className="block mb-4 text-sm font-medium text-white">Author</div>
                <input type="text" id="mangaName" required autoComplete="off" value={author} onChange={handleChange('author')}
                    className="bg-gray-800 border mb-10 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />



                <div className="block mb-4 text-sm font-medium text-white">Release Date</div>
                <input type="text" id="mangaName" required autoComplete="off" value={releaseDate} onChange={handleChange('releaseDate')}
                    className="bg-gray-800 border mb-10 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />


                <div className="block mb-4 text-sm font-medium text-white">Type</div>
                <input type="text" id="mangaName" required autoComplete="off" value={type} onChange={handleChange('type')}
                    className="bg-gray-800 border mb-10 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />




                <div className="block mb-5 text-sm font-medium text-white">Categories</div>
                <ul className="ml-5"> {showCategories()} </ul>


                <div className="block mb-4 mt-8 text-sm font-medium text-white">Slug</div>
                <input type="text" id="mangaName" required autoComplete="off" value={slug} onChange={handleChange('slug')}
                    className="bg-gray-800 border mb-10 border-gray-300 text-sm rounded-lg block w-full p-2.5 text-white" />


                <button type="submit" className="bg-blue-500 flex mx-auto justify-center hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:scale-105 active:scale-95 transition-transform">
                    {createText}
                </button>

            </form>

        </AdminDashboard>
    );
};

export default CreateManga;
