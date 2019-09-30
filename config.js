/*
 * Copyright reelyActive 2019
 * We believe in an open Internet of Things
 */


// Begin configurable parameters
// -----------------------------

const ES_NODE = 'http://192.168.1.10:9200';
const LISTEN_TO_REEL = true;
const LISTEN_TO_TCPDUMP = false;
const ENABLE_MIXING = true;
const MIXING_DELAY_MILLISECONDS = 10000;
const INCLUDE_PACKETS = true;

// ---------------------------
// End configurable parameters


module.exports.esNode = ES_NODE;
module.exports.listenToReel = LISTEN_TO_REEL;
module.exports.listenToTcpdump = LISTEN_TO_TCPDUMP;
module.exports.enableMixing = ENABLE_MIXING;
module.exports.mixingDelayMilliseconds = MIXING_DELAY_MILLISECONDS;
module.exports.includePackets = INCLUDE_PACKETS;
