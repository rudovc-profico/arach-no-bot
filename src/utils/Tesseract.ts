import Tesseract from "tesseract.js";

const keyword = /[D,d]estiny[T,t]he[G,g]ame/;

export const readImage = (url: string) => {
  Tesseract.recognize(url, "eng", {
    logger: (message) => console.log(message),
  }).then(({ data: { text } }) => {
    console.log(`Detected text ${text}`);

    if (keyword.test(text)) {
      return true;
    }

    return false;
  });
};
