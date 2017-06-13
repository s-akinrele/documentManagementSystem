import config from './config';

module.exports = {
  Search: (browser) => {
    browser
     .url(config.url)
     .waitForElementVisible('body')
     .setValue('input[type=email]', 'akinrelesimi@gmail.com')
     .setValue('input[type=password]', 'password')
     .click('button[type=submit]')
     .assert.urlContains('dashboard')
     .waitForElementVisible('body')
     .assert.elementPresent('#nav')
     .click('.nav-wrapper .dms .search')
     .setValue('input[id="search"]', 'meal')
     .assert.containsText('#cardpanel', 'meal')
     .end();
  },
  'Invalid search term': (browser) => {
    browser
     .url(config.url)
     .waitForElementVisible('body')
     .setValue('input[type=email]', 'akinrelesimi@gmail.com')
     .setValue('input[type=password]', 'password')
     .click('button[type=submit]')
     .assert.urlContains('dashboard')
     .waitForElementVisible('body')
     .assert.elementPresent('#nav')
     .click('.nav-wrapper .dms .search')
     .setValue('input[id="search"]', 'sssss')
     .waitForElementNotPresent('#cardpanel')
     .end();
  }
};
