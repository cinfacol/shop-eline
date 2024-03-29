import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
// import { list_orders } from '../../features/services/orders/orders.service'
import { update_profile } from '../features/profiles/profileService';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
// import DashboardLink from '../../components/dashboard/DashboardLink';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  Bars3Icon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { countries } from '../helpers/fixedCountries';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { reset } from '../features/profiles/profileSlice';

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  { name: 'Go Back', href: '/' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const EditProfile = () => {
  // const orders = useSelector(state => state.orders.orders);
  // const isAuthenticated = useSelector(state => state.auth.user.isLoggedIn);
  const user = useSelector(state => state.auth.user);
  const profile = useSelector(state => state.profile.profile);
  const username = user.username;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, message } = useSelector(
		(state) => state.profile
	);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const loading = useSelector(state => state.profile.status);

  const gender_option = [
    {value: "MALE", name: "Male"},
    {value: "FEMALE", name: "Female"},
    {value: "OTHER", name: "Other"},
  ]

  // const uploadedImage = React.useRef(null);
  // const imageUploader = React.useRef(null);

  useEffect(() => {
    if (isError) {
			toast.error(message);
		}

		if (isSuccess) {
			navigate("/profile");
		}

		dispatch(reset());
    // dispatch(list_orders());
    // dispatch(get_items(), get_total(), get_item_total());
    // dispatch(get_user_profile());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const [formData, setFormData] = useState({
    phone_number: '',
    about_me: '',
    address_line_1: '',
    address_line_2: '',
    profile_photo: '',
    gender: '',
    country: '',
    departamento: '',
    city: '',
    zipcode: '',
  });

  const {
    phone_number,
    about_me,
    address_line_1,
    address_line_2,
    profile_photo,
    gender,
    country,
    departamento,
    city,
    zipcode,
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  /* const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      console.log('upload_image_file', file);
    }
  }; */

  const onSubmit = e => {
    e.preventDefault();
    console.log('form_data', formData);
    dispatch(update_profile({username, formData}));
    window.scrollTo(0, 0);
  };

  if (!user)
    return <Navigate to='/' />

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as='div' className='fixed inset-0 flex z-40 md:hidden' onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 right-0 -mr-12 pt-2'>
                    <button
                      type='button'
                      className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      <XCircleIcon className='h-6 w-6 text-white' aria-hidden='true' />
                    </button>
                  </div>
                </Transition.Child>
                <div className='flex-shrink-0 flex items-center px-4'>
                  <Link to='/'>
                    <img
                      className='h-8 w-auto cursor-pointer'
                      src='https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg'
                      alt='Workflow'
                    />
                  </Link>
                </div>
                <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                  {/* <nav className='px-2 space-y-1'>
                    <DashboardLink />
                  </nav> */}
                </div>
              </div>
            </Transition.Child>
            <div className='flex-shrink-0 w-14' aria-hidden='true'>
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto'>
            <div className='flex items-center flex-shrink-0 px-4'>

              <Link
                to='/profile'
                className='inline-flex items-center px-2.5 py-1.5 border border-gray-500 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Regresar
              </Link>

              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg'
                alt='Workflow'
              />

            </div>
            <div className='mt-5 flex-grow flex flex-col'>
              {/* <nav className='flex-1 px-2 pb-4 space-y-1'>
                <DashboardLink />
              </nav> */}
            </div>
          </div>
        </div>
        <div className='md:pl-64 flex flex-col flex-1'>
          <div className='sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow'>
            <button
              type='button'
              className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div className='flex-1 px-4 flex justify-between'>
              <div className='flex-1 flex'>
                <form className='w-full flex md:ml-0' action='#' method='GET'>
                  <label htmlFor='search-field' className='sr-only'>
                    Search
                  </label>
                  <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                    <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                      <MagnifyingGlassIcon className='h-5 w-5' aria-hidden='true' />
                    </div>
                    <input
                      id='search-field'
                      className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm'
                      placeholder='Search'
                      type='search'
                      name='search'
                    />
                  </div>
                </form>
              </div>
              <div className='ml-4 flex items-center md:ml-6'>
                <button
                  type='button'
                  className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Profile dropdown */}
                <Menu as='div' className='ml-3 relative'>
                  <div>
                    <Menu.Button className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src={profile && profile.profile_photo}
                        alt=''
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className='flex-1'>
            <div className='py-6'>
              <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
                <form onSubmit={e => onSubmit(e)} className='max-w-3xl mx-auto'>
                  <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6 flex items-stretch'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900 mr-4'>
                      Perfil de  {profile && profile.full_name}
                    </h3>
                    <img
                      className='h-8 w-8 rounded-full'
                      src={profile && profile.profile_photo}
                      alt=''
                    />
                  </div>

                  {/* Form Fields */}
                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label htmlFor='username' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                      Phone:
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2 flex'>
                      <div className='max-w-lg flex rounded-md shadow-sm'>
                        <input
                          type='text'
                          name='phone_number'
                          placeholder={`${profile && profile.phone_number}`}
                          onChange={e => onChange(e)}
                          value={phone_number}
                          required
                          className='flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500 pl-3'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label htmlFor='username' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                      about_me:
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <div className='max-w-lg flex rounded-md shadow-sm'>
                        <input
                          type='textarea'
                          name='about_me'
                          placeholder={`${profile && profile.about_me}`}
                          onChange={e => onChange(e)}
                          value={about_me}
                          required
                          className='flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500 pl-3'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label htmlFor='username' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                      Address Line 1:
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <div className='max-w-lg flex rounded-md shadow-sm'>

                        <input
                          type='text'
                          name='address_line_1'
                          placeholder={`${profile && profile.address_line_1}`}
                          onChange={e => onChange(e)}
                          value={address_line_1}
                          required
                          className='flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label htmlFor='username' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                      Address Line 2:
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <div className='max-w-lg flex rounded-md shadow-sm'>

                        <input
                          type='text'
                          name='address_line_2'
                          placeholder={`${profile && profile.address_line_2}`}
                          onChange={e => onChange(e)}
                          value={address_line_2}
                          className='flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label htmlFor='username' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                      Profile Photo:
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <div className='max-w-lg flex rounded-md shadow-sm'>
                        <input
                          type='file'
                          name='profile_photo'
                          accept='image/*'
                          onChange={e => onChange(e)}
                          className='flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500 pl-3'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label htmlFor='gender' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                      Gender
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <select
                        id='gender'
                        name='gender'
                        onChange={e => onChange(e)}
                      >
                        <option value={gender}>{'Selecciona tu género'}</option>
                        {
                          gender_option && gender_option.map((gender, index) => (
                            <option key={index} value={gender.name}>{gender.value}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label htmlFor='country' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                      Country
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <select
                        id='country'
                        name='country'
                        onChange={e => onChange(e)}
                      >
                        <option value={country}>{'Selecciona tu País'}</option>
                        {
                          countries && countries.map((country, index) => (
                            <option key={index} value={country.value = country.code}>{country.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label htmlFor='username' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                      Departamento
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <div className='max-w-lg flex rounded-md shadow-sm'>

                        <input
                          type='text'
                          name='departamento'
                          placeholder={`${profile && profile.departamento}`}
                          onChange={e => onChange(e)}
                          value={departamento}
                          required
                          className='flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500 pl-3'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label htmlFor='username' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                      City
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <div className='max-w-lg flex rounded-md shadow-sm'>

                        <input
                          type='text'
                          name='city'
                          placeholder={`${profile && profile.city}`}
                          onChange={e => onChange(e)}
                          value={city}
                          required
                          className='flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500 pl-3'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label htmlFor='username' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                      Postal Code/Zipcode:
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <div className='max-w-lg flex rounded-md shadow-sm'>
                        <input
                          type='text'
                          name='zipcode'
                          placeholder={`${profile && profile.zipcode}`}
                          onChange={e => onChange(e)}
                          value={zipcode}
                          required
                          className='flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500'
                        />
                      </div>
                    </div>
                  </div>

                  {(loading === 'pending') ? <button
                    className='inline-flex mt-4 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    <Oval
                      width={20}
                      height={20}
                      color='#fff'
                    />
                  </button> : <button
                    type='submit'
                    className='inline-flex mt-4 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Save
                  </button>}

                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default EditProfile
