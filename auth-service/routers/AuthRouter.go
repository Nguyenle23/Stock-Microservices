package routers

import (
	"github.com/Nguyenle23/Stocking-Microservices/controllers"
	"github.com/gofiber/fiber/v2"
)

func AuthRoute() *fiber.App {
	app := fiber.New()
	app.Mount("/", controllers.AuthController())	
	return app
}