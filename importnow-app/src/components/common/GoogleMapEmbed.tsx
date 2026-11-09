import { cn } from "@/lib/utils";

const IMPORTNOW_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6119034435546!2d78.52649137591108!3d17.430402901563003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99f816a341f7%3A0x13da0c4dce6e1b73!2sImportNow!5e0!3m2!1sen!2sin!4v1783943682236!5m2!1sen!2sin";

interface GoogleMapEmbedProps {
  className?: string;
  title?: string;
}

export function GoogleMapEmbed({
  className,
  title = "ImportNow office location on Google Maps",
}: GoogleMapEmbedProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl h-[280px]",
        className
      )}
    >
      <iframe
        src={IMPORTNOW_MAP_EMBED_URL}
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title={title}
      />
    </div>
  );
}
