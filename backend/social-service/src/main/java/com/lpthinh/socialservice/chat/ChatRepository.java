package com.lpthinh.socialservice.chat;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {

    @Query("{ '$or': [ { 'first': ?0 }, { 'second': ?0 } ] }")
    List<Chat> findMyChats(String userId);
}
