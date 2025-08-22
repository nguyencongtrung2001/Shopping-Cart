export const LOGIN = 'login-user'
export const LOGOUT = 'logout-user'
export const login = (usename) => ({
    type : 'LOGIN',
    payload : usename,
})

export const logout = () => ({
  type: 'LOGOUT',
});