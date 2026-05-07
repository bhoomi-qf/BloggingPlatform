import instance from './axios';

const login = async (email, password) => {
  try {
    const response = await instance.post(
      '/auth/login',
      {
        email,
        password,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export default login;