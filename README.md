## Reservation App
Popis

Jednoduché REST API pro správu rezervací.
Projekt byl vytvořen v rámci předmětů DevOps a Programování a řízené testy.

## Funkcionalita
vytvoření rezervace
získání seznamu rezervací

Pravidla:

nelze rezervovat stejný čas dvakrát
uživatel může mít pouze jednu rezervaci
rezervace před 09:00 není povolena
validace vstupních dat

## Spuštění

Lokálně:

npm install
node index.js

Docker:

docker build -t reservation-app .
docker run -p 3000:3000 reservation-app

Docker Compose:

docker compose up --build

## Kubernetes

Nasazení:

kubectl apply -f k8s/

Přístup:

kubectl port-forward svc/reservation-service 3000:3000

Otevři:

http://localhost:3000/reservations

## API

Vytvoření rezervace:

curl -X POST http://localhost:3000/reservations \
-H "Content-Type: application/json" \
-d '{"user":"A","time":"10:00"}'

Získání rezervací:

curl http://localhost:3000/reservations

## DevOps
CI pipeline (GitHub Actions – build, testy, coverage)
Docker image build
push do GHCR
nasazení do Kubernetes
ConfigMap + Secret
resource limits + healthcheck

## Testy (TDD)
npm test
unit testy
integrační testy
vývoj pomocí TDD

## Docker image
ghcr.io/arina2507/reservation-app:latest