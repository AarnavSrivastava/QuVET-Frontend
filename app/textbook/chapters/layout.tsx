import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {
  return (
    <article className="prose flex flex-row justify-center items-center w-screen bg-background">
      {children}
    </article>
  );
}
