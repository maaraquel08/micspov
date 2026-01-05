import Link from "next/link";
import Image from "next/image";
import { ContactPopover } from "./contact-popover";

const socialLinks = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/micspov/",
        image: "/images/instagram.png",
    },
    {
        name: "Threads",
        url: "https://www.threads.com/@micspov",
        image: "/images/threads.png",
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com/@micspov",
        image: "/images/tik-tok.png",
    },
];

export function Navigation() {
    return (
        <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link
                        href="/"
                        className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                    >
                        micspov
                    </Link>
                    <div className="flex items-center gap-2 md:gap-6">
                        <div className="flex items-center gap-2 md:gap-4 border-r border-gray-200 dark:border-gray-800 pr-2 md:pr-6">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                                    aria-label={link.name}
                                >
                                    <Image
                                        src={link.image}
                                        alt={link.name}
                                        width={20}
                                        height={20}
                                        className="w-4 h-4 md:w-5 md:h-5"
                                    />
                                </a>
                            ))}
                        </div>
                        <ContactPopover />
                        <Link
                            href="#book-now"
                            className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
