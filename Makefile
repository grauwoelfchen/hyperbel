setup:
	@npm i

run:
	@./node_modules/.bin/web-ext run

.PHONY: run setup
