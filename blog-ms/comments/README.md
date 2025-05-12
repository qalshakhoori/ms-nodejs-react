# Blog Comments Microservice: Event-Driven Comment Management System

This project implements a microservice-based comments system for blog posts using Node.js and Express. It provides a scalable solution for managing blog comments with event-driven architecture, supporting comment creation, moderation, and retrieval operations.

The service is built using an event-driven architecture that enables loose coupling between different parts of the blog system. It maintains comments in an in-memory store and communicates with other services through an event bus, making it highly responsive and maintainable. The service supports comment moderation workflows and real-time updates through event propagation.

## Repository Structure
```
blog-ms/comments/
├── Dockerfile          # Container configuration for Node.js application
├── index.js           # Main application entry point with API routes and event handlers
└── package.json       # Project dependencies and npm scripts configuration
```

## Usage Instructions
### Prerequisites
- Node.js (v12 or higher)
- Docker (if running containerized)
- Access to an event bus service running on port 4005

### Installation

**Local Development:**
```bash
# Clone the repository
git clone <repository-url>
cd blog-ms/comments

# Install dependencies
npm install

# Start the service
npm start
```

**Docker Installation:**
```bash
# Build the Docker image
docker build -t blog-comments-service .

# Run the container
docker run -p 4001:4001 blog-comments-service
```

### Quick Start
1. Start the service:
```bash
npm start
```

2. Create a new comment:
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"content": "Great post!"}' \
  http://localhost:4001/posts/123/comments
```

3. Retrieve comments for a post:
```bash
curl http://localhost:4001/posts/123/comments
```

### More Detailed Examples

**Creating a Comment with Status Tracking:**
```javascript
// POST /posts/123/comments
{
  "content": "This is a new comment"
}

// Response
[
  {
    "id": "abc123",
    "content": "This is a new comment",
    "status": "pending"
  }
]
```

**Handling Comment Moderation:**
```javascript
// Event received from moderation service
{
  "type": "CommentModerated",
  "data": {
    "postId": "123",
    "id": "abc123",
    "status": "approved",
    "content": "This is a new comment"
  }
}
```

### Troubleshooting

**Common Issues:**

1. Connection refused to event bus:
   - Error: `ECONNREFUSED 4005`
   - Solution: Ensure event bus service is running on port 4005
   - Check network connectivity between services
   ```bash
   # Test event bus connection
   curl http://event-bus-srv:4005/events
   ```

2. Comment creation fails:
   - Verify request format includes content field
   - Check server logs: `docker logs <container-id>`
   - Ensure POST request includes Content-Type header

Debug Mode:
```bash
# Enable debug logging
DEBUG=* npm start

# Location of logs
docker logs blog-comments-service -f
```

## Data Flow
The service processes comments through an event-driven workflow, handling creation, moderation, and updates through asynchronous events.

```ascii
[Client] -> POST /comments -> [Comments Service] -> [Event Bus]
                                    ^
                                    |
[Event Bus] -> CommentModerated -> [Comments Service] -> CommentUpdated
```

Key Component Interactions:
1. Client submits comment through REST API
2. Service generates unique ID and stores comment
3. CommentCreated event published to event bus
4. Service listens for CommentModerated events
5. Updates comment status based on moderation
6. Publishes CommentUpdated event to propagate changes
7. Provides comment retrieval through GET endpoint