package internal

import (
	"math/rand"
	"time"
)

func Generate(length int, digits, lower, upper bool) string {

	rand.Seed(time.Now().UnixNano())

	chars := ""

	if digits {
		chars += "0123456789"
	}
	if lower {
		chars += "abcdefghijklmnopqrstuvwxyz"
	}
	if upper {
		chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	}

	if len(chars) == 0 {
		return "Error: no character sets selected"
	}

	password := make([]byte, length)

	for i := 0; i < length; i++ {
		password[i] = chars[rand.Intn(len(chars))]
	}

	return string(password)
}
