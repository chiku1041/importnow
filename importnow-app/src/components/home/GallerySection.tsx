"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  order: number;
}

// Fallback images if Supabase is not configured or fails to load
const fallbackImages = [
  {
    title: "Factory Visit",
    description: "On-site quality inspection in Shenzhen",
    color: "from-[#0B1F33] to-[#0a1f35]",
  },
  {
    title: "Supplier Meeting",
    description: "Building relationships with manufacturers",
    color: "from-[#1F3A5F] to-[#0B1F33]",
  },
  {
    title: "Quality Check",
    description: "Pre-shipment inspection process",
    color: "from-[#0B1F33] to-[#1F3A5F]",
  },
  {
    title: "Warehouse",
    description: "Organized inventory management",
    color: "from-[#0a1f35] to-[#0B1F33]",
  },
  {
    title: "Team Visit",
    description: "Customer factory tour in Guangzhou",
    color: "from-[#0B1F33] to-[#071823]",
  },
  {
    title: "Product Sourcing",
    description: "Finding the right products for you",
    color: "from-[#1F3A5F] to-[#F5F7FA]",
  },
];

export function GallerySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper function to check if image URL is valid (not a placeholder)
  const isValidImageUrl = (url: string): boolean => {
    if (!url) return false;
    // Filter out placeholder URLs
    if (url.includes('YOUR-IMAGE') || url.includes('your-image')) {
      return false;
    }
    // Check if it's a valid URL
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Fetch images from Supabase
  useEffect(() => {
    const fetchImages = async () => {
      if (!supabase) {
        setUseFallback(true);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('"order"', { ascending: true });

        if (error) {
          console.error('Supabase query error:', error);
          throw error;
        }

        console.log('Fetched gallery images:', data);

        if (data && data.length > 0) {
          // Filter out invalid/placeholder images
          const validImages = data.filter(img => isValidImageUrl(img.image_url));
          
          if (validImages.length > 0) {
            setGalleryImages(validImages);
            setUseFallback(false);
          } else {
            console.log('No valid gallery images found. Using fallback.');
            setUseFallback(true);
          }
        } else {
          console.log('No gallery images found in database. Using fallback.');
          setUseFallback(true);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        setUseFallback(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white section-padding overflow-hidden">
      <div className="container-custom mb-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold text-[#1F2933] mb-4 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Building Trust Through <span className="text-[#0B1F33]">Action</span>
          </h2>
          
          <p
            className={`text-lg text-[#666666] transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Real visits. Real partnerships. Real results.
          </p>
        </div>
      </div>

      {/* Horizontal Scrolling Gallery */}
      <div
        ref={scrollRef}
        className={`flex gap-6 overflow-x-auto gallery-scroll px-4 md:px-8 pb-4 transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="shrink-0 w-72 md:w-80">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 animate-pulse" />
            </div>
          ))
        ) : useFallback ? (
          // Fallback gradient images
          fallbackImages.map((image, index) => (
            <div
              key={index}
              className="shrink-0 w-72 md:w-80 group cursor-pointer"
            >
              <div
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${image.color} shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1`}
              >
                {/* Placeholder Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                      backgroundSize: "16px 16px",
                    }}
                  />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#0B1F33]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))
        ) : (() => {
          // Filter out failed images
          const validImages = galleryImages.filter(image => !failedImages.has(image.id));
          
          // If all images failed, use fallback
          if (validImages.length === 0 && galleryImages.length > 0) {
            return fallbackImages.map((image, index) => (
              <div
                key={`fallback-${index}`}
                className="shrink-0 w-72 md:w-80 group cursor-pointer"
              >
                <div
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${image.color} shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1`}
                >
                  {/* Placeholder Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                        backgroundSize: "16px 16px",
                      }}
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#0B1F33]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ));
          }
          
          // Render valid Supabase images
          return validImages.map((image) => (
            <div
              key={image.id}
              className="shrink-0 w-72 md:w-80 group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <Image
                  src={image.image_url}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 288px, 320px"
                  unoptimized
                  onError={(e) => {
                    // Silently handle image loading errors
                    if (process.env.NODE_ENV === 'development') {
                      console.warn(`Failed to load image: ${image.image_url}`);
                    }
                    setFailedImages(prev => new Set(prev).add(image.id));
                  }}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#0B1F33]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ));
        })()}
      </div>

      {/* Scroll Hint */}
      <div className="container-custom mt-6">
        <p className="text-center text-sm text-[#888888]">
          ← Scroll to see more →
        </p>
      </div>
    </section>
  );
}


