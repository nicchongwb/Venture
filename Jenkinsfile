pipeline {
  agent {
    docker { 
      image 'python:3' 
      args '--user 0:0' // use container as root
    }
  }
  environment {
    // SEMGREP_BASELINE_REF = ""

    SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
    SEMGREP_PR_ID = "${env.CHANGE_ID}"

    //  SEMGREP_TIMEOUT = "300"
  }
  stages {
    stage('Semgrep-Scan') {
      steps {
        sh 'pip3 install semgrep'
        sh 'semgrep ci'
      }

      post {
        cleanup {
          cleanWs() // Clean up any failed builds
        }
      }
    }

    // stage('Checkout SCM') {
    //   steps {
    //     checkout scm
    // }
  }
}