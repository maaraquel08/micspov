"use client";

import { Mail, Phone } from "lucide-react";
import { useState } from "react";

export function ContactPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-medium"
        aria-label="Contact"
      >
        Contact
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-6 z-50">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Michael Anthony Raquel
          </h3>
          <div className="space-y-4">
            <a
              href="tel:+639616996071"
              className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-gray-700 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-base">+639616996071</span>
            </a>
            <a
              href="mailto:raqanthony.2499@gmail.com"
              className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-gray-700 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-base break-all">raqanthony.2499@gmail.com</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

