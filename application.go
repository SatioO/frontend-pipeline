package main

import (
	"fmt"
	"os"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	if len(os.Args) < 4 {
		fmt.Fprintf(os.Stderr, "Usage: main.go <broker> <group> <topics..>\n")
		os.Exit(1)
	}

	broker := os.Args[1]
	group := os.Args[2]
	topics := os.Args[3:]

	fmt.Println(broker, group, topics)

	configMap := &kafka.ConfigMap{
		"bootstrap.servers":  broker,
		// "group.id":           group,
		// "session.timeout.ms": 6000,
		// "go.application.rebalance.enable": true,
		// "go.events.channel.enable":        true,
		// "auto.offset.reset": "earliest",
	}

	kafkaProducer(configMap, topics)
}
