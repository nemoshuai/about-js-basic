// 转化标准货币格式字符串
const formatCurrency = originAmountText => {
  const originAmountNum = Number(originAmountText);
  if (!_.isNumber(originAmountNum)) {
    return '0';
  }

  const fixedAmountNum = originAmountNum.toFixed(2);
  const [integer, decimal] = String(fixedAmountNum).split('.');
  let formatInteger = integer
    .split('')
    .reverse()
    .join('');
  formatInteger = formatInteger.match(/\d{1,3}/g).join(',');
  return `${formatInteger
    .split('')
    .reverse()
    .join('')}.${decimal}`;
};