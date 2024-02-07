'use client'

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { FormEvent } from 'react';

export default function Greet() {
  const [greeting, setGreeting] = useState('');

  function onClickGreet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    invoke<string>('greet', { name: formData.get("name") })
      .then(result => setGreeting(result))
      .catch(console.error)
  }

  // Necessary because we will have to use Greet as a component later.
  return (
    <div>
      <form onSubmit={onClickGreet} className="flex flex-row items-center justify-between gap-4">
        <input type="text" name="name" className="bg-gray-800 text-white"/>
        <button type="submit" name="submit" className="flex transition-all duration-300 hover:scale-125 bg-gray-800 hover:text-black hover:bg-red-100 justify-center items-center text-red-100 border-2 rounded-lg border-red-100 shadow-[0_0_2px_#FEE2E2,inset_0_0_2px_#FEE2E2,0_0_5px_#FEE2E2,0_0_15px_#FEE2E2,0_0_30px_#FEE2E2] p-1">Submit</button>
      </form>
      <div className="text-white">{greeting}</div>
    </div>
  )
}