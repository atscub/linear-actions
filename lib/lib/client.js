"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearClient = void 0;
const gql_1 = require("./gql");
class LinearClient {
    apiKey;
    endpoint;
    constructor(apiKey, endpoint = 'https://api.linear.app/graphql') {
        this.apiKey = apiKey;
        if (!apiKey) {
            throw new Error('Linear API key is required');
        }
        this.endpoint = endpoint;
    }
    async getIssueByKey(key) {
        const data = await this.request(gql_1.ISSUE_BY_KEY_QUERY, { key });
        return data.issue ?? null;
    }
    async listIssueComments(issueId) {
        const data = await this.request(gql_1.ISSUE_COMMENTS_QUERY, { id: issueId });
        return data.issue?.comments.nodes ?? [];
    }
    async createComment(issueId, body) {
        const data = await this.request(gql_1.COMMENT_CREATE_MUTATION, {
            id: issueId,
            body,
        });
        return data.commentCreate.success;
    }
    async request(query, variables) {
        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.apiKey,
            },
            body: JSON.stringify({ query, variables }),
        });
        if (!response.ok) {
            throw new Error(`Linear API request failed with status ${response.status}`);
        }
        const payload = (await response.json());
        if (payload.errors?.length) {
            const message = payload.errors.map((error) => error.message).join('; ');
            throw new Error(`Linear API responded with errors: ${message}`);
        }
        if (!payload.data) {
            throw new Error('Linear API response missing data');
        }
        return payload.data;
    }
}
exports.LinearClient = LinearClient;
