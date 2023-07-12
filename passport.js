const googleAuth = require('passport-google-oauth20').Strategy;
const mongo = require('./db/connect');
const { ObjectId } = require('mongodb');

module.exports = function (passport) {
  passport.use(
    new googleAuth(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if a user with the same googleId already exists in the database
          const existingUser = await mongo
            .getConnection()
            .db('flavor-hub')
            .collection('users')
            .findOne({ googleId: profile.id });

          if (existingUser) {
            // If a user with the same googleId already exists, pass it to the done callback
            done(null, existingUser);
          } else {
            // If no user with the same googleId exists, create a new user object
            const newUser = {
              googleId: profile.id,
              displayName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
            };

            // Insert the new user into the database
            const result = await mongo
              .getConnection()
              .db('flavor-hub')
              .collection('users')
              .insertOne(newUser);

            if (result.acknowledged) {
              const user = await mongo
                .getConnection()
                .db('flavor-hub')
                .collection('users')
                .findOne({ _id: result.insertedId });
              done(null, user);
            } else {
              // Handle the case when acknowledged is false
              const error = new Error('Error inserting user');
              done(error);
            }
          }
        } catch (err) {
          console.log(err);
          done(err);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const db = mongo.getConnection().db('flavor-hub');
      const usersCollection = db.collection('users');
      if (!usersCollection) {
        return done('User collection not found');
      }
      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
      done(null, user || null);
    } catch (err) {
      console.log(err);
      done(err);
    }
  });
};