package com.back.repository.notice;


import com.back.domain.notice.Notice;
import com.back.repository.notice.NoticeRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.IntStream;

@SpringBootTest
@Log4j2

public class NoticeRepositoryTests {

    @Autowired
    NoticeRepository noticeRepository;

    @Test
    public void testInsertDum() {
        IntStream.rangeClosed(1, 10).forEach(i -> {
                    Notice notice = Notice.builder()
                            .noticeTitle("noticeTitle" + i)
                            .noticeContent("noticeContent" + i)
                            .noticeWriter("master")
                            .build();

                    Notice result = noticeRepository.save(notice);
                    log.info("Notice: " + result.getNoticeBno());
                }
        );
    }

}
