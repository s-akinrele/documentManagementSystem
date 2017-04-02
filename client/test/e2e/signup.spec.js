import faker from 'faker';

module.exports = {
  '@disabled': true,
  'Sign up': (browser) => {
    browser
        .url('http://localhost:5000')
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
  },

  Why: (browser) => {
    browser
      .url('http://localhost:5000')
        .element('css selector', '.info')
        .click('.info')
        .moveToElement('.info', 0, 0)
        .mouseButtonClick(0)
        .assert.containsText('#why', 'We need this information so that you can receive access to the site and its content. Rest assured your information will not be sold, traded, or given to anyone.')
        .end();
  }
};
