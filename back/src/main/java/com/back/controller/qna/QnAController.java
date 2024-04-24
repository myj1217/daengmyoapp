package com.back.controller.qna;


import com.back.domain.qna.QnA;
import com.back.dto.qna.QnADTO;
import com.back.service.qna.QnAService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping(value = "/qna")

public class QnAController {

    @Autowired
    private QnAService qnAService;

    public QnAController(QnAService qnAService) {
        this.qnAService = qnAService;
    }

    @PostMapping("/form")
    public String qnaForm(@RequestBody QnADTO qnADTO) {
        try {
            qnAService.sendEmail(qnADTO.getName(), qnADTO.getEmail(), qnADTO.getMessage());
            return "Form submitted successfully!";
        } catch (MailException ex) {
            return "Error submitting form: " + ex.getMessage();
        }
    }
}