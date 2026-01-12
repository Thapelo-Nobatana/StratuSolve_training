import crypto from "crypto";

const sessions = new Map();

// createSession for user
export function createSession(user) {
  const sessionId = crypto.randomUUID();

  sessions.set(sessionId, {
    userId: user.id,
    role: user.role,
    createdAt: Date.now(),
  });

  return sessionId;
}

// Get a Session
export function getSession(sessionId) {
  return sessions.get(sessionId);
}

// Destroy a Session
export function destroySession(sessionId) {
  sessions.delete(sessionId);
}
