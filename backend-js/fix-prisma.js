const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const models = [
  'account_types', 'banks', 'budgets', 'categories', 'group_user', 'groups',
  'savings_goals', 'shared_debt_splits', 'shared_debts', 'transaction_logs',
  'transactions', 'user_accounts', 'users'
];

walkDir('src', function(filePath) {
  if (filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    models.forEach(model => {
      const camel = model.replace(/_([a-z])/g, g => g[1].toUpperCase());
      content = content.replace(new RegExp('this\\.prisma\\.' + model + '\\b', 'g'), 'this.prisma.' + camel);
      content = content.replace(new RegExp('tx\\.' + model + '\\b', 'g'), 'tx.' + camel);
    });
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed:', filePath);
    }
  }
});
