## Compose up - Comment out if needed
cd venture
docker compose --env-file dockerenv config
docker compose --env-file dockerenv up --build -d

cd ..
cd jenkins
docker compose --env-file ../dockerenv config
docker compose --env-file ../dockerenv up --build -d

cd ..
cd nginx
docker compose --env-file ../dockerenv config
docker compose --env-file ../dockerenv up --build -d

cd ..
cd sonar
docker compose --env-file dockerenv config
docker compose --env-file dockerenv up --build -d