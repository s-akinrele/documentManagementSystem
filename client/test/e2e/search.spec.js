import config from './config';

module.exports = {
  Search: (browser) => {
    browser
     .url(config.url)
     .waitForElementVisible('body')
     .setValue('input[type=email]', 'akinrelesimi@gmail.com')
     .setValue('input[type=password]', 'password')
     .click('button[type=submit]')
     .pause(1000)
     .assert.urlContains('dashboard')
     .waitForElementVisible('body')
     .assert.elementPresent('#nav')
     .click('.nav-wrapper .dms .search')
     .setValue('input[id="search"]', 'meal')
     .assert.containsText('#cardpanel', 'meal')
     .pause(2000)
     .end();
  },
    'Invalid search term': (browser) => {
    browser
     .url(config.url)
     .waitForElementVisible('body')
     .setValue('input[type=email]', 'akinrelesimi@gmail.com')
     .setValue('input[type=password]', 'password')
     .click('button[type=submit]')
     .pause(1000)
     .assert.urlContains('dashboard')
     .waitForElementVisible('body')
     .assert.elementPresent('#nav')
     .click('.nav-wrapper .dms .search')
     .setValue('input[id="search"]', 'sssss')
     .waitForElementNotPresent('#cardpanel')
     .pause(2000)
     .end();
  }
};
