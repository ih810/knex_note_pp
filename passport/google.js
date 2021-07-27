const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const userQueries = require("../database/userQueries");

const googleConfig = {
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "https://localhost:8080/auth/gmail/callback",
};

function googleCallback(accessToken, refreshToken, profile, done) {
  const user = { username: profile.emails[0].value };
  userQueries
    .getByGmailId(profile.id)
    .then((queryRow) => {
      if (queryRow.length === 0) {
        console.log("creating new user");
        return userQueries
          .postGmail(profile.emails[0].value, profile.id)
          .then((newIds) => {
            console.log("New user", newIds);
            user.id = newIds[0];
            console.log("Posted user:", user);
            return done(null, user);
          })
          .catch((error) => {
            done(error, false, {
              message: "couldn't add user",
            });
          });
      } else {
        user.id = queryRow[0].id;
        return done(null, user);
      }
    })
    .catch((error) => {
      return done(eror, false, {
        message: "Couldn't access database",
      });
    });
}
const google = new GoogleStrategy(googleConfig, googleCallback);
module.exports = { google: google };
