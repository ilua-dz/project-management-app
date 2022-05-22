export function fieldRegExp() {
  return [
    {
      required: true,
      pattern: /^[а-яА-Я-A-Za-z0-9_]{3,}$/
    }
  ];
}

// export function fieldRegExp() {
//   return [
//     {
//       required: true,
//       message: 'Province is required'
//     },
//     {
//       pattern: /^[а-яА-Я-A-Za-z0-9_]{3,}$/,
//       message: 'Province is requir44444ed'
//     }
//   ];
// }
