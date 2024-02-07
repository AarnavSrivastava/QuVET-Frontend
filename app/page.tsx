import Image from "next/image";
import Greet from './greet'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Greet />
    </main>
  );
}
