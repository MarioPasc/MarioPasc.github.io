---
title: "Simple ESP-32 Humidity and Temperature Module"
date: 2025-08-01
layout: post
tag: esp32
---

---
**Abstract**

In my free time, I like to explore other fields related to engineering. While scrolling on AliExpress, I saw a cheap ESP32 dev kit, which included an OLED (128x64) display and a DHT11 temperature and humidity sensor. I decided to make a small project to know which tech stack is needed to develop and deploy small DIY projects on this MC. The whole codebase is available in this<a href="https://github.com/MarioPasc/ESP32_HUMIDITYTEMPERATURE"> GitHub repository</a>. 

This blog entry serves as a tutorial, where I try to explain all my code and steps, as well as my thoughts on the process of building this.

---

# Introduction

One core course for the "Biomedical Engineering" branch of my university was "Automatic Control" where we explored machine control theory and its applications. The course had a heavy theoretical part, where we would have to analyze dynamic systems to find the stability points (known as zeros and poles), and design a PID controller to match the reference input value. Although this course had a major impact on many people in my degree (either by frightening them or by charming them), it had almost no effect on me, since I did not really have any interest in industrial automatization. However, some years later, I learned about how many of these things where used in robotics, or at least how the "mentality" (or *soft skills*) that I learned where transcribed into this other field. My flatmate, however, had a real interest in Control Theory and MC (so much that he did his final B.Sc. thesis on the matter, you can check it out<a href="https://github.com/GonzaloM786/SVM-based-closed-loop-anesthesia-control-system"> here</a>), therefore, being the susceptible human that I am, I became interested too.

As an amateur that I am, I only know 3 possible technologies in which you can "embed a program" and integrate them in an electrical circuit (with sensors and actuators), these are: (i) Arduino; (ii) ESP32; (iii) Raspberry Pi. The Arduino boards are the easiest to get your way around while being a newbie, however, they lack the IoT component that make this field interesting, the WiFi and Bluetooth module (or at least the basic boards). The Raspberry Pi has always been presented to me as a "little computer", in which you can install a Linux kernel or distro and communicate using the SSH protocol from your main PC, so it is an overkill for little projects like this. The ESP32 however seems like a good place to start, considering my low-level programming skills are sufficient.

