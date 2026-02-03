const fs = require('fs');

async function fetchTrustedShopsData() {
  const clientId = process.env.TRUSTED_SHOPS_CLIENT_ID;
  const clientSecret = process.env.TRUSTED_SHOPS_CLIENT_SECRET;
  const channelId = process.env.TRUSTED_SHOPS_CHANNEL_ID;

  try {
    const tokenResponse = await fetch('https://login.etrusted.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        audience: 'https://api.etrusted.com',
      }),
    });

    const { access_token } = await tokenResponse.json();
    const headers = { 'Authorization': `Bearer ${access_token}` };

    const [reviewsResponse, aggregateResponse] = await Promise.all([
      fetch('https://api.etrusted.com/reviews?count=20&status=APPROVED', { headers }).then(r => r.json()),
      fetch(`https://api.etrusted.com/channels/${channelId}/service-reviews/aggregate-rating`, { headers }).then(r => r.json()),
    ]);

    const data = {
      rating365: aggregateResponse['365days']?.rating || 0,
      count365: aggregateResponse['365days']?.count || 0,
      overallCount: aggregateResponse.overall?.count || 0,
      calculatedAt: aggregateResponse.overall?.period?.calculatedAt || new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      reviews: reviewsResponse.items?.map(item => ({
        name: item.customer?.firstName
          ? item.customer.lastName ? `${item.customer.firstName} ${item.customer.lastName[0]}.` : item.customer.firstName
          : 'Community-Mitglied',
        title: item.title || '',
        comment: item.comment || '',
        rating: item.rating || 5,
        submittedAt: item.createdAt || item.submittedAt || new Date().toISOString(),
      })) || []
    };

    fs.writeFileSync('trustedshops-data.json', JSON.stringify(data, null, 2));
    console.log('✅ Data updated successfully');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fetchTrustedShopsData();
