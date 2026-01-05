'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Upload Your Avatar
          </h1>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              setError(null);
              setUploading(true);

              try {
                if (!inputFileRef.current?.files) {
                  throw new Error("No file selected");
                }

                const file = inputFileRef.current.files[0];

                const response = await fetch(
                  `/api/avatar/upload?filename=${file.name}`,
                  {
                    method: 'POST',
                    body: file,
                  },
                );

                if (!response.ok) {
                  throw new Error('Upload failed');
                }

                const newBlob = (await response.json()) as PutBlobResult;
                setBlob(newBlob);
              } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
              } finally {
                setUploading(false);
              }
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Select an image file
              </label>
              <input
                id="file"
                name="file"
                ref={inputFileRef}
                type="file"
                accept="image/jpeg, image/png, image/webp"
                required
                className="block w-full text-sm text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gray-100 file:text-gray-700
                  hover:file:bg-gray-200
                  dark:file:bg-gray-800 dark:file:text-gray-300
                  dark:hover:file:bg-gray-700
                  cursor-pointer"
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full md:w-auto px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {blob && (
            <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Upload Successful!
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Blob URL:
              </p>
              <a
                href={blob.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
              >
                {blob.url}
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

