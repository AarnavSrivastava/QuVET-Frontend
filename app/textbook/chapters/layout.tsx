import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {
  return (
    <div className="flex justify-center items-center w-screen">
      <Link href="/textbook" className="top-right">
        <FontAwesomeIcon
          icon={ faCircleArrowLeft }
          style={{ color: "black", fontSize: 25 }}
        />
      </Link>
      <article className="prose p-10 w-screen">
        {children}
      </article>
    </div>
  );
}
