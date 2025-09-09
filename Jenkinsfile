pipeline {
    agent any

    environment {
        DOCKERHUB_USER = credentials('dockerhub-creds').username
        DOCKERHUB_PASS = credentials('dockerhub-creds').password
        IMAGE_NAME = "ecommerce-website"
        TAG = "latest"
        CONTAINER_NAME = "ecommerce_test"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your personal GitHub repo
                git branch: 'main', url: 'https://github.com/Ayeshak2005/ecommerce-app.git'
            }
        }

        stage('Build / Install Dependencies') {
            steps {
                // Install frontend/backend dependencies
                sh 'npm install --prefix frontend'
                sh 'npm install --prefix backend'
            }
        }

        stage('Test') {
            steps {
                // Add your test commands here
                sh 'echo "Running tests..."'
            }
        }

        stage('Dockerize') {
            steps {
                sh """
                    # Remove old container if exists
                    docker rm -f $CONTAINER_NAME || true

                    # Build Docker image
                    docker build -t $IMAGE_NAME:$TAG .
                """
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh """
                    # Login to Docker Hub
                    echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin

                    # Tag and push image
                    docker tag $IMAGE_NAME:$TAG $DOCKERHUB_USER/$IMAGE_NAME:$TAG
                    docker push $DOCKERHUB_USER/$IMAGE_NAME:$TAG
                """
            }
        }

        stage('Run Container') {
            steps {
                sh """
                    # Run container to verify
                    docker run -d -p 3000:3000 --name $CONTAINER_NAME $DOCKERHUB_USER/$IMAGE_NAME:$TAG
                    docker ps
                """
            }
        }
    }
}
