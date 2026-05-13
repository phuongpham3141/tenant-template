export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode = 400,
    public readonly details?: unknown
  ) {
    super(message)
    this.name = "AppError"
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    super("NOT_FOUND", `${resource} not found${id ? `: ${id}` : ""}`, 404)
  }
}

export class PermissionDeniedError extends AppError {
  constructor(action: string) {
    super("PERMISSION_DENIED", `Permission denied: ${action}`, 403)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super("VALIDATION_ERROR", message, 400, details)
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super("CONFLICT", message, 409)
  }
}

export class RateLimitError extends AppError {
  constructor(message = "Rate limit exceeded") {
    super("RATE_LIMITED", message, 429)
  }
}

export class IntegrationError extends AppError {
  constructor(service: string, message: string, details?: unknown) {
    super(`${service.toUpperCase()}_ERROR`, `${service}: ${message}`, 502, details)
  }
}
