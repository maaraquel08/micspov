import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

// Cache for 1 hour, with CDN caching for better global performance
export const revalidate = 3600;

// Image file extensions to filter
const IMAGE_EXTENSIONS = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".svg",
    ".bmp",
    ".ico",
];
const ITEMS_PER_PAGE = 7;

export async function GET(request: Request): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(
            searchParams.get("limit") || String(ITEMS_PER_PAGE),
            10
        );

        // Get the POV blob token from environment variables (Singapore server)
        const blobToken = process.env.POV_BLOB_READ_WRITE_TOKEN;

        if (!blobToken) {
            throw new Error("POV_BLOB_READ_WRITE_TOKEN is not configured");
        }

        // List all blobs in the "Hobbies" folder from Singapore blob storage
        const { blobs } = await list({
            prefix: "Hobbies/",
            token: blobToken,
        });

        console.log(
            `[SG Blob] Found ${blobs.length} total blobs with prefix 'Hobbies/'`
        );

        // Filter image files
        const imageBlobs = blobs.filter((blob) => {
            const pathname = blob.pathname.toLowerCase();
            return IMAGE_EXTENSIONS.some((ext) => pathname.endsWith(ext));
        });

        console.log(`[SG Blob] Filtered to ${imageBlobs.length} image files`);

        // Calculate pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedBlobs = imageBlobs.slice(startIndex, endIndex);
        const hasMore = endIndex < imageBlobs.length;

        // Transform blob results to Photo format
        const photos = paginatedBlobs.map((blob) => {
            // Extract filename from pathname for alt text
            const filename = blob.pathname.split("/").pop() || "Photo";
            // Remove file extension and format as readable text
            const altText = filename
                .replace(/\.[^/.]+$/, "") // Remove extension
                .replace(/[-_]/g, " ") // Replace dashes/underscores with spaces
                .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize words

            return {
                src: blob.url,
                alt: altText,
                title: altText,
            };
        });

        return NextResponse.json(
            {
                photos,
                pagination: {
                    page,
                    limit,
                    total: imageBlobs.length,
                    hasMore,
                    totalPages: Math.ceil(imageBlobs.length / limit),
                },
            },
            {
                headers: {
                    "Cache-Control":
                        "public, s-maxage=3600, stale-while-revalidate=86400",
                    "CDN-Cache-Control": "public, s-maxage=3600",
                    "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
                },
            }
        );
    } catch (error) {
        console.error("Error fetching photos from Vercel Blob:", error);
        return NextResponse.json(
            {
                error: "Failed to fetch photos",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
