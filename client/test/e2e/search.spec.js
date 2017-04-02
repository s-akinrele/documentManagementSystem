
module.exports = {
  '@disabled': true,
  Search: (browser) => {
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
     .click('.nav-wrapper .dms .search')
     .setValue('input[id="search"]', 'meal')
     .assert.containsText('#main', 'meal')
     .pause(2000)
     .end();
  }
};
