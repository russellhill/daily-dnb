# daily-dnb
Daily D&amp;B

Generates a random description for a track and chooses a random track from a
Soundcloud account, then constructs these into a tweet and sends it from the
@DailyDose_DnB account.

Use the Soundcloud API and the Twitter API.

## Soundcloud

Connects to the account using the details configured in environment variables,
queries the entire accounts likes and then randomly selects one.

## Twitter

Uses the environment variables to indicate which account to connect to and then
posts the tweet via this account, once constructed.

# Installation

- Ensure you have Node and NPM installed
- Git clone the repo
- Switch into the directory and `npm install` to get the Node modules installed
- Make sure you have a Twitter account where you have created an app and generated the necessary keys and secrets
- Make sure you have a Soundcloud account where you have created an app and generated the necessary keys and secrets
(the Soundcloud Node library being used requires the username and password in order to create an auth token to be
    used on the server)
- Set up the environment variables:

```
export SOUNDCLOUD_CLIENT_ID=<id>
export SOUNDCLOUD_CLIENT_SECRET=<secret>
export SOUNDCLOUD_USERNAME=<username>
export SOUNDCLOUD_PASSWORD=<password>

export TWITTER_ACCESS_TOKEN=<token>
export TWITTER_KEY=<key>
export TWITTER_SECRET=<secret>
export TWITTER_TOKEN_SECRET=<token secret>
```
