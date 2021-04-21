const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser(function(user,done){
    done(null,user)
})

passport.deserializeUser(function(user,done){
    done(null,user)
})

passport.use(
    'google',
    new GoogleStrategy(
        {
            clientID: '570748689448-us112vadq54ouu9o56gc5rm9f430vort.apps.googleusercontent.com',
            clientSecret: 'zR_CoI_3wV6iD-vZe3SOXTDK',
            callbackURL: '/user/login/google/callback'
        },
        function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    ),
);

module.exports = passport