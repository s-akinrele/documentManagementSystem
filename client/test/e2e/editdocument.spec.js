import faker from 'faker';
import config from './config';

module.exports = {
  'Edit document': (browser) => {
    browser
     .url(config.url)
     .waitForElementVisible('body')
     .setValue('input[type=email]', 'akinrelesimi@gmail.com')
     .setValue('input[type=password]', 'password')
     .click('button[type=submit]')
     .pause(1000)
     .assert.urlContains('dashboard')
     .waitForElementVisible('body')
     .assert.elementPresent('#cardpanel')
     .waitForElementVisible('div[id="cardpanel"]', 10000)
    .click('#cardpanel')
     .waitForElementVisible('div[id="view"]', 10000)
     .click('button[id="edit"]')
     .waitForElementVisible('div[class="modal-content"')
     .pause(5000)
     .execute(`tinyMCE.activeEditor.setContent('${faker.lorem.words()}')`)
     .click('button[id="save"]')
     .end();
  }
};

