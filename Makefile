#!make

include .env
export $(shell sed 's/=.*//' .env)

DOCKER_COMPOSE_FILE ?= docker-compose.yml

#========================#
#== DEVELOPMENT ==#
#========================#

up:
	docker compose -f ${DOCKER_COMPOSE_FILE} up -d --remove-orphans

migrate:
	node scripts/run_migration.js

rollback:
	node scripts/rollback_migration.js

down:
	docker compose -f ${DOCKER_COMPOSE_FILE} down

dev:
	npm run dev

#========================#
#== RUN ==#
#========================#
run:
	npm run start