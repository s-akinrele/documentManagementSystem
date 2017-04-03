import faker from 'faker';

module.exports = {
  'Create Role': (browser) => {
    browser
     .url('http://localhost:5000')
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
     .pause(2000)
     .end();
  }
};

