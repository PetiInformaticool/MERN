export const logout = () => {
  localStorage.removeItem("email");
  fetch("http://localhost:8800/logout", {
    method: "POST",
    credentials: "include"
  });
};

export const isLoggedIn = () => {
  return Boolean(localStorage.getItem("email"));
}