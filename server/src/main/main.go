package main

import (
	"p18/src/tcp"
)

func main() {
	// 服务器 收消息 传消息
	tcp.NewServer().Start(13250)
}