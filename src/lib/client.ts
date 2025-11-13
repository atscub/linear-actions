import {
  COMMENT_CREATE_MUTATION,
  ISSUE_BY_KEY_QUERY,
  ISSUE_COMMENTS_QUERY,
} from './gql';

interface GraphQLErrorPayload {
  message: string;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLErrorPayload[];
}

export interface LinearIssue {
  id: string;
  identifier: string;
}

export interface LinearComment {
  id: string;
  body: string;
}

interface IssueByKeyResponse {
  issue: LinearIssue | null;
}

interface IssueCommentsResponse {
  issue: {
    comments: {
      nodes: LinearComment[];
    };
  } | null;
}

interface CommentCreateResponse {
  commentCreate: {
    success: boolean;
  };
}

export class LinearClient {
  private readonly endpoint: string;

  constructor(private readonly apiKey: string, endpoint = 'https://api.linear.app/graphql') {
    if (!apiKey) {
      throw new Error('Linear API key is required');
    }

    this.endpoint = endpoint;
  }

  async getIssueByKey(key: string): Promise<LinearIssue | null> {
    const data = await this.request<IssueByKeyResponse>(ISSUE_BY_KEY_QUERY, { key });
    return data.issue ?? null;
  }

  async listIssueComments(issueId: string): Promise<LinearComment[]> {
    const data = await this.request<IssueCommentsResponse>(ISSUE_COMMENTS_QUERY, { id: issueId });
    return data.issue?.comments.nodes ?? [];
  }

  async createComment(issueId: string, body: string): Promise<boolean> {
    const data = await this.request<CommentCreateResponse>(COMMENT_CREATE_MUTATION, {
      id: issueId,
      body,
    });

    return data.commentCreate.success;
  }

  private async request<T>(
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<T> {
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

    const payload = (await response.json()) as GraphQLResponse<T>;

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
