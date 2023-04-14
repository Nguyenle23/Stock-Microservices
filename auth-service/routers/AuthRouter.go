package routers

import (
	"github.com/Nguyenle23/Stocking-Microservices/handlers"
	"github.com/gofiber/fiber/v2"
)

func AuthRoute() *fiber.App {
	app := fiber.New()

	app.Post("/register", handlers.Register)
	app.Post("/login", handlers.Login)

	return app
}