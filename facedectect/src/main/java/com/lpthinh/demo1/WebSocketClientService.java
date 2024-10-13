package com.lpthinh.demo1;

import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.lang.reflect.Type;

public class WebSocketClientService {

    private WebSocketStompClient stompClient;
    private StompSession stompSession;

    public WebSocketClientService(String url) {
        // Set up WebSocket and STOMP client
        StandardWebSocketClient webSocketClient = new StandardWebSocketClient();
        stompClient = new WebSocketStompClient(webSocketClient);
        stompClient.setMessageConverter(new StringMessageConverter());

        // Connect to the WebSocket server
        stompClient.connect(url, new StompSessionHandlerAdapter() {
            @Override
            public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
                System.out.println("Connected to WebSocket server");
                stompSession = session;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                System.out.println("Received message: " + payload.toString());
            }

            @Override
            public void handleException(StompSession session, StompCommand command, StompHeaders headers, byte[] payload, Throwable exception) {
                System.err.println("WebSocket error: " + exception.getMessage());
            }

            @Override
            public Type getPayloadType(StompHeaders headers) {
                return String.class;
            }
        });
    }

    // Method to send messages to the WebSocket server
    public void sendMessage(String destination, String message) {
        if (stompSession != null && stompSession.isConnected()) {
            stompSession.send(destination,  message);
        } else {
            System.out.println("Not connected to WebSocket server.");
        }
    }
}