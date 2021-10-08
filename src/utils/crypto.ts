import CryptoJS from 'crypto-js';
import config from '../../config/config';

/** 加密
 * @param word 加密数据
 */
const encrypt = (word: string) => {
  word = `${word || ''}`;
  if (word) {
    try {
      const key = CryptoJS.enc.Utf8.parse(config.crypto.key);
      const iv = CryptoJS.enc.Utf8.parse(config.crypto.iv);
      const encoded = CryptoJS.AES.encrypt(word, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString();
      return encoded;
    } catch (err) {
      return err;
    }
  }
  return '';
};

/** 加密
 * @param word 解密数据
 */
const decrypt = (word: string) => {
  word = `${word || ''}`;
  if (word) {
    try {
      const key = CryptoJS.enc.Utf8.parse(config.crypto.key);
      const iv = CryptoJS.enc.Utf8.parse(config.crypto.iv);
      const decode = CryptoJS.AES.decrypt(word, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return decode.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      return err;
    }
  }
  return '';
};

export { encrypt, decrypt };
