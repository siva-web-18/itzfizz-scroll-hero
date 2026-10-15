
import { ArrowUpRight } from "lucide-react";

export default function Navigation() {
  return (
    <header className="navigation">
      <a href="#home" className="brand" aria-label="Itzfizz home">
        itzfizz<span>.</span>
      </a>

      <div className="nav-center">
        <span className="live-dot" />
        INDEPENDENT DIGITAL STUDIO
      </div>

      <a
        className="nav-cta magnetic-link"
        href="mailto:hello@itzfizz.com"
      >
        LET'S TALK <ArrowUpRight size={15} />
      </a>
    </header>
  );
}
