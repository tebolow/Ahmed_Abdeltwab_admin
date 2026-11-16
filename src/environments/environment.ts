const runtimeEnv = (globalThis as any).__ENV__ || {};

export const environment = {
  production: true,
  apiUrl: runtimeEnv.apiUrl || '/api',
  staticURL: runtimeEnv.staticURL || '/api/'
};
