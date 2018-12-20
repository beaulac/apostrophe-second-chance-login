var _ = require('lodash');

module.exports = {
  construct: function(self, options) {
    self.cookieName = self.options.cookieName || (self.apos.shortName + '.second_chance_login');
    self.pageNotFound = function(req, callback) {

      if (req.user) {
        return setImmediate(callback);
      }
     
      // The home page is a thing that might require login too
      var homePage = self.apox.prefix + '/';
      var bestSlugSoFar = (req.data.bestPage && req.data.bestPage.slug) || homePage;

      var testReq = self.apos.tasks.getReq();
      testReq.data = {};
      testReq.params = [ req.slug ];

      return self.apos.pages.serveGetPage(testReq, function(err) {
        if (err) {
          return callback(err);
        }
        var bestSlug =  (testReq.data.bestPage && testReq.data.bestPage.slug) || homePage;
        if (bestSlug.length > bestSlugSoFar.length) {
          req.res.cookie(self.cookieName, req.url);
          return req.res.redirect('/login');
        }
        return callback(null);
      });

    };

    self.loginAfterLogin = function(req) {
      if (_.has(req.cookies, self.cookieName)) {
        req.res.clearCookie(self.cookieName);
        req.redirect = req.cookies[self.cookieName];
      }
    };
  }
};
