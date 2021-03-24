const domain = '/api';

const prod = process.env.NODE_ENV === 'production';
const Url = {
  domain,
};

export default Url;
