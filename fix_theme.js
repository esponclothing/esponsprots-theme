const fs = require('fs');
let c = fs.readFileSync('snippets/tinkal-x-esponsports-checkout.liquid', 'utf8');

c = c.replace(
  'let payAmt = baseTotal - disc;',
  'let payAmt = Math.max(0, (baseTotal - disc) - (waWalletApplied ? waWalletAppliedAmt : 0));'
);
c = c.replace(
  'let payAmt = advanceAmt;',
  'let payAmt = Math.max(0, advanceAmt - (waWalletApplied ? waWalletAppliedAmt : 0));'
);
c = c.replace(
  'let payAmt = baseTotal + fee;',
  'let payAmt = Math.max(0, (baseTotal + fee) - (waWalletApplied ? waWalletAppliedAmt : 0));'
);

fs.writeFileSync('snippets/tinkal-x-esponsports-checkout.liquid', c);
console.log('done payAmt local theme');
