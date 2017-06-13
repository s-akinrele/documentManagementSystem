import config from './config';

module.exports = {
  Users: (browser) => {
    browser
     .url(config.url)
     .waitForElementVisible('body')
     .setValue('input[type=email]', 'akinrelesimi@gmail.com')
     .setValue('input[type=password]', 'password')
     .click('button[type=submit]')
     .assert.urlContains('dashboard')
     .waitForElementVisible('body')
     .assert.elementPresent('#nav')
     .click('.nav-wrapper .dms li#more_vert')
     .click('#manageusers')
     .assert.urlContains('manageusers')
     .end();
  }
};
