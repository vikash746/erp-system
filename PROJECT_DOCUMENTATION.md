# ERP Purchase Order Management System - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Git and GitHub Setup](#git-and-github-setup)
3. [Project Structure](#project-structure)
4. [Technology Stack](#technology-stack)
5. [Local Development Setup](#local-development-setup)
6. [Docker Containerization](#docker-containerization)
7. [Jenkins CI/CD Pipeline](#jenkins-cicd-pipeline)
8. [Kubernetes Deployment](#kubernetes-deployment)
9. [Production Deployment](#production-deployment)
10. [Troubleshooting](#troubleshooting)

## Project Overview

This is a full-stack ERP (Enterprise Resource Planning) system designed for managing purchase orders, vendors, and inventory analytics. The system consists of:

- **Frontend**: Modern React application with responsive UI
- **Backend**: Node.js/Express API with MongoDB database
- **DevOps**: Complete containerization and orchestration setup

### Key Features
- JWT-based authentication and role-based access control
- Dashboard with metrics and analytics
- Vendor management system
- Purchase order lifecycle management
- Automated calculations and inventory tracking

## Git and GitHub Setup

### Version Control with Git

Git is used for version control to track changes, collaborate with team members, and maintain a history of the codebase.

#### Basic Git Workflow:
1. **Clone the repository** (download the project to your local machine)
2. **Create a feature branch** for new work
3. **Make changes** and commit them
4. **Push changes** to GitHub
5. **Create a Pull Request** for code review
6. **Merge** approved changes to main branch

#### Essential Git Commands:
```bash
# Clone repository
git clone https://github.com/yourusername/erp-system.git

# Check status of changes
git status

# Add files to staging
git add .

# Commit changes
git commit -m "Descriptive commit message"

# Push to remote repository
git push origin main

# Create and switch to new branch
git checkout -b feature/new-feature

# Pull latest changes
git pull origin main
```

### GitHub Repository Management

GitHub hosts the remote repository and provides collaboration tools:

- **Issues**: Track bugs, features, and tasks
- **Pull Requests**: Review and merge code changes
- **Actions**: Automated CI/CD workflows
- **Releases**: Version management and deployment

#### Branching Strategy:
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Individual feature branches
- `hotfix/*`: Emergency bug fixes

## Project Structure

```
ERP_SYSTEM/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context for state management
│   │   └── assets/        # Images and other assets
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite build configuration
├── server/                 # Node.js backend application
│   ├── controllers/       # Business logic controllers
│   ├── models/           # MongoDB data models
│   ├── routes/           # API route definitions
│   ├── middleware/       # Custom middleware
│   ├── config/           # Database configuration
│   ├── package.json      # Backend dependencies
│   └── Dockerfile        # Backend container configuration
├── k8s/                   # Kubernetes manifests
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── mongo-deployment.yaml
│   ├── mongo-service.yaml
│   └── ingress.yaml
├── docker-compose.yml     # Local Docker orchestration
├── Jenkinsfile           # CI/CD pipeline definition
└── README.md             # Project documentation
```

### Directory Explanations:

#### Client Directory (`client/`)
- **Purpose**: Contains the React frontend application
- **Key Files**:
  - `package.json`: Defines dependencies and scripts
  - `vite.config.js`: Build tool configuration
  - `src/App.jsx`: Main application component
  - `src/main.jsx`: Application entry point

#### Server Directory (`server/`)
- **Purpose**: Contains the Node.js/Express backend API
- **Key Components**:
  - `controllers/`: Handle business logic for different features
  - `models/`: Define MongoDB data schemas
  - `routes/`: Define API endpoints
  - `middleware/`: Custom authentication and validation middleware
  - `config/`: Database connection configuration

#### Kubernetes Directory (`k8s/`)
- **Purpose**: Contains deployment configurations for Kubernetes
- **Manifests**:
  - `backend-deployment.yaml`: Defines how the backend should run
  - `backend-service.yaml`: Exposes the backend internally
  - `mongo-deployment.yaml`: MongoDB database deployment
  - `mongo-service.yaml`: MongoDB service configuration
  - `ingress.yaml`: External access routing

## Technology Stack

### Frontend Technologies
- **React 19**: Modern JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Chart.js**: Data visualization library

### Backend Technologies
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web framework for building APIs
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing

### DevOps Technologies
- **Docker**: Containerization platform
- **Docker Compose**: Multi-container application management
- **Kubernetes**: Container orchestration
- **Jenkins**: Continuous Integration/Continuous Deployment
- **Nginx Ingress**: Load balancing and routing

## Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Step-by-Step Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/erp-system.git
cd erp-system
```

#### 2. Backend Setup
```bash
cd server
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start development server
npm run dev
```
The backend will run on `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd ../client
npm install

# Start development server
npm run dev
```
The frontend will run on `http://localhost:5173`

#### 4. Database Setup
- **Local MongoDB**: Install MongoDB locally or use Docker
- **MongoDB Atlas**: Create a cloud database and update connection string

### Environment Variables

#### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/erp_system
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

#### Frontend (Environment Variables)
```
VITE_API_URL=http://localhost:5000/api
```

## Docker Containerization

Docker containers package applications with their dependencies for consistent deployment.

### Docker Components

#### Dockerfile (Backend)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### Docker Compose Configuration
The `docker-compose.yml` defines multi-container applications:

```yaml
version: '3.8'
services:
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/erp_system
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
```

### Running with Docker

#### Local Development with Docker Compose
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up --build -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

#### Docker Commands Reference
```bash
# Build image
docker build -t erp-backend ./server

# Run container
docker run -p 5000:5000 erp-backend

# List containers
docker ps

# Stop container
docker stop container_id

# Remove container
docker rm container_id
```

## Jenkins CI/CD Pipeline

Jenkins automates the build, test, and deployment process.

### Jenkinsfile Structure

The `Jenkinsfile` defines the CI/CD pipeline:

```groovy
pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = "vik0408/erp-backend:${env.BUILD_ID}"
        KUBECONFIG_ID = 'kubeconfig'
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('server') {
                    script {
                        dockerImage = docker.build("${env.DOCKER_IMAGE}")
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS}") {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: "${KUBECONFIG_ID}"]) {
                    sh "kubectl set image deployment/erp-backend erp-backend=${env.DOCKER_IMAGE}"
                }
            }
        }
    }
}
```

### Pipeline Stages Explained

#### 1. Clone Repository
- Checks out the source code from GitHub
- Uses the `checkout scm` step

#### 2. Build Docker Image
- Changes to the `server` directory
- Builds Docker image with build number as tag
- Uses `docker.build()` method

#### 3. Push to DockerHub
- Authenticates with Docker Hub using stored credentials
- Pushes the built image to Docker Hub registry
- Tags image with build ID for versioning

#### 4. Deploy to Kubernetes
- Uses Kubernetes configuration from Jenkins credentials
- Updates the deployment with the new Docker image
- Applies any changes to Kubernetes manifests

### Jenkins Setup Requirements

#### Required Credentials in Jenkins:
1. **dockerhub-credentials**: Docker Hub username and password/token
2. **kubeconfig**: Kubernetes cluster configuration file

#### Required Plugins:
- Docker Pipeline Plugin
- Kubernetes CLI Plugin
- Git Plugin

### Triggering the Pipeline

The pipeline can be triggered by:
- **Push to main branch**: Automatic deployment
- **Manual trigger**: Through Jenkins UI
- **Scheduled builds**: Cron-style scheduling
- **Webhook**: GitHub webhook on pull request merge

## Kubernetes Deployment

Kubernetes orchestrates containerized applications across a cluster.

### Kubernetes Architecture

#### Components Used:
- **Pods**: Basic deployable units containing containers
- **Deployments**: Manage replica sets of pods
- **Services**: Expose applications internally
- **Ingress**: External access and load balancing
- **Secrets**: Store sensitive configuration

### Deployment Manifests

#### Backend Deployment (`backend-deployment.yaml`)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: erp-backend
spec:
  replicas: 2  # Run 2 instances for high availability
  selector:
    matchLabels:
      app: erp-backend
  template:
    metadata:
      labels:
        app: erp-backend
    spec:
      containers:
      - name: erp-backend
        image: yourdockerhub/erp-backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: MONGO_URI
          valueFrom:
            secretKeyRef:
              name: erp-secrets
              key: MONGO_URI
```

#### Backend Service (`backend-service.yaml`)
```yaml
apiVersion: v1
kind: Service
metadata:
  name: erp-backend-service
spec:
  selector:
    app: erp-backend
  ports:
  - port: 80
    targetPort: 5000
  type: ClusterIP
```

#### Ingress Configuration (`ingress.yaml`)
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: erp-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
  - host: api.erp-system.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: erp-backend-service
            port:
              number: 80
```

### Database Deployment

MongoDB runs as a separate deployment with persistent storage:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo
spec:
  replicas: 1
  template:
    spec:
      containers:
      - name: mongo
        image: mongo:latest
        ports:
        - containerPort: 27017
        volumeMounts:
        - name: mongo-storage
          mountPath: /data/db
      volumes:
      - name: mongo-storage
        persistentVolumeClaim:
          claimName: mongo-pvc
```

### Deploying to Kubernetes

#### Prerequisites:
1. **Kubernetes cluster** (Minikube, EKS, GKE, etc.)
2. **kubectl** configured to access the cluster
3. **Docker registry access** (Docker Hub, ECR, etc.)

#### Deployment Steps:
```bash
# Create secrets for sensitive data
kubectl create secret generic erp-secrets \
  --from-literal=MONGO_URI='mongodb://mongo:27017/erp_system' \
  --from-literal=JWT_SECRET='your-secret-key'

# Apply all manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get services
kubectl get ingress

# View logs
kubectl logs -f deployment/erp-backend
```

### Scaling and Management

#### Scaling the Application:
```bash
# Scale backend to 3 replicas
kubectl scale deployment erp-backend --replicas=3

# Auto-scaling (if configured)
kubectl autoscale deployment erp-backend --cpu-percent=70 --min=2 --max=10
```

#### Rolling Updates:
```bash
# Update image
kubectl set image deployment/erp-backend erp-backend=new-image:tag

# Check rollout status
kubectl rollout status deployment/erp-backend

# Rollback if needed
kubectl rollout undo deployment/erp-backend
```

## Production Deployment

### Cloud Platforms

#### Backend Deployment (Render/DigitalOcean/Railway)
1. Connect GitHub repository
2. Configure build settings (Docker)
3. Set environment variables
4. Deploy automatically on push

#### Frontend Deployment (Vercel/Netlify)
1. Connect GitHub repository
2. Configure build settings (Vite)
3. Set environment variables (`VITE_API_URL`)
4. Deploy automatically on push

### Environment Configuration

#### Production Environment Variables:
```
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/erp_prod
JWT_SECRET=strong-production-secret
PORT=5000
```

### Monitoring and Logging

#### Application Monitoring:
- Health check endpoints (`/health`)
- Application logs in cloud platform
- Error tracking (Sentry, LogRocket)

#### Infrastructure Monitoring:
- Kubernetes dashboard
- Prometheus metrics
- Grafana dashboards

## Troubleshooting

### Common Issues

#### 1. Port Conflicts
- **Issue**: Port 5000 or 5173 already in use
- **Solution**: Change ports in configuration or stop conflicting services

#### 2. Database Connection Issues
- **Issue**: Cannot connect to MongoDB
- **Solution**:
  - Check MongoDB URI in environment variables
  - Verify network connectivity
  - Check MongoDB server status

#### 3. Build Failures
- **Issue**: Docker build or npm install fails
- **Solution**:
  - Clear Docker cache: `docker system prune -a`
  - Clear npm cache: `npm cache clean --force`
  - Check network connectivity for package downloads

#### 4. Kubernetes Deployment Issues
- **Issue**: Pods not starting or crashing
- **Solution**:
  ```bash
  # Check pod status
  kubectl get pods
  kubectl describe pod pod-name

  # Check logs
  kubectl logs pod-name

  # Check events
  kubectl get events --sort-by=.metadata.creationTimestamp
  ```

#### 5. CORS Issues
- **Issue**: Frontend cannot connect to backend API
- **Solution**: Configure CORS in backend or update API URLs

### Development Tips

#### 1. Use Environment-Specific Configurations
- Different settings for development, staging, and production
- Use `.env` files for local development
- Use platform environment variables for production

#### 2. Implement Health Checks
- Add `/health` endpoint for monitoring
- Include database connectivity checks
- Monitor application metrics

#### 3. Logging Best Practices
- Use structured logging (JSON format)
- Include correlation IDs for request tracing
- Log errors with stack traces
- Avoid logging sensitive information

#### 4. Security Considerations
- Use HTTPS in production
- Implement rate limiting
- Validate input data
- Use secure headers (Helmet.js)
- Regular dependency updates

### Performance Optimization

#### Frontend Optimization:
- Code splitting with React.lazy()
- Image optimization
- Bundle analysis with `npm run build -- --analyze`

#### Backend Optimization:
- Database indexing
- Caching strategies (Redis)
- API response compression
- Connection pooling

#### Infrastructure Optimization:
- Horizontal pod autoscaling
- Load balancing
- CDN for static assets
- Database read replicas

---

This documentation provides a comprehensive guide to understanding, developing, and deploying the ERP Purchase Order Management System. Each component is explained with practical examples and step-by-step instructions.