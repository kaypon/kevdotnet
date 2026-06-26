import { MastheadIdentity } from "./MastheadIdentity";
import type { MastheadRoute } from "./MastheadIdentity";
import { MastheadRail } from "./MastheadRail";

type SiteMastheadProps = {
  current: MastheadRoute;
  descriptor: string;
  railCopy: string;
  railMeta: string;
};

export function SiteMasthead({
  current,
  descriptor,
  railCopy,
  railMeta,
}: SiteMastheadProps) {
  return (
    <header
      className="cover-grid cover-spread site-masthead site-cover-spread"
      aria-label="Kevin van der Poll masthead"
    >
      <div className="cover-main-field">
        <MastheadIdentity current={current} descriptor={descriptor} />
        <p className="cover-subtitle" aria-hidden="true">
          van der Poll
        </p>
      </div>
      <aside className="cover-side-field" aria-label="Issue contents">
        <MastheadRail current={current} copy={railCopy} meta={railMeta} />
      </aside>
    </header>
  );
}
