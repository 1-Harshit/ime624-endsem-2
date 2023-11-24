/* eslint-disable eqeqeq */

const a = [
  '',
  'one ',
  'two ',
  'three ',
  'four ',
  'five ',
  'six ',
  'seven ',
  'eight ',
  'nine ',
  'ten ',
  'eleven ',
  'twelve ',
  'thirteen ',
  'fourteen ',
  'fifteen ',
  'sixteen ',
  'seventeen ',
  'eighteen ',
  'nineteen ',
];
const b = [
  '',
  '',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];

const regex = /^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/;

const getLT20 = (n: string) => a[Number(n)];
const getGT20 = (n: string) => `${b[Number(n[0])]} ${a[Number(n[1])]}`;

const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, (txt) =>
    txt === 'and'
      ? txt
      : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );

const numWords = (input: number) => {
  const num = Math.abs(Math.round(Number(input)));
  if (Number.isNaN(num)) return '';
  if (num === 0) return 'zero';

  const numStr = num.toString();
  if (numStr.length > 9) {
    throw new Error('overflow'); // Does not support converting more than 9 digits yet
  }

  const [, n1, n2, n3, n4, n5] = `000000000${numStr}`
    .substr(-9)
    .match(regex) as RegExpMatchArray; // left pad zeros

  let str = '';
  str += Number(n1) != 0 ? `${getLT20(n1) || getGT20(n1)}crore ` : '';
  str += Number(n2) != 0 ? `${getLT20(n2) || getGT20(n2)}lakh ` : '';
  str += Number(n3) != 0 ? `${getLT20(n3) || getGT20(n3)}thousand ` : '';
  str += Number(n4) != 0 ? `${getLT20(n4)}hundred ` : '';
  str += Number(n5) != 0 && str != '' ? 'and ' : '';
  str += Number(n5) != 0 ? getLT20(n5) || getGT20(n5) : '';

  return `${toTitleCase(str.trim())} Rupees Only`;
};

export default numWords;
