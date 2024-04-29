package com.back.repository.animal;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.back.domain.animal.Animal;
import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class AnimalRepositoryTests {
    @Autowired
    AnimalRepository animalRepository;

    @Test
    public void testInsertAnimal() {
        for (int i = 1; i <= 10; i++) {
            Animal animal = Animal.builder()
                    .aname("pet" + i)
                    .age(1 * i)
                    .gender("gender")
                    .notes("notes " + i)
                    .build();

            animal.addImageString("animal"+i+".jpg");


            animalRepository.save(animal);

            log.info("-------------------");
        }
    }
}