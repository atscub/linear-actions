import * as core from '@actions/core';

import { LinearClient } from '../lib/client';
import { hasDuplicateComment } from '../lib/util';

export interface CommentCommandOptions {
  apiKey: string;
  issueKey: string;
  body: string;
  dedupe: boolean;
}

export async function runCommentCommand(options: CommentCommandOptions): Promise<'posted' | 'skipped'> {
  const client = new LinearClient(options.apiKey);

  const issue = await client.getIssueByKey(options.issueKey);

  if (!issue) {
    throw new Error(`Linear issue ${options.issueKey} not found`);
  }

  if (options.dedupe) {
    const comments = await client.listIssueComments(issue.id);

    if (hasDuplicateComment(comments, options.body)) {
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
