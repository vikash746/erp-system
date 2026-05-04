pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = "yourdockerhub/erp-backend:${env.BUILD_ID}"
        DOCKER_LATEST = "yourdockerhub/erp-backend:latest"
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
                        docker.build("${env.DOCKER_LATEST}")
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS}") {
                        dockerImage.push()
                        docker.image("${env.DOCKER_LATEST}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: "${KUBECONFIG_ID}"]) {
                    sh "kubectl set image deployment/erp-backend erp-backend=${env.DOCKER_IMAGE}"
                    sh "kubectl apply -f k8s/"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed."
        }
    }
}
