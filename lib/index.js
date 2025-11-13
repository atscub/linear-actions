"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const comment_1 = require("./commands/comment");
const util_1 = require("./lib/util");
async function run() {
    try {
        const apiKey = core.getInput('api-key', { required: true });
        const issueKey = core.getInput('issue-key', { required: true });
        const body = core.getInput('body', { required: true });
        const dedupeInput = core.getInput('dedupe');
        const commandInput = core.getInput('command');
        const envCommand = process.env.COMMAND;
        const command = (commandInput || envCommand || 'comment').trim().toLowerCase();
        switch (command) {
            case 'comment':
                await (0, comment_1.runCommentCommand)({
                    apiKey,
                    issueKey,
                    body,
                    dedupe: (0, util_1.parseBooleanInput)(dedupeInput, true),
                });
                break;
            default:
                throw new Error(`Unsupported command "${command}". Expected "comment".`);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
            return;
        }
        core.setFailed('Unknown error encountered.');
    }
}
void run();
