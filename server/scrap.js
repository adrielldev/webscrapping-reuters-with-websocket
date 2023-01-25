const puppeteer = require('puppeteer')
const db = require('./db');


const scrapData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.reuters.com/markets/currencies/', { waitUntil: 'domcontentloaded' });
  
  const scrappedData = await page.evaluate(()=>{
    
    const title = document.querySelector('.media-story-card__body__3tRWy > a > span').innerText
    const link = document.querySelector('.media-story-card__body__3tRWy > a').href
    const time = document.querySelector('.media-story-card__body__3tRWy >  time').dateTime
    const obj = {
      title:title,
      link:link,
      time:time
    }
    return obj
  })
  let sql = `
   INSERT INTO scrap(title,link,time)
   VALUES($1,$2,$3)
   ON CONFLICT (link) DO NOTHING
   `;
  let params = [scrappedData.title, scrappedData.link, scrappedData.time]

  await db.query(sql, params);

  await browser.close();

};

module.exports = scrapData
