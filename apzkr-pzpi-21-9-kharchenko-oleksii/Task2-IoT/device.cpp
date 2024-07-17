#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <GxEPD.h>
#include <GxGDEW029Z10/GxGDEW029Z10.h>
#include <GxIO/GxIO_SPI/GxIO_SPI.h>
#include <GxIO/GxIO.h>
#include <Fonts/FreeMonoBold9pt7b.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>

// Wi-Fi credentials
const char* ssid = "WiFiSSID";
const char* password = "WiFiPassword";

// Server details
const char* serverUrl = "http://server.com/api";
const char* apiKey = "api-key";

// Pin definitions
const int RX_PIN = 4;  // GPS module RX pin connected to Arduino pin 4
const int TX_PIN = 5;  // GPS module TX pin connected to Arduino pin 5

// Global objects
GxIO_Class io(SPI, SS, 17, 16);
GxEPD_Class display(io, 16, 4);
TinyGPSPlus gps;
SoftwareSerial gpsSerial(RX_PIN, TX_PIN);

// Global variables
float currentLatitude = 0.0;
float currentLongitude = 0.0;
String currentPrice = "N/A";
bool priceUpdated = false;

void setup() {
  Serial.begin(115200);
  gpsSerial.begin(9600);
  
  // Initialize display
  display.init();
  display.setRotation(1);
  display.setFont(&FreeMonoBold9pt7b);
  display.setTextColor(GxEPD_BLACK);
  
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  
  // Initial display update
  updateDisplay("Initializing...");
}

void loop() {
  // Update GPS data
  updateGPS();
  
  // Check for price updates
  if (WiFi.status() == WL_CONNECTED) {
    checkPriceUpdate();
  }
  
  // Update display if price changed
  if (priceUpdated) {
    updateDisplay(currentPrice);
    priceUpdated = false;
  }
  
  // Send status to server
  sendStatus();
  
  delay(30000);  // Wait for 30 seconds before next cycle
}

void updateGPS() {
  while (gpsSerial.available() > 0) {
    if (gps.encode(gpsSerial.read())) {
      if (gps.location.isValid()) {
        currentLatitude = gps.location.lat();
        currentLongitude = gps.location.lng();
        Serial.print("Latitude: ");
        Serial.println(currentLatitude, 6);
        Serial.print("Longitude: ");
        Serial.println(currentLongitude, 6);
      }
    }
  }
}

void checkPriceUpdate() {
  HTTPClient http;
  http.begin(serverUrl + String("/price"));
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-API-Key", apiKey);
  
  StaticJsonDocument<200> doc;
  doc["latitude"] = currentLatitude;
  doc["longitude"] = currentLongitude;
  
  String requestBody;
  serializeJson(doc, requestBody);
  
  int httpResponseCode = http.POST(requestBody);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    DynamicJsonDocument responseDoc(1024);
    deserializeJson(responseDoc, response);
    
    String newPrice = responseDoc["price"].as<String>();
    if (newPrice != currentPrice) {
      currentPrice = newPrice;
      priceUpdated = true;
    }
  } else {
    Serial.print("Error on sending POST: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();
}

void updateDisplay(String message) {
  display.fillScreen(GxEPD_WHITE);
  display.setCursor(10, 30);
  display.print("Price: ");
  display.print(message);
  display.update();
}

void sendStatus() {
  HTTPClient http;
  http.begin(serverUrl + String("/status"));
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-API-Key", apiKey);
  
  StaticJsonDocument<200> doc;
  doc["deviceId"] = ESP.getChipId();
  doc["latitude"] = currentLatitude;
  doc["longitude"] = currentLongitude;
  doc["price"] = currentPrice;
  doc["wifiStrength"] = WiFi.RSSI();
  
  String requestBody;
  serializeJson(doc, requestBody);
  
  int httpResponseCode = http.POST(requestBody);
  
  if (httpResponseCode > 0) {
    Serial.print("Status sent. Response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("Error sending status: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();
}