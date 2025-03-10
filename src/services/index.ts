import themeChangeService from './themeChangeService';

const registerServices = () => {
  const configurationChangeDisplose = themeChangeService();

  return {
    configurationChangeDisplose,
  };
};

export default registerServices;
