pipeline {
    agent any

    environment {
        IMAGE_NAME = "ayeshak2005/ecommerce-website"
        TAG = "latest"
        CONTAINER_NAME = "ecommerce-app"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Ayeshak2005/ecommerce-app.git'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh """
                    # Remove old container if exists
                    docker rm -f $CONTAINER_NAME || true

                    # Pull latest image from Docker Hub
                    docker pull $IMAGE_NAME:$TAG

                    # Run container
                    docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME:$TAG

                    # List running containers
                    docker ps
                """
            }
        }
    }
}

