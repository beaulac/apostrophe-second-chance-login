# apostrophe-second-chance-login

If a user attempts to access a page that is a 404 for them, but would work for an admin, this module notes the URL in a cookie and redirects them to the login page. After successfully logging in, they are taken to the page.

## Warnings

There is a chance they will still get a 404 not found error, as their account might or might not have sufficient privileges. In this case we show them a simple 404 and do not disclose extra information they should not have.

This module adds a performance hit to all 404 not found errors, so use it thoughtfully.

## Limitations

Currently this module only understands pages. If the user gets a 404 due to permissions applied to a piece, this module currently cannot assist. A better implementation would probably carry out a complete request with an admin `req`, however this requires a more sophisticated fake `res` object than we have handy at the moment. And it also has an even greater performance overhead. So then again, maybe not.

## Stability

This module is currently beta stability but is seeing successful production use.
