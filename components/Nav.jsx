import Link from "next/link";
import { site } from "@/content/site";

export default function Nav() {
  return (
    <nav className="h-[56px] sticky top-0 z-50 backdrop-blur-md bg-paper/82 border-b border-line/0 hover:border-line/100 transition-colors duration-500">
      <div className="max-w-layout h-full flex items-center justify-between">
        <Link href="/" className="font-bricolage font-bold text-lg hover:text-signal transition-colors group flex items-center">
          <span className="text-signal mr-1 group-hover:ml-1 group-hover:mr-0 transition-all">{"[◧]"}</span> 
          {site.name}
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-sm font-semibold hover:text-signal transition-all">Home</Link>
          <Link href="/work" className="text-sm font-semibold hover:text-signal transition-all">Work</Link>
          <Link href="/services" className="text-sm font-semibold hover:text-signal transition-all">Services</Link>
          <Link href="/about" className="text-sm font-semibold hover:text-signal transition-all">About</Link>
          <Link href="/contact" className="text-sm font-semibold bg-amber text-white px-4 py-1.5 rounded hover:bg-amber/90 transition-colors ml-2">Book a call</Link>
        </div>
      </div>
    </nav>
  );
}
