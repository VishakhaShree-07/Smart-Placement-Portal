# Middleware Directory

This directory contains intermediate functions that run between receiving a request and sending a response. They can execute code, modify request/response objects, or end the request-response cycle.

Example:
- `authMiddleware.js`: Validates JSON Web Tokens (JWT) for protecting routes.
- `errorMiddleware.js`: Custom central error handler.
