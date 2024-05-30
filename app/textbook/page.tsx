import Link from 'next/link';

export default function Home() {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen py-10">
        <h1 className="text-4xl font-dosis mb-10">Textbook</h1>
        <div className="flex flex-col gap-10 font-nunito">
          <Link className="p-10 w-full h-10 flex justify-center items-center bg-primary text-white rounded hover:bg-green-700" href="/textbook/chapters/chapter_1">
            Chapter 1
          </Link>
          <Link className="p-10 w-full h-10 flex justify-center items-center bg-primary text-white rounded hover:bg-green-700" href="/circuit">
            Chapter 2
          </Link>
          <Link className="p-10 w-full h-10 flex justify-center items-center bg-primary text-white rounded hover:bg-green-700" href="/">
            Home
          </Link>
        </div>
      </div>
    );
  }