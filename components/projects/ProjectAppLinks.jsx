import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectAppLinks({ links }) {
  if (!links?.length) return null;

  return (
    <div className="project-app-links" role="group" aria-label="Mobile app downloads">
      {links.map(link => (
        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label} <FiArrowUpRight aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
