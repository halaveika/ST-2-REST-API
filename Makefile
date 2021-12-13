run dev:
	docker-compose up --build
stop:
	docker stop app postgres
	docker rm app postgres