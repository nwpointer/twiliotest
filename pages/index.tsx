import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

const Home: NextPage = () => {

  const fetchNumber = async () => {
    try {
      const res = await fetch('/api/sms/provission')
      const json = await res.json()
      console.log(json)
      setState(state => (
        // @ts-expect-error
        { ...state, numbers: json.map(r => r.phoneNumber) }
      ))
    } catch {
      console.log('error')
    }

  }

  const [state, setState] = useState({ numbers: [] })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center px-20 text-center">
        <h1 className="text-6xl font-bold mt-32 mb-16">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            ktools
          </a>
        </h1>


        <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded" onClick={fetchNumber}>
          list available numbers
        </button>

        <br />

        {state.numbers.map((number) => {
          return <div key={number}>
            {number}
          </div>
        })}
      </main>
    </div>
  )
}

export default Home
