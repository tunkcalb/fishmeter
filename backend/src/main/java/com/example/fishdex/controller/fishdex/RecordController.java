package com.example.fishdex.controller.fishdex;

import com.example.fishdex.service.fishdex.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;
}