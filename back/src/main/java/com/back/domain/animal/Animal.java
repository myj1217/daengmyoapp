package com.back.domain.animal;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "animal")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Animal{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ano;
    private String aname;
    private int age;
    private String gender;
    private String notes;
    private boolean delFlag;

    public void changeDel(boolean delFlag) {
        this.delFlag = delFlag;
    }
    @ElementCollection
    @Builder.Default

    private List<AnimalImage> imageList = new ArrayList<>();

    public void changeName(String aname){
    this.aname=aname;
    }
    public void changeGender(String gender){
    this.gender = gender;
    }

    public void changeAge(int age){
    this.age = age;
    }

    public void changeNotes(String notes){
    this.notes=notes;
    }



    public void addImage(AnimalImage image) {
    image.setOrd(this.imageList.size());
    imageList.add(image);
    }
    public void addImageString(String fileName){
    AnimalImage animalImage = AnimalImage.builder()
            .fileName(fileName)
            .build();
    addImage(animalImage);
    }
    public void clearList() {
    this.imageList.clear();
    }
}
