const {Builder, By, Key, until} = require('selenium-webdriver');
require('dotenv').config();

describe("", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
  });
  
  afterAll(async () => {
    await driver.quit();
  });

  const setDelay = async () => {
    await driver.sleep(1000);
  };

  it('should open homepage - and check the title is "Home"', async () => {
    await driver.get(process.env.url);
    await driver.getTitle().then(title => {
      expect(title).toEqual('Home');
    });
  });

  it('should open contact page - and check the title is "Contact Us"', async () => {
    await driver.get(process.env.url + '/contact');
    await driver.getTitle().then(title => {
      expect(title).toEqual('Contact Us');
    });
  });

  it('should sign up for more info by email - and check the message is ----More info coming to---- and then the email address entered', async () => {
    const email = 'test@example.com';
    await driver.get(process.env.url + '/contact');
    await driver.findElement(By.id('formInput')).sendKeys(email);
    await driver.findElement(By.id('formSubmit')).click();
    await setDelay();
    await driver.findElement(By.id('formMessage')).getText().then(text => {
      expect(text).toEqual('More info coming to ' + email);
    });
  });
})