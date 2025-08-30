#include <WiFi.h>
#include <HTTPClient.h>
#include "time.h"

const char *ssid = "moto g32_7920";
const char *password = "abcd1234";
const char *walletId = "0xAD0404CdebB4f937eB1228f70a1B79F50CB55f98";

const char *ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 0;
const int daylightOffset_sec = 3600;

typedef struct apiDetails
{
    String walletId;
    float units;
    String deviceId;
    String timeStamp;
} apiDetails;

// Sample data arrays for testing
const String sampleWallets[] = {
    "0xAD0404CdebB4f937eB1228f70a1B79F50CB55f98",
    "0x742D35Cc6334C95e5156e8A9D7c1b3E2F8D93C21",
    "0x8B5C7F91E4A2D6B8F3E9C4A7D1F5E8B2C6A9E3D7",
    "0x1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T",
    "0x9F8E7D6C5B4A39281746352819475638291047563"};

const String sampleDeviceIds[] = {
    "esp32-001",
    "esp32-sensor-alpha",
    "esp32-node-beta",
    "esp32-device-gamma",
    "esp32-monitor-delta"};

const float sampleUnitsRange[][2] = {
    {0.5, 2.5}, // Energy consumption range 1
    {1.0, 5.0}, // Energy consumption range 2
    {0.8, 3.2}, // Energy consumption range 3
    {1.5, 4.8}, // Energy consumption range 4
    {0.3, 1.9}  // Energy consumption range 5
};

bool WalletFlag = false;
int sampleIndex = 0;

// Replace with your server endpoint
const char *serverURL = "http://httpbin.org/post"; // Test endpoint - replace with your actual server

String getFormattedTime()
{
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo))
    {
        Serial.println("Failed to obtain time");
        return "1970-01-01T00:00:00Z";
    }

    char timeStringBuff[50];
    strftime(timeStringBuff, sizeof(timeStringBuff), "%Y-%m-%dT%H:%M:%SZ", &timeinfo);
    return String(timeStringBuff);
}

float generateSampleUnits(int index)
{
    // Generate random units within the specified range for the current sample
    float minUnits = sampleUnitsRange[index][0];
    float maxUnits = sampleUnitsRange[index][1];

    // Generate random float between min and max
    float randomUnits = minUnits + (random(0, 1000) / 1000.0) * (maxUnits - minUnits);

    // Round to 1 decimal place
    return round(randomUnits * 10.0) / 10.0;
}

void setup()
{
    Serial.begin(115200);
    delay(1000);

    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    Serial.println("\nConnecting");

    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(100);
    }

    Serial.println("\nConnected to the WiFi network");
    Serial.print("Local ESP32 IP: ");
    Serial.println(WiFi.localIP());

    // Initialize and get the time
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

    // Wait for time to be set
    Serial.println("Waiting for time synchronization...");
    while (time(nullptr) < 8 * 3600 * 2)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nTime synchronized!");

    // Initialize random seed
    randomSeed(analogRead(0));

    Serial.println("\n=== Starting Sample Data Transmission ===");
    Serial.println("Sending data every 2.5 seconds with sample variations...\n");
}

void loop()
{
    // Check if WiFi is still connected
    if (WiFi.status() == WL_CONNECTED)
    {
        HTTPClient http;

        // Create API details structure with sample data
        apiDetails newApi;

        // Cycle through sample data arrays
        int currentSampleIndex = sampleIndex % 5;

        newApi.walletId = sampleWallets[currentSampleIndex];
        newApi.units = generateSampleUnits(currentSampleIndex);
        newApi.deviceId = sampleDeviceIds[currentSampleIndex];
        newApi.timeStamp = getFormattedTime();

        // Initialize HTTP client
        http.begin(serverURL);

        // Set content type header
        http.addHeader("Content-Type", "application/json");

        // Create JSON payload according to your specification
        String jsonPayload = "{";
        jsonPayload += "\"wallet\":\"" + newApi.walletId + "\",";
        jsonPayload += "\"units\":" + String(newApi.units, 1) + ",";
        jsonPayload += "\"device_id\":\"" + newApi.deviceId + "\",";
        jsonPayload += "\"device_timestamp\":\"" + newApi.timeStamp + "\"";
        jsonPayload += "}";

        Serial.println("=== Sample Data #" + String(sampleIndex + 1) + " ===");
        Serial.println("Device: " + newApi.deviceId);
        Serial.println("Wallet: " + newApi.walletId);
        Serial.println("Units: " + String(newApi.units, 1));
        Serial.println("Timestamp: " + newApi.timeStamp);
        Serial.println("JSON Payload:");
        Serial.println(jsonPayload);

        // Send POST request
        int httpResponseCode = http.POST(jsonPayload);

        // Check if request was successful
        if (httpResponseCode > 0)
        {
            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);

            if (httpResponseCode == 200 || httpResponseCode == 201)
            {
                Serial.println("✓ Data sent successfully!");

                // Optional: Print server response
                String response = http.getString();
                Serial.println("Server response preview: " + response.substring(0, 200) + "...");
            }
            else
            {
                Serial.print("✗ HTTP Error - Response code: ");
                Serial.println(httpResponseCode);
            }
        }
        else
        {
            Serial.print("✗ Error sending HTTP request: ");
            Serial.println(http.errorToString(httpResponseCode));
        }

        // Close connection
        http.end();

        // Increment sample index for next iteration
        sampleIndex++;

        Serial.println("Next transmission in 2.5 seconds...\n");
    }
    else
    {
        Serial.println("WiFi Disconnected! Attempting to reconnect...");
        WiFi.begin(ssid, password);
        while (WiFi.status() != WL_CONNECTED)
        {
            Serial.print(".");
            delay(500);
        }
        Serial.println("\nReconnected to WiFi");
    }

    delay(2500); // Wait 2.5 seconds before next reading
}