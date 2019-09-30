/*
 * Copyright reelyActive 2019
 * We believe in an open Internet of Things
 */

'use strict';

const tessel = require('tessel');
const Barnowl = require('barnowl');
const BarnowlReel = require('barnowl-reel');
const BarnowlTcpdump = require('barnowl-tcpdump');
const Raddec = require('raddec');
const { Client } = require('@elastic/elasticsearch');
const config = require('./config');

// Load the configuration parameters
const barnowlOptions = {
    enableMixing: config.enableMixing,
    mixingDelayMilliseconds: config.mixingDelayMilliseconds
};
const raddecOptions = {
    includePackets: config.includePackets
};

// Constants
const REEL_BAUD_RATE = 230400;
const REEL_DECODING_OPTIONS = {
    maxReelLength: 1,
    minPacketLength: 8,
    maxPacketLength: 39
};
const ES_INDEX = 'raddec';
const ES_MAPPING_TYPE = '_doc';

// Create Elasticsearch client
let client = new Client({ node: config.esNode });

// Create barnowl instance with the configuration options
let barnowl = new Barnowl(barnowlOptions);

// Have barnowl listen for reel data, if selected in configuration
if(config.listenToReel) {
  let uart = new tessel.port['A'].UART({ baudrate: REEL_BAUD_RATE });
  barnowl.addListener(BarnowlReel, {}, BarnowlReel.EventListener,
                      { path: uart, decodingOptions: REEL_DECODING_OPTIONS });
}

// Have barnowl listen for tcpdump data, if selected in configuration
if(config.listenToTcpdump) {
  barnowl.addListener(BarnowlTcpdump, {}, BarnowlTcpdump.SpawnListener, {});
}

// Forward the raddec to each target while pulsing the green LED
barnowl.on('raddec', function(raddec) {
  tessel.led[2].on();
  forward(raddec);
  tessel.led[2].off();
});

// Blue LED continuously toggles to indicate program is running
setInterval(function() { tessel.led[3].toggle(); }, 500);


/**
 * Forward the given raddec to Elasticsearch.
 * @param {Raddec} raddec The outbound raddec.
 */
function forward(raddec) {
  let id = raddec.timestamp + '-' + raddec.transmitterId + '-' +
           raddec.transmitterIdType;

  // Create flat raddec and tweak properties for Elasticsearch
  let esRaddec = raddec.toFlattened(raddecOptions);
  esRaddec.timestamp = new Date(esRaddec.timestamp).toISOString();

  let params = {
      index: ES_INDEX,
      type: ES_MAPPING_TYPE,
      id: id,
      body: esRaddec
  };
  client.create(params, {}, function(err, result) {
    if(err) {
      tessel.led[0].on();
      tessel.led[0].off();
    }
  });
}
