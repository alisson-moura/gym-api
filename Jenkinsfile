pipeline {
  agent {
    docker {
      image 'node:20.15.0-alpine3.20'
      reuseNode true
    }
  }
  environment {
    HOME = "${env.WORKSPACE}"
    NPM_CONFIG_CACHE = "${env.WORKSPACE}/.npm"
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Deploy') {
      agent {
        label 'jenkins-host'
      }
      steps {
        script {
          withCredentials([file(credentialsId: 'movi-mente-se-env-variables', variable: 'env_file')]) {
            writeFile file: '.env', text: readFile(env_file)
          }
          sshPublisher(publishers: [
            sshPublisherDesc(
              configName: 'GymSrv',
              transfers: [
                sshTransfer(
                  cleanRemote: false,
                  excludes: '**/node_modules/**, **/build/**',
                  flatten: false,
                  makeEmptyDirs: false,
                  noDefaultExcludes: false,
                  patternSeparator: '[, ]+',
                  remoteDirectory: 'gym-api',
                  remoteDirectorySDF: false,
                  removePrefix: '',
                  sourceFiles: '**/**'
                )
              ],
              usePromotionTimestamp: false,
              useWorkspaceInPromotion: false,
              verbose: false
            )
          ])
        }
      }
    }
    stage('Start') {
      steps {
        sshPublisher(publishers: [
          sshPublisherDesc(
            configName: 'GymSrv',
            transfers: [
              sshTransfer(
                execCommand: '''
                  cd ~/apps/gym-api
                  npm install
                  npm run build
                ''',
                sourceFiles: ''
              )
            ],
            usePromotionTimestamp: false,
            useWorkspaceInPromotion: false,
            verbose: false
          )
        ])
      }
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}