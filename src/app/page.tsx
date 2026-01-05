import Image from "next/image";
import { Gallery } from "@/components/gallery";

export default function Home() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
                <div className="mb-12 md:mb-16">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                        <div className="shrink-0">
                            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-800">
                                <Image
                                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
                                    alt="Michael - Profile"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 96px, 128px"
                                />
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Michael
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4">
                                @micspov
                            </p>
                            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
                                I document the quiet process of getting better
                                at life
                            </p>
                        </div>
                    </div>
                </div>

                <Gallery />

                <footer className="mt-16 md:mt-20 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Micspov. All rights
                        reserved.
                    </p>
                </footer>
            </main>
        </div>
    );
}
