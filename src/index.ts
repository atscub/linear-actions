import * as core from '@actions/core';

import { runCommentCommand } from './commands/comment';
import { parseBooleanInput } from './lib/util';

async function run(): Promise<void> {
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
        await runCommentCommand({
          apiKey,
          issueKey,
          body,
          dedupe: parseBooleanInput(dedupeInput, true),
        });
        break;
      default:
        throw new Error(`Unsupported command "${command}". Expected "comment".`);
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
      return;
    }

    core.setFailed('Unknown error encountered.');
  }
}

void run();
