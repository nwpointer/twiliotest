import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Transition } from '@headlessui/react'

import { getActiveNumbers } from './api/sms'
import { Table } from '../components/Table'
import { BuyPhoneModal } from '../components/Modal/BuyPhoneModal'

export async function getServerSideProps() {
  const numbers = await getActiveNumbers();
  console.log(numbers);
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

  const [buyModalOpen, setByModalOpen] = useState(false)

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
            </div>
          </div>
        </div>
        <Table data={numbers} />
      </main>
    </div>
  )
}

export default Home

