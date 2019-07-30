# Trello Page Extract

https://help.github.com/en/articles/creating-a-pull-request-from-a-fork

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses React Material UI (in parts).

The app uses the [`norberteder/trello`](https://github.com/norberteder/trello) API to talk to Trello and, with your own API Key, access token and member ID, extract Trello information for Boards, Lists, Cards and card content.

At the time of first commit, an extension was required to the [`norberteder/trello`](https://github.com/norberteder/trello) API to do some of the extracts.  These functions follow the pattern of all other functions in `main.js`, to add:

```javascript
  Trello.prototype.getAttachmentsOnCard = function (cardId, callback) {
    return makeRequest(rest.get, this.uri + '/1/cards/' + cardId + '/attachments', {query: this.createQuery()}, callback);
  };

  Trello.prototype.getActionsOnCard = function (cardId, callback) {
    return makeRequest(rest.get, this.uri + '/1/card/' + cardId + '/actions', {query: this.createQuery()}, callback);
  };

  Trello.prototype.getCommentsOnCard = function (cardId, callback) {
    var query = this.createQuery();
    Object.assign(query, {'filter': 'commentCard'});
    return makeRequest(rest.get, this.uri + '/1/card/' + cardId + '/actions', {query: query}, callback);
  };
```

If these changes still aren't on the main branch, then instead of doing a `yarn add trello`, clone [`norberteder/trello`](https://github.com/norberteder/trello) to the same parent folder that you've cloned this code to and, use `npm link` (see below) to create a symbolic link to the Trello code.

Link to the amended Trello project you just cloned main.js using [npm link](https://www.deadcoderising.com/how-to-smoothly-develop-node-modules-locally-using-npm-link/)

```shell
  cd trello-page-extract
  npm link ../trello
```

Having created the link, then edit `main.js` to add the code above.

## Running an Extract

### Getting Your Trello API Config Data

Swing on over to [Trello Developers](https://developers.trello.com/docs/api-introduction).

### Setting up API Config

You can either simply run the web app and key in the Trello access information, or (to save rekeying), in the `trello-page-extract/src` folder create a file called `.env.local.json` (this is in `.gitignore`) with the following content:

```json
  {
    "apiKey": "your Trello API Key",
    "token": "your Trello access token",
    "memberId": "your Trello member ID"
  }
```

The above information is used on the API calls via [trello](https://github.com/norberteder/trello) to the Trello API, but otherwise doesn't leave your computer (not by my hand anyway).

### Running the App

Use either `npm start` or `yarn start` to run the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Once your config has loaded or been keyed in, then hit the button and your Trello boards, lists, cards etc should start building at the bottom of the page.

I've not yet handled problems gracefully, so if nothing happens havea look in the browser console.  Hopefull it's a key/token miss-key - correct and try again.

Simply copy and paste to your preferred target (I went to OneNote).

The Trello API throttles access requests - you may see a `429` error, which is the throttling in action.

I've not tested exhaustively whether these need retries or whether that's built into Norberts API.  Also need to consider whether to build a delay into the framework to avoid hitting the throttle in the first place.
