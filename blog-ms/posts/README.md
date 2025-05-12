# Blog Posts Microservice: A Lightweight Node.js Service for Managing Blog Posts

This microservice is part of a larger blog application architecture that handles the creation and management of blog posts. It provides a RESTful API for creating and retrieving blog posts while implementing event-driven communication with other services through an event bus.

The service is built using Express.js and implements a simple in-memory storage solution for posts. It features cross-origin resource sharing (CORS) support, unique ID generation for posts, and asynchronous event publishing. The containerized architecture ensures consistent deployment across different environments.

## Repository Structure
```
blog-ms/
└── posts/                    # Posts microservice root directory
    ├── Dockerfile           # Container configuration for the service
    ├── index.js            # Main application entry point with API routes
    └── package.json        # Node.js project configuration and dependencies
```

## Usage Instructions
### Prerequisites
- Node.js (v12 or higher)
- Docker (if running containerized)
- npm (Node Package Manager)

### Installation

#### Local Development
```bash
# Navigate to the posts directory
cd blog-ms/posts

# Install dependencies
npm install

# Start the development server
npm start
```

#### Docker Installation
```bash
# Build the Docker image
docker build -t blog-posts-service ./blog-ms/posts

# Run the container
docker run -p 4000:4000 blog-posts-service
```

### Quick Start
1. Start the service:
```bash
npm start
```

2. Create a new post:
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"title":"My First Post"}' \
  http://localhost:4000/posts/create
```

3. Retrieve all posts:
```bash
curl http://localhost:4000/posts
```

### More Detailed Examples

#### Creating a Post with Error Handling
```javascript
const axios = require('axios');

async function createPost(title) {
  try {
    const response = await axios.post('http://localhost:4000/posts/create', {
      title: title
    });
    console.log('Post created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error.message);
    throw error;
  }
}
```

### Troubleshooting

#### Common Issues

1. Connection Refused to Event Bus
```
Error: ECONNREFUSED 4005
```
**Solution**: 
- Verify the event bus service is running
- Check if `event-bus-srv` is resolvable in your environment
- Ensure port 4005 is accessible

2. CORS Issues
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution**:
- The service includes CORS middleware
- Verify the client origin is properly configured
- Check if the request includes proper headers

#### Debugging
Enable debug logging by setting the environment variable:
```bash
DEBUG=express:* npm start
```

Log files location: Standard output (console)

## Data Flow
The service manages blog posts through a RESTful API, storing them in memory and publishing events to an event bus for other services to consume.

```ascii
Client Request → Express Router → In-Memory Storage
     ↓                                  ↓
  Response  ←-------- Event Bus -------- Event Publication
```

Key Component Interactions:
1. Client sends HTTP requests to create or retrieve posts
2. Express router handles request routing and validation
3. Posts are stored in an in-memory object with unique IDs
4. Creation events are published to the event bus (port 4005)
5. Event bus notifications are received through the /events endpoint
6. CORS middleware enables cross-origin requests
7. Body parser processes JSON request bodies