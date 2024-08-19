import * as crypto from 'crypto';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface RequestData {
  apiKey: string;
  username: string;
  password: string;
}

interface ResponseData {
  token: string;
}

export async function AuthServiceClient(
  data: RequestData,
  publicKey: string, // Se recibe la clave pública como un parámetro
): Promise<ResponseData | undefined> {
  const { username, password } = data;
  const apiKey = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyjFpIBsDEFzDEPZeUxwV\nTcvd1Q7t8e9JjWGyz/Dgc2MAbnxNOsCxQaV0cTLj94gx38nm0xc3qlv58m7eE60C\n5RUhNd4MZnSmiMyj3c/Pugz0WDz6QuIvnAIcqc67DbomrnL39DB+eUDl0M/GmtEY\nAPtYPVe8m2WoC8/Khqc8OHSAPyEwXUMnI2iz/2XA/4WhA0eYZSXvsAESn9YnBNgq\noKRGh7wAsP783rJCPLe7Hjaa2GFNDTB/fa3gcU+WDfX6/sP5lv3G8OfDdMbhW1x7\nKS2P/Xo3pkU8YrgAVUfoXwSX08sqBSiCH4YuHAodn5Sr1qz21Y41eGlccr6P0E4L\nCQIDAQAB\n-----END PUBLIC KEY-----\n`;
  // Asegúrate de que la clave pública no se altere antes del cifrado
  if (
    !publicKey.includes('-----BEGIN PUBLIC KEY-----') ||
    !publicKey.includes('-----END PUBLIC KEY-----')
  ) {
    throw new Error('Formato de clave pública incorrecto');
  }

  // Cifrado de username y password utilizando la clave pública
  const encryptedUsername = crypto
    .publicEncrypt(publicKey, Buffer.from(username, 'utf8'))
    .toString('base64');

  const encryptedPassword = crypto
    .publicEncrypt(publicKey, Buffer.from(password, 'utf8'))
    .toString('base64');

  const config: AxiosRequestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/auth/login',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    data: JSON.stringify({
      username: encryptedUsername,
      password: encryptedPassword,
    }),
  };

  try {
    const response: AxiosResponse<ResponseData> = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error('Error making request:', error);
    return undefined;
  }
}