import ProjectCard from './ProjectCard';
import VideoCarousel from './VideoCarousel';

const ALL_PROJECTS = [
  { id: '01', title: 'Site Institucional Mirex-S', category: 'Web Design', image: '/assets/images/projetos/01.webp', layout: 'FULL' },
  { id: '02', title: 'Folder Mirex-XD', category: 'Design Gráfico', image: '/assets/images/projetos/02.webp', layout: 'HALF' },
  { id: '03', title: 'Painel de Chão Mirex-XD', category: 'Design Gráfico', image: '/assets/images/projetos/03.webp', layout: 'HALF' },
  { id: '04', title: 'Posts Redes Sociais Mirex-S', category: 'Social Media', image: '/assets/images/projetos/04.webp', layout: 'FULL' },
  { id: '05', title: 'Anúncio Revista Mirex-S 01', category: 'Design Gráfico', image: '/assets/images/projetos/05.webp', layout: 'HALF' },
  { id: '06', title: 'Anúncio Revista Mirex-S 02', category: 'Design Gráfico', image: '/assets/images/projetos/06.webp', layout: 'HALF' },
  { id: '07', title: 'Site Institucional Agência MCA', category: 'Web Design', image: '/assets/images/projetos/07.webp', layout: 'FULL' },
  { id: '08', title: 'Identidade Visual Agência MCA', category: 'Branding', image: '/assets/images/projetos/08.webp', layout: 'FULL' },
  { id: 'v1', title: 'Campo Forte Reels 01', category: 'MOTION', youtubeId: 'KeKEFS4wmDE', layout: 'QUARTER' },
  { id: 'v2', title: 'Campo Forte Reels 02', category: 'MOTION', youtubeId: 'cncCIZcX5jA', layout: 'QUARTER' },
  { id: 'v3', title: 'Campo Forte Reels 03', category: 'MOTION', youtubeId: '2AyCAndG77I', layout: 'QUARTER' },
  { id: 'v4', title: 'Campo Forte Reels 04', category: 'MOTION', youtubeId: '9R9qLNEdAX4', layout: 'QUARTER' },
  { id: '09', title: 'Banner Campo Forte', category: 'Design Gráfico', image: '/assets/images/projetos/09.webp', layout: 'HALF' },
  { id: '10', title: 'Banners de Chão Campo Forte', category: 'Design Gráfico', image: '/assets/images/projetos/10.webp', layout: 'HALF' },
  { id: 'v5', title: 'Campo Forte Reels 05', category: 'MOTION', youtubeId: 'GlfrROkULBE', layout: 'QUARTER' },
  { id: 'v6', title: 'Campo Forte Reels 06', category: 'MOTION', youtubeId: 'aBZYIkNPJds', layout: 'QUARTER' },
  { id: 'v7', title: 'Campo Forte Reels 07', category: 'MOTION', youtubeId: 'OmSRv-3_Ffw', layout: 'QUARTER' },
  { id: 'v8', title: 'Campo Forte Reels 08', category: 'MOTION', youtubeId: '-D_HXB-77j8', layout: 'QUARTER' },
  { id: '11', title: 'Posts Redes Sociais Campo Forte', category: 'Social Media', image: '/assets/images/projetos/11.webp', layout: 'FULL' },
  { id: '12', title: 'Anúncio Revista Campo Forte 01', category: 'Design Gráfico', image: '/assets/images/projetos/12.webp', layout: 'HALF' },
  { id: '13', title: 'Anúncio Revista Campo Forte 02', category: 'Design Gráfico', image: '/assets/images/projetos/13.webp', layout: 'HALF' },
  { id: 'v9', title: 'Campo Forte Reels 09', category: 'MOTION', youtubeId: 'v7m4hyhKvkc', layout: 'QUARTER' },
  { id: 'v10', title: 'Campo Forte Reels 10', category: 'MOTION', youtubeId: 'nmamNduQA4U', layout: 'QUARTER' },
  { id: 'v11', title: 'Campo Forte Reels 11', category: 'MOTION', youtubeId: 'ku8xm1kyQKY', layout: 'QUARTER' },
  { id: 'v12', title: 'Campo Forte Reels 12', category: 'MOTION', youtubeId: '79Pa7_UzvkI', layout: 'QUARTER' },
  { id: '14', title: 'Anúncio Jornal NPV', category: 'Design Gráfico', image: '/assets/images/projetos/14.webp', layout: 'FULL' },
  { id: '15', title: 'Banners de Chão NPV', category: 'Design Gráfico', image: '/assets/images/projetos/15.webp', layout: 'HALF' },
  { id: '16', title: 'Email Marketing NPV', category: 'Web Design', image: '/assets/images/projetos/16.webp', layout: 'HALF' },
  { id: '17', title: 'Posts Redes Sociais NPV', category: 'Social Media', image: '/assets/images/projetos/17.webp', layout: 'FULL' },
  { id: 'v13', title: 'Reels NPV', category: 'MOTION', youtubeId: 'bmzu2RoG3nc', layout: 'QUARTER' },
  { id: 'v14', title: 'Reels NPV', category: 'MOTION', youtubeId: 'oA0h843US9g', layout: 'QUARTER' },
  { id: 'v15', title: 'Reels NPV', category: 'MOTION', youtubeId: 'iXer3E4XdgU', layout: 'QUARTER' },
  { id: 'v16', title: 'Reels Biomarketing', category: 'MOTION', youtubeId: '-6REB-Ynk9Y', layout: 'QUARTER' },
  { id: '18', title: 'Painel Estande Oligo Basics 01', category: 'PDV', image: '/assets/images/projetos/18.webp', layout: 'HALF' },
  { id: '19', title: 'Painel Estande Oligo Basics 02', category: 'PDV', image: '/assets/images/projetos/19.webp', layout: 'HALF' },
  { id: '20', title: 'Posts Redes Sociais Oligo Basics', category: 'Social Media', image: '/assets/images/projetos/20.webp', layout: 'FULL' },
  { id: '21', title: 'Anúncio Jornal Serasa Experian', category: 'Design Gráfico', image: '/assets/images/projetos/21.webp', layout: 'HALF' },
  { id: '22', title: 'Flyers São Martinho', category: 'Design Gráfico', image: '/assets/images/projetos/22.webp', layout: 'HALF' },
  { id: '23', title: 'Posts Redes Sociais Tide Brasil', category: 'Social Media', image: '/assets/images/projetos/23.webp', layout: 'FULL' },
];

const CAROUSEL_1_IDS = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8'];
const CAROUSEL_2_IDS = ['v9', 'v10', 'v11', 'v12', 'v13', 'v14', 'v15', 'v16'];
const CAROUSEL_1_ITEMS = ALL_PROJECTS.filter(p => CAROUSEL_1_IDS.includes(p.id));
const CAROUSEL_2_ITEMS = ALL_PROJECTS.filter(p => CAROUSEL_2_IDS.includes(p.id));
const STATIC_PROJECTS = ALL_PROJECTS.filter(p => !CAROUSEL_1_IDS.includes(p.id) && !CAROUSEL_2_IDS.includes(p.id));

const ProjectGrid = () => {
  const renderStaticSlice = (projects) => {
    const rows = [];
    let i = 0;
    while (i < projects.length) {
      const current = projects[i];
      if (current.layout === 'FULL') {
        rows.push(
          <div key={`row-${current.id}`} className="grid grid-cols-1 gap-6">
            <ProjectCard project={current} index={i} />
          </div>
        );
        i++;
      } else if (current.layout === 'HALF') {
        if (i + 1 < projects.length && projects[i + 1].layout === 'HALF') {
          const items = projects.slice(i, i + 2);
          rows.push(
            <div key={`row-${current.id}`} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, idx) => (
                <ProjectCard key={item.id} project={item} index={i + idx} />
              ))}
            </div>
          );
          i += 2;
        } else {
          rows.push(
            <div key={`row-${current.id}`} className="grid grid-cols-1 gap-6">
              <ProjectCard project={current} index={i} />
            </div>
          );
          i++;
        }
      } else {
        rows.push(
          <div key={`row-${current.id}`} className="grid grid-cols-1 gap-6">
            <ProjectCard project={current} index={i} />
          </div>
        );
        i++;
      }
    }
    return rows;
  };

  const section1 = STATIC_PROJECTS.filter(p => ['01', '02', '03', '04', '05', '06', '07', '08'].includes(p.id));
  const section2 = STATIC_PROJECTS.filter(p => ['09', '10', '11', '12', '13'].includes(p.id));
  const section3 = STATIC_PROJECTS.filter(p => !['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'].includes(p.id));

  return (
    <section id="portfolio" className="py-8 bg-black">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6 px-6 xl:px-0">
        {renderStaticSlice(section1)}
        <VideoCarousel key="carousel-1" items={CAROUSEL_1_ITEMS} />
        {renderStaticSlice(section2)}
        <VideoCarousel key="carousel-2" items={CAROUSEL_2_ITEMS} />
        {renderStaticSlice(section3)}
      </div>
    </section>
  );
};

export default ProjectGrid;
