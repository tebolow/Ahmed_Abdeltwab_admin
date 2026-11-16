const runtimeEnv = (globalThis as any).__ENV__ || {};

export const environment = {
  production: false,
  apiUrl: runtimeEnv.apiUrl || 'http://localhost:2300',
  staticURL: runtimeEnv.staticURL || 'http://localhost:2300/'
};

