import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {
  return (
    <div className="flex justify-center items-center w-screen bg-background">
      <div className="fixed p-10 w-screen">
        <Link href="/textbook/chapters/chapter_1">
          <FontAwesomeIcon
            icon={ faCircleArrowLeft }
            style={{ color: "black", fontSize: 25 }}
          />
        </Link>
      </div>
      <div className="flex flex-col items-start justify-start prose p-10 w-screen">
        {children}
      </div>
    </div>
  );
}