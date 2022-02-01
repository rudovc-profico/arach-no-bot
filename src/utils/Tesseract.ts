import Tesseract from "tesseract.js";

const keyword = /.*[D,d]estiny[T,t]he[G,g]ame.*/;

export const readImage = async (url: string) => {
  const {
    data: { text },
  } = await Tesseract.recognize(url, "eng");

  if (keyword.test(text)) {
    return true;
  }

  return false;
};
