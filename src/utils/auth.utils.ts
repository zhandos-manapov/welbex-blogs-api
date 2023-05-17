import crypto from 'crypto'

// const issueJWT = (user: { email: string }) => {
//     const { email } = user
//     const payload = {
//         sub: email,
//         iat: Date.now()
//     }
//     const signedJWT = jwt.sign(payload, PRIVATE_KEY, { expiresIn: '1d', algorithm: 'RS256' })
//     return {
//         token: 'Bearer ' + signedJWT,
//         expiresIn: '1d'
//     }
// }

// function validPassword(password: string, hash: string, salt: string) {
//     var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
//     return hash === hashVerify
// }

function genHash(password: string) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

    return {
        salt: salt,
        hash: genHash
    }
}


export {
    genHash
}