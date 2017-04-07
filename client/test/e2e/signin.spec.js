import config from './config';

module.exports = {
  'Login Users': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'akinrelesimi@gmail.com')
      .setValue('input[type=password]', 'password')
      .click('button[type=submit]')
      .pause(1000)
      .assert.urlContains('dashboard')
      .end();
  },
  'Invalid user': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'sese@gmail.com')
      .setValue('input[type=password]', 'password')
      .click('button[type=submit]')
      .pause(1000)
      .assert.urlEquals(config.url)
      .end();
  }
};
