import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Transition } from '@headlessui/react'
import useCookie from 'react-use-cookie';

import { getActiveNumbers } from './api/sms'
import { Table } from '../components/Table'
import { BuyPhoneModal } from '../components/Modal/BuyPhoneModal'

import Cookies from 'cookies'

import { IncomingMessage, ServerResponse } from 'http';

const accessCookie= 'ktool_access';
const refreshCookie= 'ktool_access';

export async function getServerSideProps({ req, res } : { req: IncomingMessage, res: ServerResponse}) {
  const cookies = new Cookies(req, res)
  const access= cookies.get(accessCookie);
  if(!access){
    return {
      redirect: {
        destination: process.env.LOGINURL + '/accounts/login?use_v2_api=true&client=ktools',
        permanent: false,
      },
    }
  }
  const numbers = await getActiveNumbers();
  // console.log(numbers);
  return {
    props: {
      numbers
    }
  }
}

type Props = {
  numbers: [{ body: string, dateSent: string }]
}

const Home = ({ numbers }: Props) => {
  const [AccessToken, setAccessToken] = useCookie(accessCookie);
  const [RefreshToken, setRefreshToken] = useCookie(refreshCookie);
  const [buyModalOpen, setByModalOpen] = useState(false)

  const logout = () =>{
    setAccessToken('');
    setRefreshToken('');
    window.location.reload();
  }

  return (
    <div className="flex min-h-screen flex-col justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BuyPhoneModal open={buyModalOpen} setOpen={setByModalOpen} />

      <main className="flex w-full m-auto max-w-4xl flex-1 flex-col md:px-8 pt-4">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">OPT Numbers</h1>
              <p className="mt-2 text-sm text-gray-700">
                Please remember to delete associated accounts after use.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                onPointerDown={() => setByModalOpen(true)}
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add phone
              </button>
              <span className='mr-3'></span>
              <button
                onPointerDown={logout}
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <Table data={numbers} />
      </main>
    </div>
  )
}

export default Home

