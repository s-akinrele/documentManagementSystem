import faker from 'faker';
import config from './config';

module.exports = {
  'Create Role': (browser) => {
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
     .assert.urlContains('manageroles')
     .click('.red')
     .setValue('input[id="role"]', faker.lorem.word())
     .click('#add-role')
     .pause(1000)
     .end();
  }
};

