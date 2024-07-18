package com.lpthinh.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author admin
 */
@Controller
public class CommonController {
    
    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("myName", "thinh");
        return "index";
    }
}
