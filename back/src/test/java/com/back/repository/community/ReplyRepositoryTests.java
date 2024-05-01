package com.back.repository.community;

import com.back.domain.community.Community;
import com.back.domain.community.Reply;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ReplyRepositoryTests {
    @Autowired
    ReplyRepository replyRepository;

    @Test
    public void testInsertReply() {
        Long communityBno = 11L;
        Community community = Community.builder().communityBno(communityBno).build();
        for (int i = 1; i <= 10; i++) {
            Reply reply = Reply.builder()
                    .community(community)
                    .replyContent("댓글내용" + i)
                    .replyWriter("홍길동")
                    .build();
            replyRepository.save(reply);

            log.info("-------------------");
        }
    }
}
