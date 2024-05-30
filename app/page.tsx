import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-dosis mb-10">Welcome to QuVET!</h1>
      <div className="flex space-x-4 font-nunito">
        <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" href="/textbook">
          Informational Material
        </Link>
        <Link className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700" href="/circuit">
          Circuit Freebuild
        </Link>
      </div>
    </div>
  );
}
