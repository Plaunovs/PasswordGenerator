package app

import (
	"PasswordGenerator/internal"
	"context"
)

type App struct{}

func NewApp() *App {
	return &App{}
}

func (a *App) Startup(ctx context.Context) {
	// ...
}

func (a *App) Shutdown(ctx context.Context) {
	// ...
}

func (a *App) GeneratePassword(length int, digits, lower, upper bool) string {
	return internal.Generate(length, digits, lower, upper)
}

func (a *App) TestMessage() string {
	return "Hello from Go backend!"
}
