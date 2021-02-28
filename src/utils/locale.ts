export default function locale(number: string | number, text: Record<any, any> | string[]) {

  const num: string = typeof number === 'string' ? number : `${number}`,
    reg = {
      '24': /^\d*[2-4]$/gi,
      '59': /^\d*[0 5-9]$/gi
    },
    numbers = [ '10', '11', '12', '13', '14', '15', '16', '17', '18', '19' ]

  let numberstr = ''

  if (Array.isArray(text)) {

    const n = num as unknown as number
    return number + ' ' +
      text[ n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2 ]

  } else {

    if (numbers.map(n => `${num.endsWith(n)}`).includes('true')) {
      numberstr += `${num} ${text[ '59' ]}`
    } else {
      const output = num.endsWith('1')
        ? text[ '1' ]
        : reg[ '24' ].test(num)
          ? text[ '24' ]
          : reg[ '59' ].test(num)
            ? text[ '59' ]
            : text[ '59' ]
      numberstr += `${num} ${output}`
    }

  }

  return numberstr
}
