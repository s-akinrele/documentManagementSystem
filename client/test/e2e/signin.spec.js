import config from './config';

module.exports = {
  'Login Users': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'akinrelesimi@gmail.com')
      .setValue('input[type=password]', 'password')
      .click('button[type=submit]')
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
      .assert.urlEquals(config.url)
      .end();
  }
};
