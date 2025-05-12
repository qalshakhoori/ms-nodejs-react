# Blog Query Microservice: Real-time Post and Comment Management System

This microservice is part of a larger blog application that provides real-time querying capabilities for blog posts and their associated comments. It maintains a synchronized view of blog posts and comments by processing events from an event bus, offering a consistent and efficient way to retrieve the current state of all blog content.

The service implements an event-driven architecture to maintain data consistency across the blog platform. It processes various events like post creation and comment updates, storing them in memory for quick access. The service exposes RESTful endpoints for retrieving the aggregated blog data and handles event processing through a dedicated event bus connection.

## Repository Structure
```
blog-ms/query/
├── Dockerfile          # Container configuration for Node.js runtime environment
├── index.js           # Main application entry point with Express server and event handling
└── package.json       # Node.js project configuration and dependencies
```

## Usage Instructions
### Prerequisites
- Node.js (v12 or higher)
- Docker (if running containerized)
- Access to the event bus service (running on port 4005)

### Installation

#### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd blog-ms/query

# Install dependencies
npm install

# Start the service
npm start
```

#### Docker Installation
```bash
# Build the Docker image
docker build -t blog-query-service .

# Run the container
docker run -p 4002:4002 blog-query-service
```

### Quick Start
1. Start the service:
```bash
npm start
```

2. Access the posts endpoint:
```bash
curl http://localhost:4002/posts
```

3. The service automatically syncs with the event bus on startup.

### More Detailed Examples

#### Retrieving All Posts
```javascript
// Using axios
const response = await axios.get('http://localhost:4002/posts');
console.log(response.data);
```

Response format:
```json
{
  "postId": {
    "id": "postId",
    "title": "Post Title",
    "comments": [
      {
        "id": "commentId",
        "content": "Comment content",
        "status": "approved"
      }
    ]
  }
}
```

### Troubleshooting

#### Common Issues

1. Connection to Event Bus Failed
```
Error: Error fetching events: connect ECONNREFUSED 127.0.0.1:4005
```
Solution:
- Verify the event bus service is running
- Check if the event bus URL is correctly configured
- Ensure network connectivity between services

2. Event Processing Issues
```
Error: Cannot read property 'comments' of undefined
```
Solution:
- Verify the event data format
- Check if the post exists before processing comment events
- Enable debug logging:
```javascript
const DEBUG = true;
if (DEBUG) console.log('Processing event:', type, data);
```

## Data Flow
The query service maintains a synchronized view of blog posts and comments by processing events from the event bus. It stores the data in memory and provides quick access through REST endpoints.

```ascii
                                    ┌─────────────┐
                                    │  Event Bus  │
                                    └─────┬───────┘
                                          │
                                          ▼
┌──────────┐                    ┌─────────────────┐
│  Client  │ ───GET /posts───► │   Query Service  │
└──────────┘                    └─────────────────┘
                                     │
                                     ▼
                               ┌──────────────┐
                               │ In-Memory    │
                               │   Storage    │
                               └──────────────┘
```

Key Component Interactions:
1. Service initializes and connects to the event bus
2. Processes incoming events (PostCreated, CommentCreated, CommentUpdated)
3. Maintains in-memory state of all posts and comments
4. Provides REST endpoint for retrieving current state
5. Uses CORS for cross-origin access
6. Implements error handling for event processing
7. Supports automatic event synchronization on startup