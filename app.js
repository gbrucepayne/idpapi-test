const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3333;
const responses = require('./responses');

let getReturnAttempts = 0;
let submittedMessages = {};

const TIMEOUT = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/info_version.json/', (req, res) => {
  setTimeout(() => res.json(responses.getInfoVersion()), TIMEOUT);
});

app.get('/info_utc_time.json/', (req, res) => {
  res.json(responses.getInfoTime());
});

app.get('/info_errors.json/', (req, res) => {
  res.json(responses.getErrorDefinitions());
});

app.get('/get_return_messages.json/', (req, res) => {
  if (req.query && req.query.access_id && req.query.password) {
    getReturnAttempts += 1;
    if (getReturnAttempts === 1) {
      res.json(responses.getReturnMessages());
    } else {
      res.json(responses.getReturnMessagesMore());
    }
  } else {
    res.json(responses.errReturnMessages('auth'));
  }
});

app.post('/submit_messages.json/', (req, res) => {
  if (req.body && req.body.accessID && req.body.password) {
    if (req.body.messages) {
      let {response, ids} = responses.submitForwardMessages(req.body.messages);
      res.json(response);
      for (let i=0; i < ids.length; i++) {
        submittedMessages[ids[i]] = req.body.messages[i];
      }
      //console.log(`Submitted messages: ${JSON.stringify(submittedMessages)}`);
    } else {
      res.json(responses.errForwardMessages('params'));
    }
  } else {
    res.json(responses.errForwardMessages('auth'));
  }
});

app.get('/get_forward_statuses.json/', (req, res) => {
  if (req.query && req.query.access_id && req.query.password) {
    if (req.query.fwIDs) {
      res.json(responses.getForwardStatuses(req.query.fwIDs));
    } else {
      res.json(responses.errForwardStatuses('params'));
    }
  } else {
    res.json(responses.errForwardStatuses('auth'));
  }
});

app.get('/get_forward_messages.json', (req, res) => {
  if (req.query && req.query.access_id && req.query.password) {
    //console.log(`Received get_forward_messages call for ${JSON.stringify(req.query)}`);
    if (req.query.fwIDs && req.query.fwIDs !== '') {
      res.json(responses.getForwardMessages(req.query.fwIDs, submittedMessages));
    } else {
      res.json(responses.errForwardMessages('params'));
    }
  } else {
    res.json(responses.errForwardMessages('auth'));
  }
});

app.get('/submit_cancelations.json', (req, res) => {
  if (req.query && req.query.access_id && req.query.password) {
    //console.log(`Received submit_cancelations call for ${JSON.stringify(req.query)}`);
    if (req.query.fwIDs && req.query.fwIDs !== '') {
      res.json(responses.submitCancelations(req.query.fwIDs));
    } else {
      res.json(responses.errForwardCancelations('params'));
    }
  } else {
    res.json(responses.errForwardCancelations('auth'));
  }
});

app.get('/get_mobiles_paged.json', (req, res) => {
  if (req.query && req.query.access_id && req.query.password) {
    //console.log(`Received get_mobiles_paged call for ${JSON.stringify(req.query)}`);
    if (req.query) {
      res.json(responses.getMobiles(req.query));
    } else {
      res.json(responses.errMobiles('params'));
    }
  } else {
    res.json(responses.errMobiles('auth'));
  }
});
