module.exports = async function(context, req) {
  const alerts = req.body;
  const alertArray = Array.isArray(alerts) ? alerts : [alerts];
  context.log('Alerts received:', JSON.stringify(alertArray));
  for (const alert of alertArray) {
    context.log(`ALERT: Device ${alert.deviceId} temp=${alert.temperature}C`);
  }
  context.res = { status: 200, body: `Processed ${alertArray.length} alert(s)` };
};
