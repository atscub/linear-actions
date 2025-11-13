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
exports.runCommentCommand = runCommentCommand;
const core = __importStar(require("@actions/core"));
const client_1 = require("../lib/client");
const util_1 = require("../lib/util");
async function runCommentCommand(options) {
    const client = new client_1.LinearClient(options.apiKey);
    const issue = await client.getIssueByKey(options.issueKey);
    if (!issue) {
        throw new Error(`Linear issue ${options.issueKey} not found`);
    }
    if (options.dedupe) {
        const comments = await client.listIssueComments(issue.id);
        if ((0, util_1.hasDuplicateComment)(comments, options.body)) {
            core.info('Comment already exists on Linear issue; skipping.');
            return 'skipped';
        }
    }
    const success = await client.createComment(issue.id, options.body);
    if (!success) {
        throw new Error('Linear API failed to create comment');
    }
    core.info(`Comment posted to Linear issue ${issue.identifier}.`);
    return 'posted';
}
