import Image from "next/image";
import type { PhotoAsset } from "@/lib/data";

type PhotoFrameProps = {
  photo: PhotoAsset;
  className?: string;
  index: string;
  priority?: boolean;
};

export function PhotoFrame({
  photo,
  className = "",
  index,
  priority = false,
}: PhotoFrameProps) {
  return (
    <figure
      className={`photo-frame photo-frame-${photo.aspect} ${className}`.trim()}
    >
      <div className="photo-window">
        {photo.src ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority={priority}
            sizes="(max-width: 700px) 90vw, 40vw"
            style={{ objectPosition: photo.objectPosition ?? "50% 50%" }}
          />
        ) : (
          <div className="photo-placeholder" role="img" aria-label={photo.alt}>
            <span className="placeholder-figure" aria-hidden="true" />
            <span className="placeholder-copy">Photo pending</span>
          </div>
        )}
      </div>
      <figcaption>
        <span>{index}</span>
        <span>{photo.caption}</span>
      </figcaption>
    </figure>
  );
}
