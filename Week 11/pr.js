function spec(pr, base) {
    return pr.reverse().reduce((a, b, c) => a + b * base ** c)
  }
  
  console.log(spec([0,1,3,1], 1000000))
  console.log(spec([0,2,0,0], 1000000))
  console.log(spec([0,0,1,0], 1000000))
  console.log(spec([0,0,1,1], 1000000))