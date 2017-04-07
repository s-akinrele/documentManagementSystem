import faker from 'faker';

import config from './config';

module.exports = {
  'Sign up': (browser) => {
    browser
        .url(config.url)
        .assert.containsText('h3', 'DMS')
        .element('css selector', '.signup')
        .click('.signup')
        .moveToElement('.signup', 0, 0)
        .mouseButtonClick(0)
        .pause(10000)
        .setValue('input[name=username]', faker.internet.userName())
        .setValue('input[name=firstname]', faker.name.firstName())
        .setValue('input[name=lastname]', faker.name.lastName())
        .setValue('input[id="em"]', faker.internet.email())
        .setValue('input[id="pd"]', 'password')
        .click('button[id="sub"]')
        .pause(10000)
        .assert.urlContains('dashboard')
        .end();
  }
};
