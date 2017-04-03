module.exports = {
  'Go to home page': (browser) => {
    browser
            .url('http://localhost:5000')
            .waitForElementVisible('body')
            .assert.title('DMS')
            .end();
  },
  'Home page': (browser) => {
    browser
        .url('http://localhost:5000')
        .waitForElementVisible('body')
        .expect
        .element('#title').text.to.equal('Document Management System');
  },
  'Home page elements': (browser) => {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body')
      .expect
      .element('#text').text.to.equal('Document Management System helps you to manage your documents in an organized way. You can create a document, edit it and share it with other users.');
  }
};
