"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMENT_CREATE_MUTATION = exports.ISSUE_COMMENTS_QUERY = exports.ISSUE_BY_KEY_QUERY = void 0;
exports.ISSUE_BY_KEY_QUERY = `
  query IssueByKey($key: String!) {
    issue(key: $key) {
      id
      identifier
    }
  }
`;
exports.ISSUE_COMMENTS_QUERY = `
  query IssueComments($id: String!) {
    issue(id: $id) {
      id
      comments {
        nodes {
          id
          body
        }
      }
    }
  }
`;
exports.COMMENT_CREATE_MUTATION = `
  mutation CommentCreate($id: String!, $body: String!) {
    commentCreate(input: { issueId: $id, body: $body }) {
      success
    }
  }
`;
