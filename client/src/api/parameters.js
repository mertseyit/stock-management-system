const API_PARAMETERS = {
  HOST_NAME: 'localhost',
  PORT: 8080,
  API_VERSION: 'api/v1',
};

export const PROCESS_TYPE = [
  {
    label: 'Giriş',
    value: 0,
  },
  {
    label: 'Çıkış',
    value: 1,
  },
];

export const API_URL = `http://${API_PARAMETERS.HOST_NAME}:${API_PARAMETERS.PORT}/${API_PARAMETERS.API_VERSION}`;

console.log(API_URL);

export default API_PARAMETERS;
