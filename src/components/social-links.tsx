import { Instagram } from "lucide-react";

export interface SocialLink {
    name: string;
    url: string;
    icon: React.ReactNode;
}

// SVG icons for Threads and TikTok
const ThreadsIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12.186 8.302c1.161 0 2.186.49 2.912 1.272l2.933-2.933A7.607 7.607 0 0 0 12.186 3C7.826 3 4.163 5.865 2.8 9.737l3.25 2.458a4.43 4.43 0 0 1 6.136-3.893zm0 0v3.302m0 4.604c-1.161 0-2.186-.49-2.912-1.272l-2.933 2.933A7.607 7.607 0 0 0 12.186 21c4.36 0 8.023-2.865 9.386-6.737l-3.25-2.458a4.43 4.43 0 0 1-6.136 3.893zm0 0V13.604" />
    </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const socialLinks: SocialLink[] = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/micspov/",
        icon: <Instagram className="w-5 h-5" />,
    },
    {
        name: "Threads",
        url: "https://www.threads.com/@micspov",
        icon: <ThreadsIcon className="w-5 h-5" />,
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com/@micspov",
        icon: <TikTokIcon className="w-5 h-5" />,
    },
];

export function SocialLinks() {
    return (
        <div className="flex items-center justify-center gap-6">
            {socialLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                    aria-label={link.name}
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
}
