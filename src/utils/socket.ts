import { io, Socket } from "socket.io-client";

// Declare socket as a variable
let socket: Socket;

// Export a function to initialize the socket with a token
export function initializeSocket(): Socket {
	if (!socket) {
		// Instantiate the socket only if it hasn't been initialized
		socket = io("http://your_IP:8080", {
			query: { token: getTokenFromCookie() },
		});
	}

	return socket;
}

// Utility function to get the token from cookies
function getTokenFromCookie(): string | undefined {
	const cookies = document.cookie.split("; ");
	for (const cookie of cookies) {
		const [name, value] = cookie.split("=");
		if (name === "token") {
			return value;
		}
	}
	return undefined;
}

export { socket }
