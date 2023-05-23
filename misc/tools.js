'use strict';

const { MTG_PLAYER_TYPE, VAPID_PRIVATE_KEY, VAPID_PUBLIC_KEY } = require("./const");
const { makeId } = require("./util");

module.exports = {
    MTG_PLAYER_TYPE,
    VAPID_PRIVATE_KEY,
    VAPID_PUBLIC_KEY,
    makeId
}