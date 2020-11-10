package main

import (
	"fmt"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func kafkaConsumer(config *kafka.ConfigMap, topics []string) {
	c, err := kafka.NewConsumer(config)
	defer c.Close()

	if err != nil {
		panic(err)
	}

	c.SubscribeTopics(topics, nil)

	for {
		msg, err := c.ReadMessage(-1)
		if err == nil {
			fmt.Printf("Message on %s: %s\n", msg.TopicPartition, string(msg.Value))
		} else {
			fmt.Printf("Consumer error: %v (%v)\n", err, msg)
		}
	}
}

func main() {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "localhost:9092",
		"group.id":          "myGroup",
		"auto.offset.reset": "earliest",
	}

	kafkaConsumer(configMap, []string{"first_topic"})
}
