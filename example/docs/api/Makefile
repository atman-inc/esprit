COMPOSE_FILE:=docker-compose.yaml
DOCKER_CMD:=docker-compose -p esprit_document -f ${COMPOSE_FILE}
MAKEFILE_DIR:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))
GIT_HOOKS_DIR:=$(shell dirname ${MAKEFILE_DIR})/.git/hooks

build:
	${DOCKER_CMD} build

up: down
	${DOCKER_CMD} up --remove-orphans

down:
	${DOCKER_CMD} down

generate-swagger-bundle:
	${DOCKER_CMD} run --rm swagger-ui-watcher yarn run generate-swaggger-bundle
	cp swagger/swagger.bundle.json ../../lib/infrastructure/webserver/swagger.bundle.json
