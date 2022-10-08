pipeline {
  agent any
  stages {
    stage('Checkout SCM') {
      steps {
        checkout scm
      }
    }

    stage('OWASP-Dependency-Check') {
      steps {
        dependencyCheck(odcInstallation: 'Default', additionalArguments: '--format HTML --format XML')
      }
    }

  }
  post {
    success {
      dependencyCheckPublisher(pattern: 'dependency-check-report.xml')
    }

  }
}