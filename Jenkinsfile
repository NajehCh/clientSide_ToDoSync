pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
                dir('client') {
                    git url: 'https://github.com/NajehCh/clientSide_ToDoSync.git', branch: 'main'
                }
            }
        }

        stage('Injecter les variables d\'environnement') {
            steps {
                dir('client') {
                    withCredentials([file(credentialsId: 'frontend-env', variable: 'FRONT_ENV_FILE')]) {
                        sh '''
                            chmod -R 777 .
                            cp $FRONT_ENV_FILE .env.local
                        '''
                    }
                }
            }
        }

        stage('Installer les dépendances') {
            steps {
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Build du projet') {
            steps {
                dir('client') {
                    sh """
                        rm -rf .next
                        npm run build
                    """
                }
            }
        }

        stage('Déployer sur EC2') {
            steps {
                dir('client') {
                    sshagent(credentials: ['ssh-key']) {
                        sh '''
                            echo "Création du répertoire distant"
                            ssh -o StrictHostKeyChecking=no ubuntu@3.224.198.125 'mkdir -p /home/ubuntu/frontend'

                            echo "Copie des fichiers nécessaires vers EC2"
                            rsync -avz --exclude=node_modules --exclude=.git --exclude=.next . ubuntu@3.224.198.125:/home/ubuntu/frontend/

                            echo "Installation des dépendances sur EC2"
                            ssh -o StrictHostKeyChecking=no ubuntu@3.224.198.125 "cd /home/ubuntu/frontend && npm install --production"

                            echo "Démarrage du serveur en mode développement"
                            ssh -o StrictHostKeyChecking=no ubuntu@3.224.198.125 "cd /home/ubuntu/frontend && npm run dev &"

                            echo "Déploiement terminé avec succès"
                        '''
                    }
                }
            }
        }
    }
}
