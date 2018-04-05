package main

// Reservation data
type Reservation struct {
	Room     int `json:"roomNumber"`
	ResStart int `json:"startTimestamp"`
	ResEnd   int `json:"endTimestamp"`
}

// Guest data
type Guest struct {
	ID        int         `json:"id"`
	FirstName string      `json:"firstName"`
	LastName  string      `json:"lastName"`
	ResDeets  Reservation `json:"reservation"`
}

// Company data
type Company struct {
	ID       int    `json:"id"`
	Company  string `json:"company"`
	City     string `json:"city"`
	Timezone string `json:"timezone"`
}

// Message data
type Message struct {
	ID      int    `json:"id"`
	Type    string `json:"type"`
	Message string `json:"message"`
}
