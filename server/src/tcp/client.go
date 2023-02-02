package tcp

import (
	"bufio"
	"net"
)

type client struct {
	// ID
	id int
	// 连接
	conn net.Conn
	// 接受消息
	recvMsg chan []byte
	// 发送消息
	sendMsg chan []byte
	// 接受消息关闭通知
	isRecvClose chan bool
	//  发送消息关闭通知
	isSendClose chan bool
	// 服务器
	ser *multiServer
}

//RecvLoop 处理客户端接受消息
func (c *client) RecvLoop() {
	for {
		read := bufio.NewReader(c.conn)
		data := make([]byte, 8*1024)
		n, err := read.Read(data)
		if err != nil {
			return
		}

		select {
		// 接受消息关闭
		case <-c.isRecvClose:
			{
				c.isSendClose <- true
				return
			}
		// 广播消息
		case c.ser.broadcastMsg <- data[0:n]:
			{
				break
			}
		}
	}

	// 操作协议

	// 控制协议

	// 验算协议

	//

}

func (c *client) SendLoop() {
	for {
		select {
		// 发送消息关闭，把客户端从服务器中删除
		case <-c.isSendClose:
			{
				c.ser.DeleteCli(c)
			}
		// 向客户端发送消息
		case data := <-c.sendMsg:
			{
				_, err := c.conn.Write(data)
				if err != nil {
					return
				}
			}
		}
	}
}