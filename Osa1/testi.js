const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(t)
console.log(first, second)  // tulostuu 1, 2
console.log(rest)          // tulostuu [3, 4 ,5]

/////

const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  