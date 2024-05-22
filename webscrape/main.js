import fs from "fs";
import puppeteer from "puppeteer-core";

const evalData = async () => {
  const getID = (
    await import("https://cdn.jsdelivr.net/npm/uuid-by-string@4.0.0/+esm")
  ).default;

  const k = Array(...document.querySelectorAll(".twister-item__table "));

  return k.map((item) => {
    const text = item.innerText;
    const id = getID(text);
    return { text, id };
  });
};
const connectPage = async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "Z:/Blender/Projects/tongue-twisters/webscrape/mychrome/chrome.exe",
  });

  const page = await browser.newPage();
  return { browser, page };
};
const crawlData = async (page, url) => {
  await page.goto(url);
  const result = await page.evaluate(evalData);
  return result;
};

const { browser, page } = await connectPage();
const scraped_data = [
  ...(await crawlData(page, "https://ivypanda.com/tongue-twisters-hindi")),
  ...(await crawlData(page, "https://ivypanda.com/tongue-twisters-english")),
];
browser.close();

fs.writeFile(
  "src/lib/data.js",
  "export default " + JSON.stringify(scraped_data),
  (err) => {
    if (err) throw err;
  }
);

console.log("scraped data");
