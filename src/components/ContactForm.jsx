import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', whatsapp: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('IDLE');

  const handleWhatsAppChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 10) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 6)}-${val.slice(6)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    }
    setFormData({ ...formData, whatsapp: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('SENDING');
    const formspreeUrl = "https://formspree.io/f/mojvglkg";
    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _replyto: formData.email,
          _subject: `Novo Contato: ${formData.subject}`
        })
      });

      if (response.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', whatsapp: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('IDLE'), 5000);
      } else {
        const errorData = await response.json();
        console.error('Erro Formspree:', errorData);
        setStatus('ERROR');
        setTimeout(() => setStatus('IDLE'), 4000);
      }
    } catch (error) {
      console.error('Erro de Rede:', error);
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 4000);
    }
  };

  const labelBase = "absolute left-0 top-6 text-neutral-400 uppercase tracking-widest text-[10px] font-black transition-all duration-300 pointer-events-none";
  const labelFloat = "peer-focus:-top-1 peer-focus:text-accent peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-accent peer-[:not(:placeholder-shown)]:text-[10px]";
  const inputBase = "w-full bg-transparent border-0 border-b border-neutral-300 py-3 pt-6 text-neutral-900 focus:border-accent focus:ring-0 outline-none transition-all duration-300 peer placeholder-transparent rounded-none px-0";

  return (
    <section id="contato" className="pt-4 pb-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.1] text-neutral-800">
          PRONTO PARA COLOCAR SUA <br className="hidden md:block" />
          <span className="text-accent">MARCA EM MOVIMENTO?</span>
        </h2>
        <p className="text-neutral-500 mt-6 text-base md:text-lg font-medium tracking-tight max-w-xl mx-auto">
          Preencha o formulário abaixo ou entre em contato direto pelo WhatsApp.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-12 text-left">
          <div className="grid grid-cols-1 gap-10">
            <div className="relative group">
              <input id="name" name="name" required maxLength={80} type="text" className={inputBase} placeholder=" " value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <label htmlFor="name" className={`${labelBase} ${labelFloat}`}>Nome <span className="text-red-500">*</span></label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative group">
                <input
                  id="whatsapp"
                  name="whatsapp"
                  required
                  type="text"
                  className={inputBase}
                  placeholder=" "
                  value={formData.whatsapp}
                  onChange={handleWhatsAppChange}
                  minLength={14}
                />
                <label htmlFor="whatsapp" className={`${labelBase} ${labelFloat}`}>WhatsApp <span className="text-red-500">*</span></label>
              </div>
              <div className="relative group">
                <input id="email" name="email" type="email" maxLength={100} className={inputBase} placeholder=" " value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <label htmlFor="email" className={`${labelBase} ${labelFloat}`}>E-mail Profissional</label>
              </div>
            </div>

            <div className="relative group">
              <select id="subject" name="subject" required className="w-full bg-transparent border-0 border-b border-neutral-300 py-3 pt-6 text-neutral-900 focus:border-accent focus:ring-0 outline-none transition-all duration-300 peer appearance-none cursor-pointer px-0 rounded-none" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}>
                <option value="" disabled>O que você precisa?</option>
                <option value="Motion Design">Motion Design</option>
                <option value="Identidade Visual / Branding">Identidade Visual / Branding</option>
                <option value="Social Media Design">Social Media Design</option>
                <option value="Design Digital / Web">Design Digital / Web</option>
                <option value="Outros">Outros</option>
              </select>
              <label htmlFor="subject" className="absolute left-0 -top-1 text-accent uppercase tracking-widest text-[10px] font-black">Tipo de Projeto <span className="text-red-500">*</span></label>
            </div>

            <div className="relative group">
              <textarea id="message" name="message" required maxLength={2000} className="w-full bg-transparent border-0 border-b border-neutral-300 py-3 pt-6 text-neutral-900 focus:border-accent focus:ring-0 outline-none transition-all duration-300 peer placeholder-transparent resize-none rounded-none px-0" placeholder=" " style={{ minHeight: '100px' }} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              <label htmlFor="message" className={`${labelBase} ${labelFloat}`}>Sobre o Projeto <span className="text-red-500">*</span></label>
              <div className="flex justify-end mt-2"><span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{formData.message.length} / 2000</span></div>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'SENDING'}
            className="group relative w-full overflow-hidden bg-accent py-7 text-white font-black text-sm uppercase tracking-[0.5em] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(52,152,219,0.3)] active:scale-[0.98] rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-0 group-hover:gap-3 mt-8"
          >
            <span className="relative z-10 transition-all duration-300 whitespace-nowrap">
              {status === 'SENDING' ? 'ENVIANDO...' : status === 'SUCCESS' ? 'MENSAGEM ENVIADA' : status === 'ERROR' ? 'ERRO' : 'ENVIAR MENSAGEM'}
            </span>
            <div className="relative z-10 w-0 h-5 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-center">
              <svg className="w-5 h-5 rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
