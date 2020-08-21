const puppeteer = require('puppeteer');
const fs = require('fs');

const user_instagram = 'rbmelolima';

  (
    async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`https://www.instagram.com/${ user_instagram }/`);

      const imgList = await page.evaluate(() => {
        // Toda essa função será executada no browser

        // Pegar imagens que estão na parte de posts
        const nodeList = document.querySelectorAll('article img');

        // Transformar NodeList em array
        const imgArray = [...nodeList];

        // Transformar os nodes (elementos html) em objetos javascript
        const imgList = imgArray.map((img) => ({ src: img.src }));

        // Colocar para fora da função
        return imgList;
      });

      //Escrever os dados em um arquivo local
      fs.writeFile('./server/instagram.json', JSON.stringify(imgList, null, 2), err => {
        if(err) throw new Error('Unexpected error');

        console.info("well done!");
      });

      await browser.close();
    }
  )();