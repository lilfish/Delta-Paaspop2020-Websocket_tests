#!/usr/bin/env python

# WS server example

import asyncio
import websockets

async def hello(websocket, path):
		async for message in websocket:
			print(message)
			greeting = "Print: " + message
			await websocket.send(greeting)

start_server = websockets.serve(hello, "localhost", 9000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()