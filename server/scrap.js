const puppeteer = require('puppeteer')
const db = require('./db');


const scrapData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.reuters.com/markets/currencies/', { waitUntil: 'domcontentloaded' });
  
  const scrappedData = await page.evaluate(()=>{
    let title; let link; let time;
    const divLi = document.querySelector('.spacing-container__container__2g5QT > ul > li > div')
    if(divLi.classList.contains('media-story-card__hero__2nvVj')){
      title = document.querySelector('.media-story-card__body__3tRWy > a > span').innerText
      link = document.querySelector('.media-story-card__body__3tRWy > a').href
      time = document.querySelector('.media-story-card__body__3tRWy > time').dateTime
    }else{
      title = document.querySelector('.spacing-container__container__2g5QT > ul > li > div > a').innerText
      link = document.querySelector('.spacing-container__container__2g5QT > ul > li > div > a').href
      time = document.querySelector('.spacing-container__container__2g5QT > ul > li > div > time ').dateTime
    }
    
    
    const obj = {
      title:title,
      link:link,
      time:time
    }
    
    return obj
  })

  await db.query(`TRUNCATE scrap`);
  let sql = `
   INSERT INTO scrap(title,link,time)
   VALUES($1,$2,$3)
   `;
  let params = [scrappedData.title, scrappedData.link, scrappedData.time]

  await db.query(sql, params);

await browser.close()

};


module.exports = scrapData
