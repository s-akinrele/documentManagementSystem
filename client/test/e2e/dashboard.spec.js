module.exports = {
  '@disabled': true,
  'Dashboard page': (browser) => {
    browser
          .url('http://localhost:5000')
          .waitForElementVisible('body')
          .setValue('input[type=email]', 'akinrelesimi@gmail.com')
          .setValue('input[type=password]', 'password')
          .click('button[type=submit]')
          .pause(1000)
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
