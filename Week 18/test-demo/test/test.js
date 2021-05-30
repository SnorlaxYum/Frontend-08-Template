var assert = require('assert')

import { add, mul } from '../add.js'

describe('add function testing', function () {
  it('1 + 2 should be 3', function () {
    assert.equal(add(1, 2), 3)
  })
  it('-5 + 2 should be -3', function () {
    assert.equal(add(-5, 2), -3)
  })
  it('2 * 2 should be 4', function () {
    assert.equal(mul(2, 2), 4)
  })
})