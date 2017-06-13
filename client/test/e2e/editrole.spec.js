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
     .assert.urlContains('dashboard')
     .waitForElementVisible('body')
     .assert.elementPresent('#nav')
     .click('.nav-wrapper .dms li#more_vert')
     .click('#role')
     .assert.urlContains('manageroles')
     .click('#btn-figurehead')
     .setValue('#role', faker.lorem.word())
     .click('#add-role')
     .end();
  }
};
