import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = 'xhgbdjmß';
const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    SECRET, { expiresIn: '7d' },
    // eslint-disable-next-line function-paren-newline
    );
    return token;
  },
};


export default Helper;
