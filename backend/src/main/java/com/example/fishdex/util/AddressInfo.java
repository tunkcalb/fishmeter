package com.example.fishdex.util;

import lombok.Data;

import java.util.Arrays;

@Data
public class AddressInfo {
    private Document[] documents;

    @Data
    public static class Document {
        private RoadAddress road_address;
        private Address address;
    }

    @Data
    public static class RoadAddress {
        private String address_name;
        private String region_1depth_name;
        private String region_2depth_name;
        private String region_3depth_name;
        private String road_name;
        private String underground_yn;
        private String main_building_no;
        private String sub_building_no;
        private String building_name;
        private String zone_no;
    }

    @Data
    public static class Address {
        private String address_name;
        private String region_1depth_name;
        private String region_2depth_name;
        private String region_3depth_name;
        private String mountain_yn;
        private String main_address_no;
        private String sub_address_no;
    }

    @Override
    public String toString() {
        return "AddressInfo{" +
                "documents=" + Arrays.toString(documents) +
                '}';
    }
}

