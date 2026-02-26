# HS100-P1 — IoT Temperature Monitoring

## CSP451 Week 9 Azure Demo — Option 4

## Resource Group
Student-RG-2027133

## Azure Resources
| Service | Resource Name | Tier |
|---|---|---|
| IoT Hub | HS100-P1-iothub | Free F1 |
| Stream Analytics | HS100-P1-streamjob | Standard S1 |
| Blob Storage | HS100-P1-storage | LRS Hot |
| Function App | HS100-P1-func | Consumption |
| Logic App | HS100-P1-alerter | Workflow Standard |

## Architecture
Simulated IoT Sensors → IoT Hub → Stream Analytics → Blob Storage (archive)
Stream Analytics → Azure Functions (AlertProcessor) → Logic App → Email Alert

## How to Run the Simulator
1. Install dependencies: npm install azure-iot-device azure-iot-device-mqtt
2. Add your IoT Hub device connection strings to simulator.js
3. Run: node simulator.js

## Alert Threshold
- Temperature > 30°C triggers alert email
- Temperature < 5°C triggers alert email
- SENSOR-02 (Server Room) hardcoded to 35.5°C for demo

## Author
Harsahir Singh — Student ID: 165357187
Seneca Polytechnic — CSP451NIA


https://youtu.be/0-Tq-x2wuY4
