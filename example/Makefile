PROJECT_NAME:=esprit
COMPOSE_FILE:=docker-compose.yml
DOCKER_CMD:=docker-compose -f ${COMPOSE_FILE} -p ${PROJECT_NAME}

_APP_SERVICE_NAME:=app
APP_EXEC_CMD:=${DOCKER_CMD} exec ${_APP_SERVICE_NAME}
APP_RUN_CMD:=${DOCKER_CMD} run --rm ${_APP_SERVICE_NAME}

.DEFAULT_GOAL := help

help: ## print this message
	@echo ""
	@echo "Usage: make SUB_COMMAND argument_name=argument_value"
	@echo ""
	@echo "Command list:"
	@echo ""
	@printf "\033[36m%-30s\033[0m %-50s %s\n" "[Sub command]" "[Description]" "[Example]"
	@grep -E '^[/a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | perl -pe 's%^([/a-zA-Z_-]+):.*?(##)%$$1 $$2%' | awk -F " *?## *?" '{printf "\033[36m%-30s\033[0m %-50s %s\n", $$1, $$2, $$3}'

# --------------------
# main task
# --------------------
up: ## up application ## make up
	${DOCKER_CMD} up
down: ##  ## make down
	${DOCKER_CMD} down --volume
build: ##  ## make build
	${DOCKER_CMD} build
test:
	${APP_RUN_CMD} npm run test
console:
	${APP_RUN_CMD} /bin/bash

# --------------------
# DB
# --------------------
db/migration/generate:
	${APP_RUN_CMD} npm run typeorm -- migration:generate --name ${NAME}
db/migration/run:
	${APP_RUN_CMD} npm run typeorm -- migration:run
db/migration/revert:
	${APP_RUN_CMD} npm run typeorm -- migration:revert
db/entity/create:
	${APP_RUN_CMD} npm run typeorm -- entity:create --name ${NAME}
