import { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';

const VideoCarousel = ({ items }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperContainer = swiperRef.current;
    if (!swiperContainer || swiperContainer.swiper) return;

    const params = {
      slidesPerView: 1.2,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      breakpoints: {
        640: {
          slidesPerView: 2.2,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
      injectStyles: [
        `
        .swiper {
            padding: 0;
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            height: auto;
            display: flex;
            align-items: stretch;
        }
        `
      ],
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  const handlePrev = () => {
    swiperRef.current?.swiper?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.swiper?.slideNext();
  };

  return (
    <div className="w-full flex items-stretch justify-center h-auto">
      <div
        onClick={handlePrev}
        className="hidden lg:flex w-[80px] bg-accent items-center justify-center cursor-pointer hover:bg-[#2980b9] transition-colors duration-300 z-10 flex-shrink-0 mr-6 rounded-lg"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      <div className="flex-1 w-full min-w-0 bg-black overflow-hidden relative">
        <swiper-container ref={swiperRef} init="false">
          {items.map((item, index) => (
            <swiper-slide key={item.id}>
              <ProjectCard project={item} index={index} isCarousel={true} />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>

      <div
        onClick={handleNext}
        className="hidden lg:flex w-[80px] bg-accent items-center justify-center cursor-pointer hover:bg-[#2980b9] transition-colors duration-300 z-10 flex-shrink-0 ml-6 rounded-lg"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default VideoCarousel;
