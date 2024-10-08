package com.lpthinh.socialservice.post;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class Post {
    @Id
    private String id;
    private String author;
    private String content;
    private LocalDateTime createdAt;
}
