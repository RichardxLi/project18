package tcp

import (
	"fmt"
	"net"
)

var ServerPool map[int]Server

type Server interface {
	Start(port int) error
	Close()
}

//广播服务器
type multiServer struct {
	// 监听对象
	lis *net.TCPListener
	// 当前客户端id
	curClientId int
	// 客户端连接池
	clients map[int]*client
	// 广播消息
	broadcastMsg chan []byte
}

func NewServer() *multiServer {
	return &multiServer{
		curClientId: 1,
		clients: make(map[int]*client),
		broadcastMsg: make(chan []byte, 1),
	}
}

func (m *multiServer) Start(port int) error {
	// 获取本机tcp端口和地址
	addr, err := net.ResolveTCPAddr("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		return err
	}
	// 监听端口
	m.lis, err = net.ListenTCP("tcp", addr)
	if err != nil {
		return err
	}
	fmt.Printf("监听端口%d\n", port)
	go func() {
		for {
			conn, err := m.lis.Accept()
			if err != nil {
				continue
			}
			cli := &client {
				id: m.curClientId,
				conn: conn,
				recvMsg: make(chan []byte, 1),
				sendMsg: make(chan []byte, 1),
				isRecvClose: make(chan bool, 1),
				isSendClose: make(chan bool, 1),
				ser: m,
			}
			fmt.Printf("新增一个链接 ID:%d\n", cli.id)
			// 加入客户端到连接池中
			tmpCli := m.clients
			m.clients[m.curClientId] = cli
			m.clients = tmpCli
			m.curClientId++

			// 启2个协程 分别处理客户端消息的接收和发送
			go cli.RecvLoop()
			go cli.SendLoop()
		}
	}()
	// 启动一个协程处理广播
	go m.BroadcastLoop()
	return nil
}

func (m *multiServer) BroadcastLoop() {
	for {
		select {
		case data := <-m.broadcastMsg:
			{
				// 遍历所有客户端，循环发送消息
				for _, c := range m.clients {
					c.sendMsg <- data
				}
			}
		}
	}
}

func (m *multiServer) Close() {
	m.lis.Close()
	// 循环关闭客户端
	for _, c := range m.clients {
		c.conn.Close()
	}
}

func (m *multiServer) DeleteCli(c *client) error {
	c.conn.Close()
	tmpCli := m.clients
	delete(tmpCli, c.id)
	m.clients = tmpCli
	return nil
}