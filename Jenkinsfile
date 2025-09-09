
pipeline {
    agent any

    environment {
        // Jenkins credentials ID for Docker Hub
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        IMAGE_NAME = "ayeshak2005/ecommerce-website"
        TAG = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out code from GitHub..."
                git branch: 'main', url: 'https://github.com/Ayeshak2005/ecommerce-app.git'
            }
        }

        stage('Build') {
            steps {
                echo "Installing dependencies..."
                // Build frontend (React)
                sh 'cd frontend && npm install'
                // Build backend (Node.js)
                sh 'cd backend && npm install'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests (if any)..."
                // Uncomment if you have tests
                // sh 'cd frontend && npm test'
                // sh 'cd backend && npm test'
            }
        }

        stage('Dockerize') {
            steps {
                echo "Building Docker image..."
                // Make sure Dockerfile is in repo root
                sh "docker build -t ${env.IMAGE_NAME}:${env.TAG} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Logging into Docker Hub..."
                sh "echo ${env.DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${env.DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                
                echo "Pushing Docker image to Docker Hub..."
                sh "docker push ${env.IMAGE_NAME}:${env.TAG}"
            }
        }

    }

    post {
        always {
            echo 'Cleaning up local Docker image...'
            sh "docker rmi ${env.IMAGE_NAME}:${env.TAG} || true"
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
