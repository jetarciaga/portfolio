import sharp from "sharp";

const maxImageDimension = 2000;
const sharpInputOptions = {
  animated: true,
  limitInputPixels: 50_000_000,
} as const;

export async function processImage(input: Buffer): Promise<Buffer> {
  const metadata = await sharp(input, sharpInputOptions).metadata();

  // Animated metadata reports the full frame strip height. Constrain by width
  // alone so a multi-frame GIF is not incorrectly treated as one tall image.
  const resizeOptions =
    metadata.pages && metadata.pages > 1
      ? {
          width: maxImageDimension,
          fit: "inside" as const,
          withoutEnlargement: true,
        }
      : {
          width: maxImageDimension,
          height: maxImageDimension,
          fit: "inside" as const,
          withoutEnlargement: true,
        };

  return sharp(input, sharpInputOptions)
    .rotate()
    .resize(resizeOptions)
    .webp({ quality: 82 })
    .toBuffer();
}
