export const setToken = (token: string) => {  
    localStorage.setItem('token', token);
  };
  
  export const getToken = () => {
    const token = localStorage.getItem('token');
  return token;
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export const isAuthenticated = () => {
    return !!getToken();
  };
  
  export const setUsernameFromBackend = (username: string) => {
    localStorage.setItem('username', username);
  };
  export const setUserIdFromBackend = (userId: string) => {
    localStorage.setItem('userId', userId);
  };
  
  export const getUsername = () => {
    return localStorage.getItem('username');
  };
  export const getUserId = () => {
    return localStorage.getItem('userId');
  };
  
  export const removeUsername = () => {
    localStorage.removeItem('username');
  };