export const setToken = (token: string) => {
    localStorage.setItem('token', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
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
  
  export const getUsername = () => {
    return localStorage.getItem('username');
  };
  
  export const removeUsername = () => {
    localStorage.removeItem('username');
  };