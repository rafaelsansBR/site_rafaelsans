const TOOLS = [
  { name: 'Adobe Photoshop', url: 'https://img.icons8.com/color/48/adobe-photoshop.png' },
  { name: 'Adobe After Effects', url: 'https://img.icons8.com/color/48/adobe-after-effects.png' },
  { name: 'Adobe Illustrator', url: 'https://img.icons8.com/color/48/adobe-illustrator.png' },
  { name: 'Adobe Premiere Pro', url: 'https://img.icons8.com/color/48/adobe-premiere-pro.png' },
  { name: 'Adobe InDesign', url: 'https://img.icons8.com/color/48/adobe-indesign.png' },
  { name: 'Adobe Firefly', url: 'https://img.icons8.com/fluency/48/adobe-firefly.png' },
  { name: 'Blender', url: 'https://img.icons8.com/color/48/blender-3d.png' },
  { name: 'HTML5', url: 'https://img.icons8.com/color/48/html-5.png' },
  { name: 'CSS3', url: 'https://img.icons8.com/color/48/css3.png' },
  { name: 'JavaScript', url: 'https://img.icons8.com/color/48/javascript.png' },
  { name: 'WordPress', url: 'https://img.icons8.com/color/48/wordpress.png' },
  { name: 'ChatGPT', url: 'https://img.icons8.com/fluency/48/chatgpt.png' },
  { name: 'Google Gemini', url: 'https://static.cdnlogo.com/logos/g/50/google-gemini.svg' },
  { name: 'Midjourney', url: 'https://img.icons8.com/fluency/48/midjourney.png' }
];

const SkillsBar = () => {
  return (
    <section className="w-full bg-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-7 gap-y-8 gap-x-2 place-items-center md:flex md:flex-nowrap md:justify-center md:items-center md:gap-5">
          {TOOLS.map((tech) => (
            <div key={tech.name} className="group relative flex-shrink-0 flex items-center justify-center cursor-pointer" title={tech.name}>
              <img
                src={tech.url}
                alt={tech.name}
                loading="lazy"
                width="32"
                height="32"
                className="w-8 h-8 object-contain filter grayscale opacity-40 transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsBar;
