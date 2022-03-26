import Tesseract from "tesseract.js";
import Jimp from "jimp";

const keyword = /.*[D,d]estiny[T,t]he[G,g]ame.*/;
const angles = [0, 1, 2, 3].flatMap((n) => [n * 2 * 45, (n * 2 + 1) * 45]);

export const readImage = async (url: string): Promise<boolean> => {
  const image = await Jimp.read(url);

  return angles.some(async (angle): Promise<boolean | undefined> => {
    image.rotate(angle);

    const imageData = await image.getBufferAsync(Jimp.MIME_PNG);
    const {
      data: { text },
    }: { data: { text: string } } = await Tesseract.recognize(imageData, "eng");

    console.log(`Detected text
========================
    ${text}
========================
    in image.`);

    if (!keyword.test(text)) {
      return false;
    }

    if (text.includes("@")) {
      return false;
    }

    return true;
  });
};
