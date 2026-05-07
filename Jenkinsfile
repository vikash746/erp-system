
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "vik0408/erp-backend:${env.BUILD_ID}"
        DOCKER_LATEST = "vik0408/erp-backend:latest"
        KUBECONFIG_ID = "/root/.kube/config"
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
                        def dockerImage = docker.build("${env.DOCKER_IMAGE}")
                        docker.build("${env.DOCKER_LATEST}")
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {

                        docker.image("${env.DOCKER_IMAGE}").push()

                        docker.image("${env.DOCKER_LATEST}").push()
                    }
                }
            }
        }



stage('Deploy to Kubernetes') {
    steps {
        sh '''
        export KUBECONFIG=/root/.kube/config
        kubectl cluster-info
        kubectl get nodes
        kubectl apply -f k8s/ --validate=false
        '''
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

