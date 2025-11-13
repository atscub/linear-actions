export const ISSUE_BY_KEY_QUERY = /* GraphQL */ `
  query IssueByKey($key: String!) {
    issue(key: $key) {
      id
      identifier
    }
  }
`;

export const ISSUE_COMMENTS_QUERY = /* GraphQL */ `
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

export const COMMENT_CREATE_MUTATION = /* GraphQL */ `
  mutation CommentCreate($id: String!, $body: String!) {
    commentCreate(input: { issueId: $id, body: $body }) {
      success
    }
  }
`;
