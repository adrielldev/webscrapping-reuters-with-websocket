const puppeteer = require('puppeteer')
const db = require('./db');


const scrapData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.reuters.com/pf/api/v3/content/fetch/articles-by-section-alias-or-id-v1?query=%7B%22called_from_a_component%22%3Atrue%2C%22fetch_type%22%3A%22section%22%2C%22offset%22%3Anull%2C%22orderby%22%3A%22last_updated_date%3Adesc%22%2C%22section_id%22%3A%22%2Fmarkets%2Fcurrencies%22%2C%22size%22%3A9%2C%22website%22%3A%22reuters%22%7D&d=127&_website=reuters', {
    timeout: 0
  })


  const scrappedData = await page.evaluate(() => {
    const pre = document.querySelector('pre');
    return JSON.parse(pre.textContent);
  })
  const content = {
    title: scrappedData.result['articles'][0].title,
    link: 'https://reuters.com' + scrappedData.result['articles'][0].canonical_url,
    time: scrappedData.result['articles'][0].published_time,
    noticeId: scrappedData.result['articles'][0].id
  }
  let sql = `
   INSERT INTO scrap(title,link,time,noticeId)
   VALUES($1,$2,$3,$4)
   ON CONFLICT (noticeId) DO NOTHING
   `;
  let params = [content.title, content.link, content.time, content.noticeId]

  await db.query(sql, params);

  await browser.close();

};

setInterval(async () => {

  await scrapData()
}, 3000)


module.exports = scrapData
