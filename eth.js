const fs = require('fs')
const { randomBytes } = require('crypto')
const secp256k1 = require('secp256k1')
const keccak256 = require('js-sha3').keccak256
const keccak256s = require('./keccak')

const config = JSON.parse(fs.readFileSync('./config.json'))
const { count, isCase, prefix, suffix, logical } = config
const regArr = config.regArr.map(str => new RegExp(str))

const hasRepeatedWords = str => {
  return regArr.some(p => {
    const before = prefix && p.test(str.slice(0, prefix))
    const after = suffix && p.test(str.slice(-suffix))
    return logical === '&&' || logical === 'AND' ? before && after : before || after
  })
}

const toChecksum = address => {
  const addressHash = keccak256s(address)
  let checksumAddress = ''
  for (let i = 0; i < 40; i++)
    checksumAddress += parseInt(addressHash[i + 2], 16) > 7 ? address[i].toUpperCase() : address[i]
  return checksumAddress
}

const getEthAddress = privateKey => {
  const publicKey = secp256k1.publicKeyCreate(privateKey, false)
  const hash = keccak256(Buffer.from(publicKey.slice(1), 'hex'))
  return isCase ? toChecksum(hash.slice(-40)) : hash.slice(-40)
}

for (let index = 0; index < count; index++) {
  const privKey = randomBytes(32)
  const address = getEthAddress(privKey)
  if (hasRepeatedWords(address)) {
    fs.appendFileSync(
      './output.txt',
      JSON.stringify(['0x' + address, privKey.toString('hex')]) + '\r\n'
    )
  }
}
