.PHONY: init
init:
	yarn --cwd functions
	make up

.PHONY: up
up:
	yarn --cwd functions serve

.PHONY: deploy
deploy:
	yarn --cwd functions deploy

.PHONY: logs
logs:
	yarn --cwd functions logs

.PHONY: lint
lint:
	yarn --cwd functions lint

.PHONY: import-data
import-data:
	node functions/commands/dev-data.js --import

.PHONY: delete-data
delete-data:
	node functions/commands/dev-data.js --delete

.PHONY: reset-data
reset-data:
	make delete-data
	make import-data