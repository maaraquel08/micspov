export interface Photo {
  src: string;
  alt: string;
  title?: string;
}

export const photos: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
    alt: "Photography shot 1",
    title: "Sunset Landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    alt: "Photography shot 2",
    title: "Urban Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "Photography shot 3",
    title: "Mountain Vista",
  },
  {
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
    alt: "Photography shot 4",
    title: "Coastal Scene",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    alt: "Photography shot 5",
    title: "Night Sky",
  },
  {
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
    alt: "Photography shot 6",
    title: "Forest Path",
  },
];

