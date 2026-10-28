// About values the PHP API does not send. The mapper reads them from here instead of hard-coding them.
// ponytail: the API has no Legacy button, so its label and link stay here until the client supplies them.
export const ABOUT_LABELS = {
  LEGACY_CTA: { label: "Hear The Story!", href: "#" },
};

// The API sends one video for the info block; the section also supports an image.
export const ABOUT_INFO_MEDIA = "video";
