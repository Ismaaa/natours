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
