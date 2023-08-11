"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronRunner = void 0;
const remove_old_tokens_cron_1 = require("./remove-old-tokens.cron");
const cronRunner = () => {
    remove_old_tokens_cron_1.removeOldTokens.start();
};
exports.cronRunner = cronRunner;
