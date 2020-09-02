COMPOSE_FILE:=docker-compose.yaml
DOCKER_CMD:=docker-compose -p esprit_document -f ${COMPOSE_FILE}
MAKEFILE_DIR:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))
GIT_HOOKS_DIR:=$(shell dirname ${MAKEFILE_DIR})/.git/hooks

setup:  build
	cp hooks/pre-commit ${GIT_HOOKS_DIR}/pre-commit
	chmod +x ${GIT_HOOKS_DIR}/pre-commit

build:
	${DOCKER_CMD} build

up: down
	${DOCKER_CMD} up --remove-orphans

down:
	${DOCKER_CMD} down

validate:
	${DOCKER_CMD} run --rm openapi-generator-cli validate -i swagger/swagger.bundle.json --recommend

generate-api-client:
	${DOCKER_CMD} run --rm openapi-generator-cli tools/docker-generate-api-client.sh

generate-swagger-bundle:
	${DOCKER_CMD} run --rm swagger-ui-watcher yarn run generate-swaggger-bundle
