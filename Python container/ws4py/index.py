	

from wsgiref.simple_server import make_server
from ws4py.websocket import EchoWebSocket
from ws4py.server.wsgirefserver import WSGIServer, WebSocketWSGIRequestHandler
from ws4py.server.wsgiutils import WebSocketWSGIApplication

with make_server('', 9000, server_class=WSGIServer,
                     handler_class=WebSocketWSGIRequestHandler,
                     app=WebSocketWSGIApplication(handler_cls=EchoWebSocket)) as ws:
	print("Serving WS on port 9000...")
	try:
			ws.serve_forever()
	except KeyboardInterrupt:
			print("Shutting down.")
			ws.server_close()