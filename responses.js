const errorDefinitions = require('./info_errors.json').errorDefinitions;
const typicalErrors = {
  "auth": 21785,
  "params": 21786,
  "xml": 116,
  "timeout": 12309,
  "unknown": 15
};

function getReturnMessages() {
  let response = {
    ErrorID: 0,
    More: true,
    NextStartUTC: '',
    NextStartID: 3,
    Messages: [
      {
        "ID": 34549540,
        "MessageUTC": "2020-02-10 15:23:49",
        "ReceiveUTC": "2020-02-10 15:23:49",
        "SIN": 0,
        "MobileID": "01459442SKY0EF7",
        "RawPayload": [
            0,
            0,
            3,
            1,
            3,
            3,
            6,
            0,
            1,
            6,
            84,
            0,
            0,
            0,
            0
        ],
        "Payload": {
            "Name": "modemRegistration",
            "SIN": 0,
            "MIN": 0,
            "Fields": [
                {
                    "Name": "hardwareVersion",
                    "Value": "769",
                    "Type": "unsignedint"
                },
                {
                    "Name": "softwareVersion",
                    "Value": "771",
                    "Type": "unsignedint"
                },
                {
                    "Name": "productId",
                    "Value": "6",
                    "Type": "unsignedint"
                },
                {
                    "Name": "wakeupPeriod",
                    "Value": "None",
                    "Type": "enum"
                },
                {
                    "Name": "lastResetReason",
                    "Value": "PowerOn",
                    "Type": "enum"
                },
                {
                    "Name": "virtualCarrierId",
                    "Value": "101",
                    "Type": "unsignedint"
                },
                {
                    "Name": "beam",
                    "Value": "4",
                    "Type": "unsignedint"
                },
                {
                    "Name": "vain",
                    "Value": "0",
                    "Type": "unsignedint"
                },
                {
                    "Name": "reserved",
                    "Value": "0",
                    "Type": "unsignedint"
                },
                {
                    "Name": "operatorTxState",
                    "Value": "0",
                    "Type": "unsignedint"
                },
                {
                    "Name": "userTxState",
                    "Value": "0",
                    "Type": "unsignedint"
                },
                {
                    "Name": "broadcastIdCount",
                    "Value": "0",
                    "Type": "unsignedint"
                }
            ]
        },
        "RegionName": "AMERRB16",
        "OTAMessageSize": 15        
      },
      {
        "ID": 34747532,
        "MessageUTC": "2020-02-14 04:31:38",
        "ReceiveUTC": "2020-02-14 04:31:38",
        "SIN": 0,
        "MobileID": "01459438SKYFEE3",
        "RawPayload": [
            0,
            72,
            1,
            41,
            117,
            172,
            221,
            71,
            125,
            0,
            120,
            1,
            0,
            113,
            15
        ],
        "Payload": {
            "Name": "replyPosition",
            "SIN": 0,
            "MIN": 72,
            "Fields": [
                {
                    "Name": "fixStatus",
                    "Value": "1",
                    "Type": "unsignedint"
                },
                {
                    "Name": "latitude",
                    "Value": "2717100",
                    "Type": "signedint"
                },
                {
                    "Name": "longitude",
                    "Value": "-4550918",
                    "Type": "signedint"
                },
                {
                    "Name": "altitude",
                    "Value": "120",
                    "Type": "signedint"
                },
                {
                    "Name": "speed",
                    "Value": "1",
                    "Type": "unsignedint"
                },
                {
                    "Name": "heading",
                    "Value": "0",
                    "Type": "unsignedint"
                },
                {
                    "Name": "dayOfMonth",
                    "Value": "14",
                    "Type": "unsignedint"
                },
                {
                    "Name": "minuteOfDay",
                    "Value": "271",
                    "Type": "unsignedint"
                }
            ]
        },
        "RegionName": "AMERRB16",
        "OTAMessageSize": 15        
      }
    ]
  };
  return response;
}

function getReturnMessagesMore() {
  let response = {
    ErrorID: 0,
    More: false,
    NextStartUTC: '',
    NextStartID: -1,
    Messages: [
      {
        "ID": 34667407,
        "MessageUTC": "2020-02-12 18:16:53",
        "ReceiveUTC": "2020-02-12 18:16:53",
        "SIN": 0,
        "MobileID": "01459438SKYFEE3",
        "RawPayload": [
            0,
            112,
            0,
            0,
            1,
            12
        ],
        "Payload": {
            "Name": "replyModemPing",
            "SIN": 0,
            "MIN": 112,
            "Fields": [
                {
                    "Name": "requestTime",
                    "Value": "0",
                    "Type": "unsignedint"
                },
                {
                    "Name": "responseTime",
                    "Value": "268",
                    "Type": "unsignedint"
                }
            ]
        },
        "RegionName": "AMERRB16",
        "OTAMessageSize": 6        
      }
    ]
  };
  return response;
}

function errReturnMessages(err) {
  let response = {
    ErrorID: typicalErrors[err] || 15,
    More: false,
    NextStartUTC: "",
    NextStartID: -1,
    Messages: null
  };
}

function submitForwardMessages(messages) {
  let response = {
    SubmitForwardMessages_JResult: {
      ErrorID: 0,
      Submissions: []
    }
  };
  let ids = [];
  for (let m=0; m < messages.length; m++) {
    let id = m;
    ids.push(id);
    let submission = {
      ErrorID: 0,
      ForwardMessageID: id,
      DestinationID: messages[m].DestinationID,
      UserMessageID: messages[m].UserMessageID || '',
      OTAMessageSize: -1,
      StateUTC: '2020-01-01 00:00:00',
      TerminalWakeupPeriod: 'None',
      ScheduledSendUTC: ''
    };
    response.SubmitForwardMessages_JResult.Submissions.push(submission);
  }
  return { response: response, ids: ids };
}

function errForwardMessages(err) {
  let response = {
    ErrorID: typicalErrors[err] || 15,
    Submissions: null
  };
}

function getForwardMessages(ids, submittedMessages) {
  const response = {
    ErrorID: 0,
    Messages: []
  };
  for (let i=0; i < ids.length; i++) {
    let message = {
      DestinationID: submittedMessages[i].DestinationID,
      ID: ids[i],
      CreateUTC: '2020-01-01 00:00:00',
      StatusUTC: '2020-01-01 00:00:00',
      State: i === 0 ? 1 : 0,
      ErrorID: 0,
      IsClosed: i === 0 ? true : false,
      ReferenceNumber: i,
      Payload: submittedMessages[i].Payload || null,
      RawPayload: submittedMessages[i].RawPayload || null
    };
    response.Messages.push(message);
  }
  return response;
}

function getForwardStatuses(ids) {
  ids = ids.split(',');
  let response = {
    ErrorID: 0,
    More: false,
    NextStartUTC: null,
    Statuses: []
  };
  for (let i=0; i < ids.length; i++) {
    let status = {
      ErrorID: 0,
      ForwardMessageID: ids[i],
      IsClosed: i === 0 ? true : false,
      ReferenceNumber: i,
      StateUTC: '2020-01-01 00:00:00',
      State: i === 0 ? 1 : 0
    };
    response.Statuses.push(status);
  }
  return response;
}

function errForwardStatuses(err) {
  let errResponse = {
    ErrorID: typicalErrors[err] || 15,
    More: false,
    NextStartUTC: "",
    Statuses: null
  };
  return errResponse;
}

function submitCancelations(ids) {
  const response = {
    ErrorID: 0,
    Submissions: []
  };
  for (let i=0; i < ids.length; i++) {
    let submission = {
      ErrorID: 0,
      ForwardMessageID: i,
      DestinationID: 'nnnnnnnnMMMaaaa',
      UserMessageID: '',
      OTAMessageSize: 1,
      StateUTC: '',
      TerminalWakeupPeriod: '',
      ScheduledSendUTC: ''
    };
    response.Submissions.push(submission);
  }
  return response;
}

function errForwardCancelations(err) {
  let errResponse = {
    ErrorID: typicalErrors[err] || 15,
    Submissions: null
  };
  return errResponse;
}

function getInfoVersion() {
  const response = "0.0.0.0";
  return response;
}

function getInfoTime() {
  const response = "1970-01-01 00:00:00";
  return response;
}

function getMobiles() {
  const response = {
    ErrorID: 0,
    Mobiles: [
      {
        ID: 'nnnnnnnnMMMMaaaa',
        Description: 'myMobile',
        LastRegistrationUTC: '2020-01-01 00:00:00',
        RegionName: 'SomeRegion'
      }
    ]
  };
  return response;
}

function errMobiles(err) {
  let errResponse = {
    ErrorID: typicalErrors[err] || 15,
    Submissions: null
  };
  return errResponse;
}

function getBroadcastIds() {
  const response = {
    ErrorID: 0,
    BroadcastInfos: [
      {
        ID: 'nnnnnnnnGRPaaaa',
        Description: 'myBroadcast'
      }
    ]
  };
  return response;
}

function getErrorDefinitions() {
  let response = errorDefinitions;
  return response;
}

module.exports = {
  getReturnMessages,
  getReturnMessagesMore,
  errReturnMessages,
  getInfoVersion,
  getInfoTime,
  getErrorDefinitions,
  getBroadcastIds,
  getMobiles,
  errMobiles,
  getForwardMessages,
  getForwardStatuses,
  errForwardStatuses,
  submitForwardMessages,
  errForwardMessages,
  submitCancelations,
  errForwardCancelations,
};