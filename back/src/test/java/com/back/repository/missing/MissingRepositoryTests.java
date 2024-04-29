package com.back.repository.missing;



import com.back.domain.missing.Missing;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class MissingRepositoryTests {
    @Autowired
    MissingRepository missingRepository;

    @Test
    public void testInsertMissing() {
        for (int i = 1; i <= 10; i++) {
            Missing missing = Missing.builder()
                    .mname("missing" + i)
                    .age(1 * i)
                    .gender("gender")
                    .description("notes " + i)
                    .latitude(37.4979)
                    .longitude(127.0276)
                    .build();

            missing.addImageString("missing"+i+".jpg");


            missingRepository.save(missing);

            log.info("-------------------");
        }
    }
}