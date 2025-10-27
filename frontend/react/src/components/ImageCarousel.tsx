import { useEffect, useState } from "react";

type ImageCarouselProps = {
   images: string[];
};

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isTransitioning, setIsTransitioning] = useState(true);

   const nextImage = () => {
      setCurrentIndex((prev) => prev + 1);
   };

   const prevImage = () => {
      setCurrentIndex((prev) => prev - 1);
   };

   useEffect(() => {
      // Forward: reached extra first image (index = images.length)
      if (currentIndex === images.length) {
         setTimeout(() => {
            setIsTransitioning(false);
            setCurrentIndex(0);
            setTimeout(() => setIsTransitioning(true), 50);
         }, 650);
      }
      // Backward: reached extra last image (index = -1)
      else if (currentIndex === -1) {
         setTimeout(() => {
            setIsTransitioning(false);
            setCurrentIndex(images.length - 1);
            setTimeout(() => setIsTransitioning(true), 50);
         }, 650);
      }
   }, [currentIndex, images.length]);

   return (
      <div className="relative w-full mx-auto max-w-5xl aspect-video">
         <div className="relative h-full overflow-hidden rounded-2xl">
            <div
               className="flex h-full"
               style={{
                  transform: `translateX(-${(currentIndex + 1) * 100}%)`,
                  transition: isTransitioning ? 'transform 650ms ease-in-out' : 'none'
               }}
            >
               {/* Extra last image for backward scrolling */}
               <div
                  key="extra-last"
                  className="relative flex-none w-full h-full"
                  style={{ contain: "paint" }}
               >
                  <img
                     src={images[images.length - 1]}
                     loading="eager"
                     decoding="sync"
                     alt="scenic extra last"
                     className="block w-full h-full object-cover will-change-transform"
                  />
               </div>

               {/* Original images */}
               {images.map((url, idx) => (
                  <div
                     key={`original-${idx}`}
                     className="relative flex-none w-full h-full"
                     style={{ contain: "paint" }}
                  >
                     <img
                        src={url}
                        loading="eager"
                        decoding="sync"
                        alt={`scenic ${idx}`}
                        className="block w-full h-full object-cover will-change-transform"
                     />
                  </div>
               ))}

               {/* Extra first image for forward scrolling */}
               <div
                  key="extra-first"
                  className="relative flex-none w-full h-full"
                  style={{ contain: "paint" }}
               >
                  <img
                     src={images[0]}
                     loading="eager"
                     decoding="sync"
                     alt="scenic extra first"
                     className="block w-full h-full object-cover will-change-transform"
                  />
               </div>
            </div>
         </div>

         {/* Previous button */}
         <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
         >
            ‹
         </button>

         {/* Next button */}
         <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
         >
            ›
         </button>
      </div>
   );
};