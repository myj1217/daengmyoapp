package com.back.repository.missing;

import com.back.domain.missing.Missing;
import com.back.domain.missing.MissingReply;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class MissingReplyRepositoryTests {
    @Autowired
    MissingReplyRepository missingReplyRepository;

    @Test
    public void testInsertReply() {
        Long mno = 2L;

        Missing missing = Missing.builder().mno(mno).build();
        for (int i = 1; i <= 10; i++) {
            MissingReply missingReply = MissingReply.builder()
                    .missing(missing)
                    .missingReplyText("location" + i)
                    .missingReplyer("someone")
                    .build();

            missingReplyRepository.save(missingReply);

            log.info("-------------------");
        }
    }
}