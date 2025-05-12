# Blog Comment Moderation Microservice - Automated Content Filtering for Blog Comments

This microservice is part of a larger blog application that provides automated comment moderation functionality. It processes newly created comments through a content filtering system that evaluates text content based on specific keywords. The service operates asynchronously through an event-driven architecture, ensuring scalable and reliable comment moderation.

The moderation service listens for comment creation events, applies moderation rules (currently checking for the word 'orange'), and emits moderation decisions back to the system. It's built using Node.js and Express, packaged as a Docker container for consistent deployment, and integrates with other microservices through an event bus architecture.

## Repository Structure
```
blog-ms/
└── moderation/                 # Comment moderation microservice
    ├── Dockerfile             # Container configuration for service deployment
    ├── index.js              # Main application logic and API endpoints
    └── package.json          # Node.js project configuration and dependencies
```

## Usage Instructions
### Prerequisites
- Node.js (v12 or higher)
- Docker
- Access to the event bus service (running on port 4005)
- npm or yarn package manager

### Installation

#### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd blog-ms/moderation

# Install dependencies
npm install

# Start the development server
npm start
```

#### Docker Deployment
```bash
# Build the Docker image
docker build -t blog-moderation-service .

# Run the container
docker run -p 4003:4003 blog-moderation-service
```

### Quick Start
1. Ensure the event bus service is running on port 4005
2. Start the moderation service
3. The service will automatically begin processing comment events

### More Detailed Examples

#### Comment Moderation Flow
```javascript
// Example of a CommentCreated event
const commentEvent = {
  type: 'CommentCreated',
  data: {
    id: '123',
    postId: 'post123',
    content: 'This is a comment about orange juice'
  }
};

// Example of resulting CommentModerated event
const moderatedEvent = {
  type: 'CommentModerated',
  data: {
    id: '123',
    postId: 'post123',
    status: 'approved',
    content: 'This is a comment about orange juice'
  }
};
```

### Troubleshooting

#### Common Issues
1. Event Bus Connection Failure
   - Error: `ECONNREFUSED 4005`
   - Solution: Verify event bus service is running and accessible at `http://event-bus-srv:4005`
   - Check network connectivity between services

2. Service Not Starting
   - Error: `EADDRINUSE 4003`
   - Solution: Ensure port 4003 is not in use by another service
   - Command to check port usage: `lsof -i :4003`

#### Debugging
- Enable debug logging by setting environment variable:
  ```bash
  DEBUG=express:* npm start
  ```
- Service logs are available through:
  ```bash
  docker logs <container-id>
  ```

## Data Flow
The moderation service processes comments through an event-driven pipeline, receiving comment creation events, applying moderation rules, and emitting moderation decisions.

```ascii
[Comment Created] --> [Event Bus] --> [Moderation Service]
                                           |
                                           v
[Event Bus] <-- [Moderation Decision] <-- [Apply Rules]
```

Component Interactions:
1. Service listens for 'CommentCreated' events on `/events` endpoint
2. Processes comment content using keyword filtering
3. Determines comment status (approved/rejected)
4. Emits 'CommentModerated' event with decision
5. Communicates with event bus using HTTP POST requests
6. Uses JSON format for all event data
7. Operates asynchronously to handle high comment volumes
8. Maintains stateless operation for scalability