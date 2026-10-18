const techs: { name: string; color: string; svg: string }[] = [
  {
    name: 'React',
    color: '#61DAFB',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2.2"/><g fill="none" stroke="currentColor" stroke-width="1.2"><ellipse rx="10" ry="4.2" transform="translate(12 12)"/><ellipse rx="10" ry="4.2" transform="translate(12 12) rotate(60)"/><ellipse rx="10" ry="4.2" transform="translate(12 12) rotate(120)"/></g></svg>`,
  },
  {
    name: 'Next.js',
    color: '#fff',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.118-.358.293l-6.9 16.63A.36.36 0 0 0 4.65 17.2h2.016a.36.36 0 0 0 .336-.222l.82-1.98h4.91l.82 1.98a.36.36 0 0 0 .336.222h2.016a.36.36 0 0 0 .336-.477l-6.9-16.63A.36.36 0 0 0 11.572 0zm.13 5.62 1.86 4.48H9.84l1.86-4.48zM18.5 17.2h2.1V6.8h-2.1v10.4z"/></svg>`,
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 1.5h21v21h-21z"/><path fill="#fff" d="M13.2 17.4v-2.1c.7.4 1.5.7 2.5.7 1.1 0 1.6-.4 1.6-1.1 0-.6-.3-.9-1.4-1.3l-1-.3c-1.7-.5-2.8-1.3-2.8-3 0-1.7 1.4-3 3.6-3 1 0 2 .2 2.8.7v2c-.7-.4-1.5-.7-2.5-.7-.9 0-1.4.4-1.4 1 0 .6.4 1 1.4 1.3l1 .3c1.9.5 2.9 1.4 2.9 3.1 0 1.8-1.4 3.1-3.8 3.1-1.1 0-2.2-.3-3-.8zm-6.4-.2h3.6v1.7H3.5v-1.5c1.1-1 2-1.9 2.7-2.7.9-1 1.4-1.7 1.4-2.5 0-.6-.3-1-1-1-.7 0-1.2.3-1.8.9l-1.3-1.4c.9-.9 2.1-1.5 3.5-1.5 2 0 3.3 1.2 3.3 2.9 0 1.1-.6 2-1.8 3.2l-1.7 1.6v.1z"/></svg>`,
  },
  {
    name: 'Node.js',
    color: '#339933',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.85c-.27 0-.55.07-.78.2L3.9 6.2a1.55 1.55 0 0 0-.78 1.35v9.1c0 .55.3 1.07.78 1.35l7.32 4.15c.46.26 1.04.26 1.5 0l7.32-4.15c.48-.28.78-.8.78-1.35v-9.1c0-.55-.3-1.07-.78-1.35L12.78 2.05a1.6 1.6 0 0 0-.78-.2zm0 1.6 6.5 3.7v7.4L12 18.25 5.5 14.55v-7.4L12 3.45z"/><path d="M12 7.2c-1.2 0-2.1.4-2.7 1.1-.5.6-.7 1.4-.7 2.3h1.7c0-.5.1-.9.3-1.1.2-.3.5-.4 1-.4.4 0 .7.1.9.3.2.2.3.5.3.9 0 .4-.1.7-.4 1L10.5 14h1.9l1.3-1.5c.5-.6.8-1.2.8-2 0-.9-.3-1.6-.8-2.1-.6-.5-1.3-.8-2.2-.8z"/></svg>`,
  },
  {
    name: 'Python',
    color: '#3776AB',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1C6.5 1 6.8 3.4 6.8 3.4l.01 2.3h5.3v.7H5.1S2 5.9 2 11.3s2.7 5.1 2.7 5.1h1.6v-2.5s-.1-2.7 2.7-2.7h4.7s2.6.04 2.6-2.5V4.1S16.8 1 12 1zm-2 1.7c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"/><path fill="#FFD43B" d="M12 23c5.5 0 5.2-2.4 5.2-2.4l-.01-2.3h-5.3v-.7h7.01S22 18.1 22 12.7s-2.7-5.1-2.7-5.1h-1.6v2.5s.1 2.7-2.7 2.7H10.3s-2.6-.04-2.6 2.5v4.4S7.2 23 12 23zm2-1.7c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/></svg>`,
  },
  {
    name: 'PostgreSQL',
    color: '#4169E1',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 2.5c-1.2 0-2.3.4-3.2 1.1-.3-.1-.7-.1-1.1-.1-3.3 0-6 2.8-6 6.2 0 .5.1 1 .2 1.5C4.6 12 3 13.9 3 16.2c0 2.8 2.1 5.1 4.8 5.3.3 1.2 1.4 2 2.7 2 1.2 0 2.2-.7 2.6-1.7.4.1.8.2 1.2.2 3.3 0 6-2.8 6-6.2 0-.4 0-.8-.1-1.1.8-.9 1.3-2 1.3-3.3 0-2.7-2.1-4.9-4.8-4.9-.1 0-.1 0-.2 0z"/></svg>`,
  },
  {
    name: 'AWS',
    color: '#FF9900',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.8 17.5c.3.2.7.1.9-.2l.1-.1c1.5-1.4 2.2-3.3 2.2-5.3 0-2.1-.8-4.1-2.3-5.6l-.1-.1c-.2-.3-.6-.3-.9-.1-.3.2-.3.6-.1.9l.1.1c1.2 1.3 1.9 3 1.9 4.8 0 1.7-.6 3.3-1.7 4.6-.2.3-.1.7.2.9z"/><path d="M17.2 17.5c.3-.2.3-.6.1-.9l-.1-.1c-1.1-1.3-1.7-2.9-1.7-4.6 0-1.8.7-3.5 1.9-4.8l.1-.1c.2-.3.1-.7-.1-.9-.3-.2-.7-.1-.9.2l-.1.1c-1.5 1.5-2.3 3.5-2.3 5.6 0 2 .7 3.9 2.2 5.3l.1.1c.2.2.5.3.8.1z"/><path d="M12 19.5c-3.6 0-6.5-3.1-6.5-7s2.9-7 6.5-7 6.5 3.1 6.5 7-2.9 7-6.5 7zm0-12.5c-2.9 0-5.2 2.5-5.2 5.5s2.3 5.5 5.2 5.5 5.2-2.5 5.2-5.5S14.9 7 12 7z"/></svg>`,
  },
  {
    name: 'Docker',
    color: '#2496ED',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.8 10.2h2.1v2.1H4.8zm2.5 0h2.1v2.1H7.3zm2.5 0h2.1v2.1h-2.1zm2.5 0h2.1v2.1h-2.1zM7.3 7.7h2.1v2.1H7.3zm2.5 0h2.1v2.1h-2.1zm2.5 0h2.1v2.1h-2.1zM9.8 5.2h2.1v2.1H9.8zm6.3 6.3c-.1 0-.2 0-.3.1-.6.3-1 .4-1.5.4H3.2c-.1 1.5.2 3 1 4.3.7 1.1 1.8 2 3.1 2.4 1.4.5 2.9.5 4.3 0 1.1-.4 2.1-1.1 2.8-2.1.6-.8 1-1.8 1.2-2.8.7.1 1.4-.1 2-.5.5-.3.9-.8 1.1-1.3h-3.6z"/></svg>`,
  },
  {
    name: 'Kubernetes',
    color: '#326CE5',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5 3.5 6.5v11L12 22.5l8.5-5v-11L12 1.5zm0 2.2 6.5 3.8v7.5L12 19.8l-6.5-3.8V7.5L12 3.7z"/><circle cx="12" cy="12" r="2.5"/></svg>`,
  },
  {
    name: 'GraphQL',
    color: '#E10098',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5 4.5 6.8v10.4L12 21.5l7.5-4.3V6.8L12 2.5zm0 1.8 5.8 3.3v6.8L12 18.7l-5.8-3.3V7.6L12 4.3z"/><circle cx="12" cy="12" r="2"/></svg>`,
  },
  {
    name: 'Tailwind',
    color: '#06B6D4',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3C13.4 11 14.5 12 16.5 12c2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C15.1 7 14 6 12 6zM7 12c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3C8.4 17 9.5 18 11.5 18c2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C10.1 13 9 12 7 12z"/></svg>`,
  },
  {
    name: 'Framer',
    color: '#0055FF',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 2h14v6H12l7 7h-7v7l-7-7V2z"/></svg>`,
  },
];

export default function TechMarquee() {
  const doubled = [...techs, ...techs];

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-[#fbfcfb] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-[#fbfcfb] to-transparent z-10 pointer-events-none" />
      <div className="overflow-hidden py-2">
        <div className="marquee-track gap-5">
          {doubled.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="group tech-logo-chip flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1.5 transition-all duration-400 whitespace-nowrap"
            >
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-400 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: `${tech.color}18`, color: tech.color === '#fff' ? '#0f172a' : tech.color }}
                dangerouslySetInnerHTML={{ __html: tech.svg }}
              />
              <span className="text-sm font-semibold text-slate-800 tracking-tight">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
