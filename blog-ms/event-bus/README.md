# Event Bus Microservice for Distributed Blog System

The Event Bus is a lightweight, Node.js-based message broker that enables asynchronous communication between microservices in a distributed blog system. It provides reliable event distribution and storage capabilities, ensuring all services remain synchronized through a publish-subscribe pattern.

This service acts as the central communication hub for the blog microservices architecture, managing event propagation between Posts, Comments, Query, and Moderation services. It maintains an in-memory event log and handles automatic event forwarding to ensure system-wide consistency. The event bus implements a simple REST API for event publishing and retrieval, making it easy to integrate with other services while maintaining loose coupling.

## Repository Structure
```
blog-ms/
└── event-bus/                 # Event bus microservice root directory
    ├── Dockerfile            # Container configuration for deployment
    ├── index.js             # Main application entry point with event handling logic
    └── package.json         # Node.js project configuration and dependencies
```

## Usage Instructions
### Prerequisites
- Node.js (v12.0.0 or higher)
- Docker (if running containerized)
- Network access to other microservices (posts, comments, query, moderation)

### Installation

#### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd blog-ms/event-bus

# Install dependencies
npm install

# Start the service
npm start
```

#### Docker Installation
```bash
# Build the Docker image
docker build -t event-bus .

# Run the container
docker run -p 4005:4005 event-bus
```

### Quick Start
1. Start the service:
```bash
npm start
```

2. Publish an event:
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"type":"PostCreated","data":{"id":"123","title":"Hello World"}}' \
  http://localhost:4005/events
```

3. Retrieve all events:
```bash
curl http://localhost:4005/events
```

### More Detailed Examples

#### Publishing Different Event Types
```javascript
// Create Post Event
axios.post('http://localhost:4005/events', {
  type: 'PostCreated',
  data: {
    id: '123',
    title: 'New Post'
  }
});

// Comment Created Event
axios.post('http://localhost:4005/events', {
  type: 'CommentCreated',
  data: {
    id: '456',
    postId: '123',
    content: 'Great post!'
  }
});
```

### Troubleshooting

#### Common Issues

1. Connection Refused Errors
```
Error: connect ECONNREFUSED
```
- Verify all dependent services are running
- Check service URLs in index.js
- Ensure correct port mappings in Docker

2. Event Distribution Failures
- Check logs for specific service errors
- Verify network connectivity between services
- Ensure correct service names in Kubernetes (if using)

Debug Mode:
```bash
# Enable debug logging
DEBUG=express:* npm start
```

## Data Flow
The event bus implements a publish-subscribe pattern where events flow from source services through the event bus to all subscriber services.

```ascii
Publisher                 Event Bus              Subscribers
   |                         |                      |
   |  [POST] /events        |                      |
   |----------------------->|                      |
   |                        |    Forward Event     |
   |                        |--------------------->|
   |                        |                      |
   |  [GET] /events         |                      |
   |<-----------------------|                      |
   |                        |                      |
```

Key Component Interactions:
1. Publishers send events via POST /events endpoint
2. Event bus stores event in memory array
3. Event bus forwards events to all registered services
4. Each service processes events independently
5. Services can retrieve event history via GET /events
6. Error handling is implemented for each forward attempt
7. Services communicate using JSON over HTTP
8. Event delivery is fire-and-forget with logged errors