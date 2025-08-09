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

One core course for the "Biomedical Engineering" branch of my university was "Automatic Control" where we explored machine control theory and its applications. The course had a heavy theoretical part, where we would have to analyze dynamic systems to find the stability points (known as zeros and poles), and design a PID controller to match the reference input value. Although this course had a major impact on many people in my degree (either by frightening or by charming them), it had almost no effect on me, since I did not really have any interest in industrial automatization. However, some years later, I learned about how many of these things where used in robotics, or at least how the "mentality" (or *soft skills*) that I learned where transcribed into this other field. My flatmate, however, had a real interest in Control Theory and MC (so much that he did his final B.Sc. thesis on the matter, you can check it out<a href="https://github.com/GonzaloM786/SVM-based-closed-loop-anesthesia-control-system"> here</a>), therefore, being the susceptible human that I am, I became interested too.

As an amateur that I am, I only know 3 possible technologies in which you can "embed a program" and integrate them in an electrical circuit (with sensors and actuators), these are: (i) Arduino; (ii) ESP32; (iii) Raspberry Pi. The Arduino boards are the easiest to get your way around while being a newbie, however, they lack the IoT component that make this field interesting, the WiFi and Bluetooth module (or at least the basic boards). The Raspberry Pi has always been presented to me as a "little computer", in which you can install a Linux kernel or distro and communicate using the SSH protocol from your main PC, so it is an overkill for little projects like this. The ESP32 however seems like a good place to start, considering my low-level programming skills are sufficient.

While maintaining the best programming practices, this little project is aimed at understanding how to display data in an OLED using the I2C protocol, how to read data from a sensor through an input pin of the ESP32, and how to connect and send JSON information using the ESP32 WiFi functionality to my computer. 


# Materials

Everything used in this project can be found in the<a href="https://www.aliexpress.com/item/1005006065671964.html?spm=a2g0o.order_list.order_list_main.76.24b2194dJIaEtR"> ESP32 Development Kit</a> linked. The software used for programming is PlatformIO, which is a VSCode extension, you can find useful guides on PlatformIO <a href="https://randomnerdtutorials.com/vs-code-platformio-ide-esp32-esp8266-arduino/">here</a>.

# Breadboard Setting

<figure id="fig1">
<img src="/assets/images/blog/humiditytemp/humidity_temperature_display_bb.png" alt="Fritzing schematic">
<figcaption>
    <i> Fig 1. Fritzing circuit schematic. </i>
</figcaption>
</figure>

[Fig 1](#fig1) shows the circuit schematic used for this project. I tried to tide it as much as possible, so there are some useless jumping wires here and there. The important part of the schematic is the pin allocation for each component of the circuit. We will be using PINs 21 and 22 for I2C communication with the OLED, where the pin 21 will be used for data transfer (SDA) and the pin 22 for clock signal (SCL). For I/O communication with the DHT11 sensor you can use either PIN 4 or 5. [Fig 1](#fig1) shows PIN 4, but in the end I used PIN 5, just make sure to change it in the code. I created a <code>config.h</code> file with the following configuration:

<div class="code-block">
  <code data-lang="cpp">
#pragma once

#include <Arduino.h>

namespace cfg {
    // GPIOs
    constexpr gpio_num_t PIN_DHT      = GPIO_NUM_5;
    constexpr uint8_t    I2C_SDA      = 21;
    constexpr uint8_t    I2C_SCL      = 22;

    // I2C display
    constexpr uint8_t    OLED_ADDR    = 0x3C; // OLED I2C address, i decided to define it on my own
    constexpr uint16_t   OLED_W       = 128;
    constexpr uint16_t   OLED_H       = 64;

    // Task timing
    constexpr TickType_t SENSOR_PERIOD = pdMS_TO_TICKS(2000); // DHT11 max 0.5 Hz
    constexpr TickType_t UI_PERIOD     = pdMS_TO_TICKS(500);  // smoother refresh

    // From now on, WiFi credentials, defined in config.cpp
    // WiFi credentials
    extern const char* WIFI_SSID;
    extern const char* WIFI_PASS;
    
    // Server endpoint
    extern const char* SERVER_URL;
    
    // I decided to send the data in batchs to avoid network saturation
    constexpr size_t READINGS_PER_BATCH = 10;
    constexpr size_t NETWORK_QUEUE_SIZE = 5;
} // namespace cfg
  </code>
</div>

The <code>config.cpp</code> file is as simple as:

<div class="code-block">
  <code data-lang="cpp">
#include "config.h"

namespace cfg {
    // WiFi credentials
    const char* WIFI_SSID = "(wifi SSID)";
    const char* WIFI_PASS = "(password)";
    
    // Server endpoint
    const char* SERVER_URL = "http://(your computer IP):8080/sensor-data";
}
  </code>
</div>



