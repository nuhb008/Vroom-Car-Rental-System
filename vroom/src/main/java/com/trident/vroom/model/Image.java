package com.trident.vroom.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    private Long id;
    private String regNo;
    private String name;
    private String type;
    private byte[] data;
}
