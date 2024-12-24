const User = require('../model/user.js')
const bcyrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPass = await bcyrpt.hash(password, 10)

    try {
        const user = await User.create({ username, email, password: hashedPass })
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı oluşturulurken hata oluştu!" })
        }

        res.status(201).json({ message: "Kullanıcı Başarıyla Oluşturuldu!", user: user })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Beklenmedik bir hatayla karşılaşıldı!" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı Bulunamadı!" })
        }

        const passValid = await bcyrpt.compare(password, user.password);

        if (!passValid) {
            return res.status(404).json({ message: "Şifreniz Geçersiz!" })
        }

        const token = jwt.sign({ userId: user._id, email: user.email, username: user.username }, SECRET_KEY, { expiresIn: '4h' })

        res.status(200).json({ message: `Hoşgeldiniz sayın ${user.username}`, token: token })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Beklenmedik bir hatayla karşılaşıldı!" });
    }
}

module.exports = { register, login };