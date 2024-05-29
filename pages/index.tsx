import Link from 'next/link'

export default function Home() {
 
  return (
    <div>
        INdex page
      <ul>
        <li>
          <Link href="/circuit_board">Circuit Board</Link>
        </li>
      </ul>
    </div>
  );
}