# ERP Purchase Order Management System

A full-stack, production-ready ERP system designed for managing purchase orders, vendors, and basic inventory analytics. Built with a modern React frontend, a Node.js/Express backend, and deployed using a robust DevOps pipeline.

## Features
- **Authentication**: JWT-based role-based access control.
- **Dashboard**: High-level metrics, recent POs, and dynamic inventory value.
- **Vendor Management**: Create and track vendor details.
- **Purchase Orders**: Full lifecycle management of POs with automated calculations.
- **DevOps Ready**: Fully containerized with Docker, Kubernetes manifests, and Jenkins CI/CD pipeline.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Axios, Lucide React, React Router.
- **Backend**: Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcryptjs.
- **DevOps**: Docker, Docker Compose, Kubernetes, Jenkins.

## Setup Instructions

### Local Development

1. **Clone the repository**
2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   - Create a `.env` file in the `server` directory using `.env.example` (or the provided `.env`). Make sure to add your MongoDB URI.
   - Run the server: `npm run dev`

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   ```
   - Run the frontend: `npm run dev`

### Docker Deployment

To run the application locally using Docker Compose (Backend + local MongoDB):

```bash
docker-compose up --build -d
```

### Kubernetes Deployment

1. Make sure you have a running Kubernetes cluster (e.g., Minikube, EKS, GKE).
2. Create necessary secrets (e.g., `erp-secrets`) for MongoDB URI and JWT Secret.
3. Apply the manifests:
   ```bash
   kubectl apply -f k8s/
   ```

### CI/CD Pipeline

The included `Jenkinsfile` provides a pipeline to:
1. Clone the repository.
2. Build the backend Docker image.
3. Push the image to Docker Hub (requires `dockerhub-credentials` in Jenkins).
4. Deploy the updated image to Kubernetes (requires `kubeconfig` in Jenkins).

## Production Deployment
- **Backend (Render)**: Deploy the `server` directory as a Docker Web Service on Render.
- **Frontend (Vercel)**: Deploy the `client` directory as a Vite React app on Vercel. Ensure the `VITE_API_URL` environment variable points to your Render backend URL.
