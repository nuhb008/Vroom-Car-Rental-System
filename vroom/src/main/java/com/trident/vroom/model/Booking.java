package com.trident.vroom.model;

import lombok.*;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    private int BID;
    private String regNo;
    private Date fromDate;
    private Date tillDate;

    private String status; // ENUM ('Confirmed', 'Cancelled', 'Completed')
}
