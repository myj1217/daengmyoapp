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
        String[] genders = {"수컷", "암컷"};
        for (int i = 1; i <= 10; i++) {
            Missing missing = Missing.builder()
                    .mname("missing" + i)
                    .age(1 * i)
                    .gender(genders[i % 2])
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