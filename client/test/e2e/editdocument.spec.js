import faker from 'faker';


module.exports = {
  '@disabled': true,
  'Edit document': (browser) => {
    browser
     .url('http://localhost:5000')
     .waitForElementVisible('body')
     .setValue('input[type=email]', 'akinrelesimi@gmail.com')
     .setValue('input[type=password]', 'password')
     .click('button[type=submit]')
     .pause(1000)
     .assert.urlContains('dashboard')
     .waitForElementVisible('body')
     .assert.elementPresent('#cardpanel')
     .waitForElementVisible('div[id="cardpanel"]', 10000)
     .element('css selector', '.info')
     .moveToElement('.info', 0, 0)
     .mouseButtonClick(0)
     .element('css selector', '.card-panel span ul ul a')
     .moveToElement('.card-panel span ul ul a', 0, 0)
     .mouseButtonClick(0)
     .waitForElementVisible('div[id="view"]', 10000)
     .click('button[id="edit"]')
     .waitForElementVisible('div[class="modal-content"')
     .pause(5000)
     .execute(`tinyMCE.activeEditor.setContent('${faker.lorem.words()}')`)
     .click('button[id="save"]')
     .end();
  }
};

