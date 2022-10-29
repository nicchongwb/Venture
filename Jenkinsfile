pipeline {
  agent any
  tools {nodejs "node"}
  environment {
    // SEMGREP_BASELINE_REF = ""

    SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
    SEMGREP_PR_ID = "${env.CHANGE_ID}"
    CHROME_BIN = '/bin/google-chrome'
    DATABASE_URL = credentials('22d228cf-a4af-4e9b-be9b-909a6e347141')
    //  SEMGREP_TIMEOUT = "300"
  }
  stages {
    stage('Checkout SCM') {
      steps {
        checkout scm
      }
    }
    // stage('OWASP DependencyCheck') {
		// 	steps {
    //     sh 'cd venture-app; npm i'
		// 		dependencyCheck additionalArguments: '--format HTML --format XML --disableYarnAudit', odcInstallation: 'OWASP-DC'
		// 	}
    //   post {
		//     success {
		// 	    dependencyCheckPublisher pattern: 'dependency-check-report.xml'
		//     }
	  //   }
		// }
    // stage('Semgrep-Scan') {
    //   agent {
    //     docker { 
    //       image 'python:3' 
    //       args '--user 0:0' // use container as root
    //       args '-v $HOME/.m2:/root/.m2' // For caching
    //     }
    //   }
    //   steps {
    //     sh 'pip3 install semgrep'
    //     sh 'semgrep ci'
    //   }


    //   post {
    //     cleanup {
    //       cleanWs() // Clean up any failed builds
    //     }
    //   }
    // }

    // stage('Cypress E2E testing') {
    //   agent {
    //     docker {
    //       image 'cypress/base:16'
    //     }
    //   }
    //   steps {
    //     sh 'cd venture-app; npm ci; npm run build; npm run e2e:test'
    //   }
    // }

    // stage('Linting check') {
    //   steps {
    //     sh 'cd venture-app; npm run lint'
    //   }
    // }


    stage ('Maven Build & Analyse') {
      steps {
        sh '/var/jenkins_home/apache-maven-3.6.3/bin/mvn --batch-mode -V -U -e clean verify -Dsurefire.useFile=false -Dmaven.test.failure.ignore'
        sh '/var/jenkins_home/apache-maven-3.6.3/bin/mvn --batch-mode -V -U -e checkstyle:checkstyle pmd:pmd pmd:cpd findbugs:findbugs'
      }
      post {
        always {
          junit testResults: '**/target/surefire-reports/TEST-*.xml'
          recordIssues enabledForFailure: true, tools: [mavenConsole(), java(), javaDoc()]
          recordIssues enabledForFailure: true, tool: checkStyle()
          recordIssues enabledForFailure: true, tool: spotBugs(pattern: '**/target/findbugsXml.xml')
          recordIssues enabledForFailure: true, tool: cpd(pattern: '**/target/cpd.xml')
          recordIssues enabledForFailure: true, tool: pmdParser(pattern: '**/target/pmd.xml')
        }
      }
    }
  }
}