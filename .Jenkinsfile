pipeline {
  agent { label 'master' }

  options {
    buildDiscarder logRotator(daysToKeepStr: '16', numToKeepStr: '10')
    disableConcurrentBuilds()
  }

  stages {
    stage ('Package Restore') {
      steps {
        bat 'npm install'
      }
    }

    stage ('Testing Code Coverage') {
      steps {
        bat 'npm run test:headless'
      }
    }
  }

  post {
    success {
      slackSend channel: '#jenkins', message: "${env.JOB_NAME}${env.BUILD_DISPLAY_NAME} Build Sccess", color: '#008000'
    }
    failure {
      slackSend channel: '#jenkins', message: "${env.JOB_NAME}${env.BUILD_DISPLAY_NAME} Build Failure", color: '#ff0000'
    }
  }
}
