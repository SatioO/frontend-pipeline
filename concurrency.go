package main

import (
	"time"
)

type data struct {
	Body  []byte
	Error error
}

func generator() <-chan int {
	c := make(chan int)

	go func() {
		defer close(c)
		for i := 0; i < 5; i++ {
			time.Sleep(time.Second * 2)
			c <- i
		}
	}()

	return c
}

func future() <-chan data {
	c := make(chan data)
	go func() {
		time.Sleep(time.Second * 3)
		c <- data{Body: []byte("{response: []}"), Error: nil}
	}()
	return c
}

func generatePipeline(numbers []int) <-chan int {
	out := make(chan int)
	go func() {
		for _, n := range numbers {
			out <- n
		}
		close(out)
	}()
	return out
}

func squareNumber(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		for n := range in {
			out <- n * n
		}
		close(out)
	}()
	return out
}

func fanIn(input1, input2 <-chan int) <-chan int {
	c := make(chan int)
	go func() {
		for {
			select {
			case s := <-input1:
				c <- s
			case s := <-input2:
				c <- s
			}
		}
	}()
	return c
}

// func main() {
// 	randomNumbers := []int{13, 44, 56, 99, 9, 45, 67, 90, 78, 23}

// 	inputChan := generatePipeline(randomNumbers)
// 	c1 := squareNumber(inputChan)
// 	c2 := squareNumber(inputChan)

// 	s := fanIn(c1, c2)

// 	for i := 0; i < len(randomNumbers); i++ {
// 		fmt.Println(<-s)
// 	}
// }
