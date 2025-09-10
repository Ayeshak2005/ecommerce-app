

pipeline {
    agent any

    environment {
        IMAGE_NAME = "ayeshak2005/ecommerce-website"
        TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                echo "Checking out code from GitHub..."
                git branch: 'main', url: 'https://github.com/Ayeshak2005/ecommerce-app.git'
            }
        }

        stage('Build') {
            steps {
                echo "Skipping npm install — dependencies will be installed inside Docker build"
            }
        }

        stage('Test') {
            steps {
                echo "Running tests (skipped if handled inside Docker)"
                // If you have tests, add them here
                // sh 'npm test'
            }
        }

        stage('Dockerize') {
            steps {
                echo "Building Docker image..."
                sh "docker build -t ${env.IMAGE_NAME}:${env.TAG} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Logging into Docker Hub and pushing..."
                withCredentials([usernamePassword(credentialsId: 'e587bc45-a8e1-487f-8dc0-82ee9b087cde',
                                                 usernameVariable: 'DOCKER_USER',
                                                 passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                      echo $DOCKER_PASS | docker logi_
