export const TOKEN_KEY = "key"
const getToken = (token) => { localStorage.getItem(token) };

export const Login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const isAuth = () => {
    getToken(TOKEN_KEY) != null;
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}