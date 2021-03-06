using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using vtortola.WebSockets;

namespace websocketTest
{
    class Program
    {
        public static void Main(string[] args)
        {
            CancellationTokenSource cancellation = new CancellationTokenSource();

            var endpoint = new IPEndPoint(IPAddress.Any, 9000);
            var server = new WebSocketListener(endpoint);
            var rfc = new vtortola.WebSockets.WebSocketFactoryRfc6455();

            server.Standards.RegisterStandard(rfc);
            server.StartAsync();

            Console.WriteLine("Echo Server started at " + endpoint.ToString());

            var task = Task.Run(() => AcceptWebSocketClientsAsync(server, cancellation.Token));
            Console.WriteLine("No turning back now, server started");
            while (true) { }
        }

        static async Task AcceptWebSocketClientsAsync(WebSocketListener server, CancellationToken token)
        {
            while (!token.IsCancellationRequested)
            {
                try
                {
                    var ws = await server.AcceptWebSocketAsync(token).ConfigureAwait(false);
                    if (ws != null)
                        Task.Run(() => HandleConnectionAsync(ws, token));
                }
                catch (Exception aex)
                {
                    Console.WriteLine("Error Accepting clients: " + aex.GetBaseException().Message);
                }
            }
            Console.WriteLine("Server Stop accepting clients");
        }

        static async Task HandleConnectionAsync(WebSocket ws, CancellationToken cancellation)
        {
            try
            {
                while (ws.IsConnected && !cancellation.IsCancellationRequested)
                {
                    String msg = await ws.ReadStringAsync(cancellation).ConfigureAwait(false);
                    if (msg != null)
                    {
                        ws.WriteString(msg);
                        Console.WriteLine("sending: " + msg);
                    }
                    else
                    {
                        ws.WriteString("HOI");
                        Console.WriteLine("sending HOI");
                    }
                    //ws.Dispose();
                }
            }
            catch (Exception aex)
            {
                Console.WriteLine("Error Handling connection: " + aex.GetBaseException().Message);
                try { ws.Close(); }
                catch { }
            }
            finally
            {
                ws.Dispose();
            }
        }

    }

}
