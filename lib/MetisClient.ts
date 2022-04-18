import puppeteer from "puppeteer";

class MetisClient {
  private browser: puppeteer.Browser;

  // selector for the synopsis
  SYNOPSIS = `
    #app > div > div:nth-child(2) > div >
    div > div:nth-child(2) > div.row.mt-4 > div > div:nth-child(2) >
    div:nth-child(2) > div > div > div > div > div
  `;


  private constructor(browser: puppeteer.Browser) {
    this.browser = browser;
  }

  // static factory function to create the class
  static async create(): Promise<MetisClient> {
    // launch the browser in headless mode if in production
    const browser = await puppeteer.launch({
      headless: process.env.NODE_ENV === 'production',
    });

    return new MetisClient(browser);
  }

  async closeBrowser() {
    return await this.browser.close();
  }

  async getUserPage(user: string) {
    // open a new tab
    const userPage = await this.browser.newPage();

    // navigate to the user page, and wait for the page to fully process
    await userPage.goto(`https://redditmetis.com/user/${user}`, {
      waitUntil: "networkidle0",
      timeout: 0,
    })

    // return the page instance
    return userPage;
  }

  async getUserStats(user: string) {
    // get the page
    const page = await this.getUserPage(user);

    const synopsis = await page.$$eval(this.SYNOPSIS, synopsis => {
      return synopsis.map((node, index) => {
        if (index % 2 === 0) return node.textContent;

        return node.textContent?.replace(/#+$/, "").split(/#+/g);
      });
    });

    // close the page
    await page.close();

    return {
      synopsis
    }
  }
}

export default MetisClient;
