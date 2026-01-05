"use client";

import Image from "next/image";
import { type Photo } from "@/lib/photos";
import { useState, useEffect, useRef, useCallback, memo } from "react";

const GalleryItem = memo(function GalleryItem({ photo, priority = false }: { photo: Photo; priority?: boolean }) {
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        // Pre-calculate aspect ratio for better layout
        const img = new window.Image();
        img.onload = () => {
            const ratio = img.naturalWidth / img.naturalHeight; // width/height for aspect-ratio CSS
            setAspectRatio(ratio);
            setImageLoaded(true);
        };
        img.onerror = () => {
            // Fallback aspect ratio if image fails to load
            setAspectRatio(4 / 3);
        };
        img.src = photo.src;
    }, [photo.src]);

    return (
        <div
            className="relative w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 group cursor-pointer mb-6 break-inside-avoid"
            style={
                aspectRatio
                    ? { aspectRatio: `${aspectRatio}` }
                    : { minHeight: "200px" }
            }
        >
            {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority={priority}
                    loading={priority ? undefined : "lazy"}
                    className="object-cover transition-all duration-500 ease-out group-hover:scale-110"
                    style={{
                        opacity: imageLoaded ? 1 : 0,
                        transition: 'opacity 0.4s ease-in-out, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>
        </div>
    );
});

interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
    totalPages: number;
}

export function Gallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationInfo | null>(null);
    const observerTarget = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const currentPage = useRef(1);
    const scrollPositionRef = useRef<number>(0);

    const fetchPhotos = useCallback(async (page: number, append = false) => {
        try {
            // Save scroll position before appending new items
            if (append && galleryRef.current) {
                scrollPositionRef.current = window.scrollY;
            }

            const response = await fetch(`/api/photos?page=${page}&limit=7`, {
                cache: 'force-cache', // Use cached responses when available
            });
            
            if (!response.ok) {
                throw new Error("Failed to fetch photos");
            }
            
            const data = await response.json();
            
            if (append) {
                // Use functional update to ensure we're working with latest state
                setPhotos((prev) => {
                    // Prevent duplicates
                    const existingUrls = new Set(prev.map(p => p.src));
                    const newPhotos = data.photos.filter((p: Photo) => !existingUrls.has(p.src));
                    return [...prev, ...newPhotos];
                });
            } else {
                setPhotos(data.photos);
            }
            
            setPagination(data.pagination);
            currentPage.current = page;

            // Restore scroll position after layout update
            if (append) {
                // Use requestAnimationFrame to ensure DOM has updated
                requestAnimationFrame(() => {
                    window.scrollTo({
                        top: scrollPositionRef.current,
                        behavior: 'auto', // Instant scroll to prevent jump
                    });
                });
            }
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "An error occurred"
            );
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    useEffect(() => {
        // Initial load
        fetchPhotos(1, false);
    }, [fetchPhotos]);

    useEffect(() => {
        // Infinite scroll observer
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && pagination?.hasMore && !loadingMore) {
                    setLoadingMore(true);
                    fetchPhotos(currentPage.current + 1, true);
                }
            },
            { threshold: 0.1, rootMargin: '100px' } // Start loading 100px before reaching the bottom
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [pagination?.hasMore, loadingMore, fetchPhotos]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-gray-100 rounded-full animate-spin" />
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Loading photos...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            </div>
        );
    }

    if (photos.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                    No photos found in hobbies folder.
                </p>
            </div>
        );
    }

    return (
        <>
            <div
                ref={galleryRef}
                className="columns-1 md:columns-2 lg:columns-3 gap-6"
                style={{ 
                    columnGap: "24px",
                    columnFill: "balance", // Balance items across columns for proper multi-column layout
                }}
            >
                {photos.map((photo: Photo, index: number) => {
                    // Use a stable key that doesn't change when new items are added
                    const stableKey = photo.src.split('/').pop() || photo.src;
                    return (
                        <GalleryItem 
                            key={stableKey} 
                            photo={photo} 
                            priority={index < 3} // Priority load first 3 images
                        />
                    );
                })}
            </div>
            
            {/* Infinite scroll trigger - placed outside columns to prevent reshuffling */}
            {pagination?.hasMore && (
                <div ref={observerTarget} className="flex items-center justify-center py-8">
                    {loadingMore && (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-gray-100 rounded-full animate-spin" />
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Loading more...
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
