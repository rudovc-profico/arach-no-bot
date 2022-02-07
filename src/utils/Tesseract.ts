import Tesseract from "tesseract.js";
import Jimp from "jimp";

const keyword = /.*[D,d]estiny[T,t]he[G,g]ame.*/;

export const readImage = async (url: string) => {
  const image = await Jimp.read(url);
  for (let i = 0; i < 8; i++) {
    image.rotate(i * 45);

    const imageData = await image.getBufferAsync(Jimp.MIME_PNG);
    const {
      data: { text },
    } = await Tesseract.recognize(imageData, "eng");

    console.log(`Detected text
========================
    ${text}
========================
    in image.`);

    if (keyword.test(text)) {
      return true;
    }
  }

  return false;
};
