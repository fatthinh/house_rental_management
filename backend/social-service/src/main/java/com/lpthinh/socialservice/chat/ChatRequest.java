package com.lpthinh.socialservice.chat;

import java.util.List;

public record ChatRequest(
        List<String> users,
        String message
) {
}
