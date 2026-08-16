import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Image as ImageIcon } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-3">
      {/* Main Large Image */}
      <div
        className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 shadow-sm group cursor-pointer"
        onClick={() => setIsFullscreen(true)}
      >
        <img
          src={images[activeIndex]}
          alt={`${title} - Photo ${activeIndex + 1}`}
          className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-102"
        />

        {/* Counter Badge */}
        <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{activeIndex + 1} / {images.length} photos réelles</span>
        </div>

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFullscreen(true);
          }}
          className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/60 backdrop-blur-md text-white hover:bg-slate-950/80 transition-colors"
          aria-label="Agrandir les photos"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Carousel Prev/Next Buttons */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-slate-800 hover:bg-white flex items-center justify-center shadow-md transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-slate-800 hover:bg-white flex items-center justify-center shadow-md transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Photo suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 sm:w-24 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                activeIndex === idx ? 'border-amber-500 scale-102 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Miniature ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 animate-in fade-in duration-200"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="w-full max-w-6xl flex items-center justify-between text-white py-2">
            <span className="text-sm font-semibold truncate max-w-md">{title}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">
                {activeIndex + 1} sur {images.length}
              </span>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="p-2 text-white/80 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeIndex]}
              alt={`${title} grand format`}
              className="max-h-[82vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                  aria-label="Précédent"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                  aria-label="Suivant"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="text-xs text-slate-400 py-2">
            Clique n’importe où à l’extérieur pour quitter
          </div>
        </div>
      )}
    </div>
  );
};
