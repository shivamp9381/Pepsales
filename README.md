# Pepsales
# Notification Service

## Features
- Send Email, SMS, In-App notifications
- RabbitMQ-based async processing
- Retry mechanism for failed notifications

## Endpoints
### POST /api/notifications
Send a notification to a user.

```json
{
  "userId": "123",
  "type": "email",
  "message": "Welcome to PepSales!"
}
