import faker from 'faker';
import config from './config';

module.exports = {
  'Edit role': (browser) => {
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
     .click('.nav-wrapper .dms li#more_vert')
     .click('#role')
     .pause(2000)
     .assert.urlContains('manageroles')
     .click('#btn-figurehead')
     .setValue('#role', faker.lorem.word())
     .pause(5000)
     .click('#add-role')
     .pause(5000)
     .end();
  }
};
