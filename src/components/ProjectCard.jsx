import { useState } from 'react';

const ProjectCard = ({ project, index, isCarousel = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isLCP = !isCarousel && index === 0;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const imageUrl = project.youtubeId
    ? `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`
    : project.image;

  const handleInteraction = () => {
    if (project.youtubeId && !isPlaying) {
      setIsPlaying(true);
    }
  };

  const getContainerClasses = () => {
    let base = 'project-card group relative overflow-hidden cursor-zoom-in bg-black rounded-lg border border-white/10 ';
    if (isCarousel) {
      return base + 'w-full aspect-[9/16]';
    }
    switch (project.layout) {
      case 'FULL': return base + 'w-full h-auto';
      case 'HALF': return base + 'w-full h-auto';
      case 'QUARTER': return base + 'w-full aspect-[9/16]';
      default: return base + 'w-full h-auto';
    }
  };

  const videoUrl = project.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1&enablejsapi=1&origin=${encodeURIComponent(origin)}`
    : '';

  return (
    <div onClick={handleInteraction} className={getContainerClasses()}>
      <div className="relative w-full h-full">
        {!isPlaying ? (
          <div className="w-full h-full relative">
            <img
              src={imageUrl}
              alt={project.title}
              loading={isLCP ? 'eager' : 'lazy'}
              className={`project-image w-full block transition-all duration-700 ease-out group-hover:scale-105 ${project.layout === 'QUARTER' || isCarousel ? 'h-full object-cover' : 'h-auto'}`}
              fetchPriority={isLCP ? "high" : undefined}
              onError={(e) => {
                if (project.youtubeId && e.target.src.includes('maxresdefault')) {
                  e.target.src = `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;
                }
              }}
            />

            {project.youtubeId && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-500 z-10">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-accent/90 rounded-full flex items-center justify-center pl-1 shadow-[0_0_20px_rgba(52,152,219,0.5)] backdrop-blur-md border border-white/20">
                  <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 z-20 flex flex-row items-center gap-1.5 md:gap-2 pointer-events-none">
              <div className="bg-black/80 backdrop-blur-lg px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 shadow-2xl">
                <h3 className="text-white font-bold text-[8px] md:text-[10px] tracking-tight whitespace-nowrap uppercase">{project.title}</h3>
              </div>
              <div className="bg-accent px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-2xl">
                <p className="text-white font-black text-[6px] md:text-[8px] uppercase tracking-[0.2em] whitespace-nowrap">{project.category}</p>
              </div>
            </div>

            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full z-30 animate-in fade-in duration-500 bg-black">
            <iframe
              src={videoUrl}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
