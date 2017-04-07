import config from './config';

module.exports = {
  'Go to home page': (browser) => {
    browser
            .url(config.url)
            .waitForElementVisible('body')
            .assert.title('DMS')
            .end();
  },
  'Home page': (browser) => {
    browser
        .url(config.url)
        .waitForElementVisible('body')
        .expect
        .element('#title').text.to.equal('Document Management System');
  },
  'Home page elements': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .expect
      .element('#text').text.to.equal('Document Management System helps you to manage your documents in an organized way. You can create a document, edit it and share it with other users.');
  }
};
