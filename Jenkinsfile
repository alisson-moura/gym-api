pipeline {
  agent {
    docker {
      image 'node:lts'
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
        sh 'npx prisma generate'
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
      agent { label 'jenkins-host' }
      steps {
        sshPublisher(publishers: [
          sshPublisherDesc(
            configName: 'GymSrv',
            transfers: [
              sshTransfer(
                execCommand: '''
                  cd ~/apps/gym-api
                  npm install
                  npx prisma migrate deploy
                  npm run build
                  pm2 delete gym-api 2> /dev/null
                  pm2 start build/index.js --name gym-api
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