import config from './config';

module.exports = {
  'Dashboard page': (browser) => {
    browser
          .url(config.url)
          .waitForElementVisible('body')
          .setValue('input[type=email]', 'akinrelesimi@gmail.com')
          .setValue('input[type=password]', 'password')
          .click('button[type=submit]')
            .assert.urlContains('dashboard')
            .waitForElementVisible('body')
            .assert.title('DMS')
            .assert.elementPresent('#nav')
            .assert.cssProperty('#nav', 'background-color', 'rgba(158, 63, 63, 1)')
            .assert.cssClassPresent('#main', 'container')
            .assert.elementPresent('#createdocument')
            .end();
  },
};
