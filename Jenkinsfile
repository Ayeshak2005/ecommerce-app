pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds') // Jenkins DockerHub credentials ID
        IMAGE_NAME = "ayeshak2005/ecommerce-website"
        TAG = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Ayeshak2005/ecommerce-app.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building the application..."
                // If using Node.js
                sh 'cd frontend && npm install'
                sh 'cd backend && npm install'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                // If you have tests
                // sh 'cd frontend && npm test'
                // sh 'cd backend && npm test'
            }
        }

        stage('Dockerize') {
            steps {
                echo "Building Docker image..."
                sh "docker build -t ${IMAGE_NAME}:${TAG} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Logging into Docker Hub..."
                sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                echo "Pushing Docker image..."
                sh "docker push ${IMAGE_NAME}:${TAG}"
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker images...'
            sh "docker rmi ${IMAGE_NAME}:${TAG} || true"
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

