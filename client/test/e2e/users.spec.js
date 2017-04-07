import config from './config';

module.exports = {
  Users: (browser) => {
    browser
     .url(config.url)
     .waitForElementVisible('body')
     .setValue('input[type=email]', 'akinrelesimi@gmail.com')
     .setValue('input[type=password]', 'password')
     .click('button[type=submit]')
     .pause(3000)
     .assert.urlContains('dashboard')
     .waitForElementVisible('body')
     .assert.elementPresent('#nav')
     .click('.nav-wrapper .dms li#more_vert')
     .pause(2000)
     .click('#manageusers')
     .pause(2000)
     .assert.urlContains('manageusers')
     .end();
  }
};
