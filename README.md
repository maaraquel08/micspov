# Micspov - Photography Portfolio

Portfolio of my Photography Shots

A modern photography portfolio website built with Next.js 16, Tailwind CSS v4, and TypeScript.

## Features

- Responsive photography gallery with grid layout
- Social media links (Instagram and easily extensible)
- Clean, minimal design focused on showcasing photography
- Optimized images with Next.js Image component
- Support for external image URLs

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

### Adding Your Photos

Edit `src/lib/photos.ts` to add your photography images:

```typescript
export const photos: Photo[] = [
  {
    src: "https://your-image-url.com/image.jpg",
    alt: "Description of your photo",
    title: "Photo Title",
  },
  // Add more photos...
];
```

### Updating Social Links

Edit `src/components/social-links.tsx` to update your social media links:

```typescript
const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://instagram.com/yourusername",
    icon: <Instagram className="w-5 h-5" />,
  },
  // Add more social links...
];
```

## Tech Stack

- **Next.js 16** - React framework with App Router
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Lucide React** - Icon library

## Build

To create a production build:

```bash
npm run build
```

## Deploy

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
