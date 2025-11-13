"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBooleanInput = parseBooleanInput;
exports.hasDuplicateComment = hasDuplicateComment;
function parseBooleanInput(value, defaultValue = true) {
    if (value === undefined || value.trim() === '') {
        return defaultValue;
    }
    const normalized = value.trim().toLowerCase();
    if (['true', '1', 'yes', 'y'].includes(normalized)) {
        return true;
    }
    if (['false', '0', 'no', 'n'].includes(normalized)) {
        return false;
    }
    return defaultValue;
}
function hasDuplicateComment(comments, targetBody) {
    return comments.some((comment) => comment.body.trim() === targetBody.trim());
}
