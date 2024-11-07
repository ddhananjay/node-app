@Library('Jenkins-shared-lib') _

pipeline {
    agent any
    tools {
                git 'my'
        }
    environment {
            NODE_HOME = tool name: 'Node22', type: 'NodeJS' // Use the exact name you configured
            PATH = "${NODE_HOME}/bin:${env.PATH}"
            LANGUAGE = 'nodejs'
            AWS_REGION = 'us-east-2'
            EKS_CLUSTER_NAME = 'alphatech-cluster'
            DOCKER_USER_NAME = "dhananjay01"
            DOCKER_CREDENTIALS = 'dockerhub'
            DOCKER_IMAGE_NAME = "node-app" // Docker image name
            DOCKER_TAG = "latest"  // Docker tag (can be dynamic, like commit hash or build number)
            KUBERNETES_DEPLOYMENT_NAME = "node-app-deploy"  // Kubernetes deployment name
            KUBERNETES_NAMESPACE = "default"  // Kubernetes namespace
            K8S_CLUSTER_CONFIG = "/path/to/kube/config"  // Path to Kubernetes config file (if needed)
            REGISTRY_CREDENTIALS = 'docker-hub-credentials'  // Jenkins credentials for Docker registry
       }

    stages {
        stage("clone") {
            steps {
                echo timestampedEcho('test')
                echo 'Clone repository'
                git 'git@github.com:ddhananjay/node-app.git'
            }
        }
         stage('Test Spring Boot Application') {
                            steps {
                                  echo 'Running Tests application..'
                                  test(LANGUAGE)
                            }
         }
        stage('Build Spring Boot Application') {
                    steps {
                          echo 'Building application..'
                            build(LANGUAGE)
                    }
        }
        stage('Build Docker Image') {
                    steps {
                        echo 'Building docker file..'
                        script {

                            sh """
                                docker buildx build -t ${DOCKER_USER_NAME}/${DOCKER_IMAGE_NAME}:${DOCKER_TAG} .
                            """
                        }
                    }
        }

         stage('Push Docker Image to Registry') {
                    steps {
                        echo 'Pushing docker file to docker hub..'
                        uploadArtifactToDockerHub('${DOCKER_IMAGE_NAME}','${DOCKER_TAG}',DOCKER_USER_NAME )
                     /*   script {
                        docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS) {
                            sh """
                                docker push ${DOCKER_USER_NAME}/${DOCKER_IMAGE_NAME}:${DOCKER_TAG}
                            """
                        }
                        }*/
                   }
         }

              /*   required when uploading to AWS K8
              stage('Configure kubectl') {
                     steps {
                         sh """
                             aws eks update-kubeconfig --name ${EKS_CLUSTER_NAME} --region ${AWS_REGION}
                         """
                     }
                 }*/

          stage('Deploy to EKS') {
                              steps {
                                  script {
                                      echo 'done'
                                     // deployToEKS('k8s/deployment.yaml', EKS_CLUSTER_NAME, AWS_REGION)
                                  }
                              }
             }

    }

    post {
            success {
                echo "Deployment successful!"
            }
            failure {
                echo "Deployment failed. Please check the logs!"
            }
    }

}
