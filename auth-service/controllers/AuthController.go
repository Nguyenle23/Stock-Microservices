package controllers

import (
	"github.com/Nguyenle23/Stocking-Microservices/services"
	"github.com/gofiber/fiber/v2"
)

func AuthController() *fiber.App {
	app := fiber.New()

	app.Post("/register", services.Register)
	app.Post("/login", services.Login)

	return app
}