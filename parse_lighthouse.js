const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/HP/Downloads/esponsports.com-20260715T170544.json', 'utf8'));

console.log('--- CATEGORY SCORES ---');
for (const key in data.categories) {
    console.log(`${data.categories[key].title}: ${data.categories[key].score * 100}`);
}

console.log('\n--- CRITICAL METRICS (Performance) ---');
const metrics = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'];
for (const m of metrics) {
    if (data.audits[m]) {
        console.log(`${m}: ${data.audits[m].displayValue} (Score: ${data.audits[m].score})`);
    }
}

console.log('\n--- LCP ELEMENT DETAILS ---');
if (data.audits['largest-contentful-paint-element'] && data.audits['largest-contentful-paint-element'].details) {
    const items = data.audits['largest-contentful-paint-element'].details.items;
    if (items && items.length > 0) {
        console.log(items[0].node.snippet);
    }
}

console.log('\n--- MAIN-THREAD BLOCKING SCRIPTS ---');
if (data.audits['bootup-time'] && data.audits['bootup-time'].details) {
    const items = data.audits['bootup-time'].details.items;
    if (items) {
        items.slice(0, 5).forEach(item => {
            console.log(`URL: ${item.url.substring(0, 80)}... | Time: ${item.total}ms | Scripting: ${item.scripting}ms`);
        });
    }
}

console.log('\n--- UNUSED JAVASCRIPT ---');
if (data.audits['unused-javascript'] && data.audits['unused-javascript'].details) {
    const items = data.audits['unused-javascript'].details.items;
    if (items) {
        items.slice(0, 3).forEach(item => {
            console.log(`URL: ${item.url.substring(0, 80)}... | Wasted Bytes: ${item.wastedBytes}`);
        });
    }
}

console.log('\n--- RENDER-BLOCKING RESOURCES ---');
if (data.audits['render-blocking-resources'] && data.audits['render-blocking-resources'].details) {
    const items = data.audits['render-blocking-resources'].details.items;
    if (items) {
        items.slice(0, 3).forEach(item => {
            console.log(`URL: ${item.url.substring(0, 80)}...`);
        });
    }
}
