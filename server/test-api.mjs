async function testAPI() {
  console.log('--- TESTING TRIVO-TRAVEL BACKEND API ---');
  
  // 1. Health
  const healthRes = await fetch('http://localhost:5000/api/health');
  const healthJson = await healthRes.json();
  console.log('1. /api/health:', healthRes.status, healthJson.status === 'ok' ? 'PASS' : 'FAIL');

  // 2. Destinations list
  const destsRes = await fetch('http://localhost:5000/api/destinations?category=Hill%20Station');
  const destsJson = await destsRes.json();
  console.log('2. /api/destinations:', destsRes.status, destsJson.count > 0 ? `PASS (${destsJson.count} items)` : 'FAIL');

  // 3. Single Destination
  const singleRes = await fetch('http://localhost:5000/api/destinations/munnar');
  const singleJson = await singleRes.json();
  console.log('3. /api/destinations/munnar:', singleRes.status, singleJson.data?.name === 'Munnar' ? 'PASS' : 'FAIL');

  // 4. Alerts
  const alertsRes = await fetch('http://localhost:5000/api/alerts');
  const alertsJson = await alertsRes.json();
  console.log('4. /api/alerts:', alertsRes.status, alertsJson.count > 0 ? `PASS (${alertsJson.count} alerts)` : 'FAIL');

  // 5. Trip Generation
  const tripGenRes = await fetch('http://localhost:5000/api/trips/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startingLocation: 'Bangalore',
      destinationId: 'munnar',
      startDate: '2026-11-01',
      durationDays: 3,
      travelersCount: 2,
      budget: 15000,
      interests: ['Nature', 'Hills'],
      pace: 'moderate',
      transportPref: 'car',
      accommodationPref: 'mid_range'
    })
  });
  const tripGenJson = await tripGenRes.json();
  console.log('5. /api/trips/generate:', tripGenRes.status, tripGenJson.success ? `PASS (${tripGenJson.data?.title})` : 'FAIL');

  // 6. AI Chat (Deterministic Fallback)
  const aiRes = await fetch('http://localhost:5000/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Plan a 3-day trip to Munnar under ₹12,000',
      tripContext: { destination: 'Munnar', duration: 3, budget: 12000 }
    })
  });
  const aiJson = await aiRes.json();
  console.log('6. /api/ai/chat:', aiRes.status, aiJson.success && aiJson.reply ? 'PASS' : 'FAIL');

  // 7. Live Weather
  const weatherRes = await fetch('http://localhost:5000/api/weather?latitude=10.0889&longitude=77.0595');
  const weatherJson = await weatherRes.json();
  console.log('7. /api/weather:', weatherRes.status, weatherJson.success ? 'PASS' : 'FAIL');

  console.log('--- ALL BACKEND ENDPOINTS TESTED ---');
}

testAPI().catch(err => console.error('Test execution error:', err));
