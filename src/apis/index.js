import axios from 'axios';
import constants from '../constants';

let getConfig = 'http://localhost:8000/';

const api = (method, url, data = null, token = null) => {
  if (token) {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      credentials: true,
    };
  }
  return axios({
    method: method,
    url: `${getConfig}${url}`,
    data: data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const login = (data) => {
  return api('post', constants.API.LOGIN, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const register = (data) => {
  return api('post', constants.API.REGISTER, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getUserTypes = () => {
  return api('GET', constants.API.GETUSERTYPES)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getTopics = () => {
  return api('GET', constants.API.GETTOPICS)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const addTopic = (data) => {
  return api('POST', constants.API.GETTOPICS, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};


export const getPreferences = (USERiD) => {
  return api('GET', constants.API.GETPREFERENCES + USERiD)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const postPreferences = (userId, preferenceId, action) => {
  return api('POST', `${constants.API.GETPREFERENCES}${userId}/${preferenceId}/${action}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};


export const updateUser = (updations) => {
  return api('post', constants.API.UPDATEUSER, updations)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getusersWithDissertation = (USERiD) => {
  return api('post', constants.API.usersWithDissertation + USERiD)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};