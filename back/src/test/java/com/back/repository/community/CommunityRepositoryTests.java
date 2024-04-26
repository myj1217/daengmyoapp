package com.back.repository.community;


import com.back.domain.community.Community;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.IntStream;

@SpringBootTest
@Log4j2

public class CommunityRepositoryTests {

    @Autowired
    CommunityRepository communityRepository;

    @Test
    public void testInsertDum() {
        IntStream.rangeClosed(1, 10).forEach(i -> {
                    Community community = Community.builder()
                            .communityTitle("title" + i)
                            .communityContent("content" + i)
                            .communityWriter("user")
                            .communityWriter("user" + i +"@aaa.com")
                            .build();

                    Community result = communityRepository.save(community);
                    log.info("Community: " + result.getCommunityBno());
                }
        );
    }
}
