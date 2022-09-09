pipeline {
    agent {
        docker {
            image 'node:18.2.0'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}