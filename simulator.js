const { Client, Message } = require('azure-iot-device');
const { Mqtt } = require('azure-iot-device-mqtt');

// Load sensitive values from environment variables
const LOGIC_APP_URL = process.env.LOGIC_APP_URL;

const devices = [
  {
    id: 'SENSOR-01',
    connStr: process.env.SENSOR_01_CONN,
    location: 'Warehouse A'
  },
  {
    id: 'SENSOR-02',
    connStr: process.env.SENSOR_02_CONN,
    location: 'Server Room'
  },
  {
    id: 'SENSOR-03',
    connStr: process.env.SENSOR_03_CONN,
    location: 'Cold Storage'
  }
];

// Validate environment variables before running
devices.forEach(device => {
  if (!device.connStr) {
    console.error(`Missing connection string for ${device.id}`);
    process.exit(1);
  }
});

if (!LOGIC_APP_URL) {
  console.error('Missing LOGIC_APP_URL environment variable');
  process.exit(1);
}

devices.forEach(device => {
  const client = Client.fromConnectionString(device.connStr, Mqtt);

  client.open((err) => {
    if (err) {
      console.error(`[${device.id}] Failed:`, err.message);
      return;
    }

    console.log(`[${device.id}] Connected to IoT Hub`);

    setInterval(async () => {
      const temp =
        device.id === 'SENSOR-02'
          ? 35.5
          : parseFloat((Math.random() * 20 + 5).toFixed(1));

      const humidity = parseFloat((Math.random() * 60 + 30).toFixed(1));

      const payload = JSON.stringify({
        deviceId: device.id,
        location: device.location,
        temperature: temp,
        humidity: humidity
      });

      const msg = new Message(payload);

      client.sendEvent(msg, (err) => {
        if (err)
          console.error(`[${device.id}] Send error:`, err.message);
        else
          console.log(
            `[${device.id}] Sent: temp=${temp}C humidity=${humidity}%`
          );
      });

      if (temp > 30 || temp < 5) {
        try {
          await fetch(LOGIC_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload
          });

          console.log(
            `[${device.id}] ALERT sent to Logic App: temp=${temp}C`
          );
        } catch (err) {
          console.error(
            `[${device.id}] Logic App error:`,
            err.message
          );
        }
      }
    }, 5000);
  });
});
