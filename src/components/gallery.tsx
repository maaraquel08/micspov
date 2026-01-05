"use client";

import Image from "next/image";
import { photos, type Photo } from "@/lib/photos";
import { useState, useEffect } from "react";

function GalleryItem({ photo }: { photo: Photo }) {
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);

    useEffect(() => {
        const img = new window.Image();
        img.onload = () => {
            const ratio = img.naturalHeight / img.naturalWidth;
            setAspectRatio(ratio);
        };
        img.src = photo.src;
    }, [photo.src]);

    return (
        <div
            className="relative w-full overflow-hidden rounded-lg bg-gray-100 group cursor-pointer mb-6 break-inside-avoid"
            style={
                aspectRatio
                    ? { aspectRatio: `${1 / aspectRatio}` }
                    : { minHeight: "200px" }
            }
        >
            <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
        </div>
    );
}

export function Gallery() {
    return (
        <div
            className="columns-1 md:columns-2 lg:columns-3 gap-6"
            style={{ columnGap: "24px" }}
        >
            {photos.map((photo: Photo, index: number) => (
                <GalleryItem key={index} photo={photo} />
            ))}
        </div>
    );
}
