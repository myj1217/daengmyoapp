package com.back.domain.missing;


import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "missing")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Missing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mno;
    private String mname;
    private int age;
    private String gender;
    private String description;
    private double latitude;
    private double longitude;
    private boolean delFlag;

    public void changeDel(boolean delFlag) {
        this.delFlag = delFlag;
    }

    @ElementCollection
    @Builder.Default

    private List<MissingImage> imageList = new ArrayList<>();

    public void changeName(String mname){
        this.mname=mname;
    }
    public void changeGender(String gender){
        this.gender = gender;
    }

    public void changeAge(int age){
        this.age = age;
    }

    public void changeDescription(String description){
        this.description=description;
    }

    public void changeLatitude(double latitude){
        this.latitude=latitude;
    }
    public void changeLongitude(double longitude){
        this.longitude=longitude;
    }



    public void addImage(MissingImage image) {
        image.setOrd(this.imageList.size());
        imageList.add(image);
    }
    public void addImageString(String fileName){
        MissingImage missingImage = MissingImage.builder()
                .fileName(fileName)
                .build();
        addImage(missingImage);
    }
    public void clearList() {
        this.imageList.clear();
    }
}


