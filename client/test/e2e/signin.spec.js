
module.exports = {
  'Login Users': (browser) => {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'akinrelesimi@gmail.com')
      .setValue('input[type=password]', 'password')
      .click('button[type=submit]')
      .pause(1000)
      .assert.urlContains('dashboard')
      .end();
  }
};
