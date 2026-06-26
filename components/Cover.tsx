import { cover, pressure, profile } from "@/lib/data";
import { EditorialArtifact } from "./EditorialArtifact";
import { PhotoFrame } from "./PhotoFrame";
import { MastheadIdentity } from "./MastheadIdentity";
import { MastheadRail } from "./MastheadRail";

export function Cover() {
  const [principle, signal, catalog] = cover.artifacts;

  return (
    <main className="cover-page">
      <div className="cover-grid cover-spread" aria-label="Kevin van der Poll editorial cover">
        <div className="cover-main-field">
          <MastheadIdentity current="home" descriptor={cover.descriptor} />
          <p className="cover-subtitle" aria-hidden="true">van der Poll</p>
          <section className="cover-main-column" aria-label="Feature column">
            <PhotoFrame
              photo={cover.photos.environment}
              className="photo-environment"
              index="Field 01"
              priority
            />
            <p className="cover-section-label">Who is Kevin?</p>
            <p className="cover-body-copy">{cover.lede}</p>
            <div className="cover-feature-columns">
              <div className="cover-stack cover-stack-wide">
                <PhotoFrame
                  photo={cover.photos.primary}
                  className="photo-primary"
                  index="Fig. 01"
                />
                <EditorialArtifact artifact={signal} className="artifact-signal" />
              </div>
              <div className="cover-stack cover-stack-narrow">
                <EditorialArtifact artifact={principle} className="artifact-principle" />
                <PhotoFrame
                  photo={cover.photos.tools}
                  className="photo-tools"
                  index="Obj. 02"
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="cover-side-field" aria-label="Scrapbook column">
          <MastheadRail
            current="home"
            copy="Useful systems, strange ideas, and evidence that the thing actually works. Built in Miami and still becoming."
            meta="Kevin van der Poll / 2026"
          />
          <div className="cover-side-column">
            <PhotoFrame
              photo={cover.photos.object}
              className="photo-object"
              index="Obj. 01"
            />
            <blockquote className="cover-pull-quote">
              &ldquo;{pressure.lede}&rdquo;
            </blockquote>
            <PhotoFrame
              photo={cover.photos.secondary}
              className="photo-secondary"
              index="Fig. 02"
            />
            <EditorialArtifact artifact={catalog} className="artifact-catalog" />
            <div className="cover-side-type" aria-hidden="true">
              VAN
            </div>
          </div>
        </aside>

        <div className="cover-footer-line">
          <span>{profile.identity} / {profile.name}</span>
          <span>Ideas → systems → evidence</span>
          <span>Turn the page ↗</span>
        </div>
      </div>
    </main>
  );
}
