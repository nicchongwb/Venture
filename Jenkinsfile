pipeline {
  agent any
  tools {nodejs "node"}
  environment {
    // SEMGREP_BASELINE_REF = ""

    SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
    SEMGREP_PR_ID = "${env.CHANGE_ID}"
    CHROME_BIN = '/bin/google-chrome'
    //  SEMGREP_TIMEOUT = "300"
  }
  stages {
    stage('Checkout SCM') {
      steps {
        checkout scm
      }
    }
    stage('OWASP DependencyCheck') {
			steps {
				dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'OWASP-DC'
			}
      post {
		    success {
			    dependencyCheckPublisher pattern: 'dependency-check-report.xml'
		    }
	    }
		}
    stage('Semgrep-Scan') {
      agent {
        docker { 
          image 'python:3' 
          args '--user 0:0' // use container as root
          args '-v $HOME/.m2:/root/.m2' // For caching
        }
      }
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
  }
}
