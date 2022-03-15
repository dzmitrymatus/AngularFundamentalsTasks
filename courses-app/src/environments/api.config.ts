const baseUrl = "http://localhost:3000";

export const apiConfig = {
    baseUrl: baseUrl,
    getAuthorsUrl: baseUrl + "/authors/all",
    postAuthorUrl: baseUrl + "/authors/add",
    coursesUrl: baseUrl + "/courses/all",
    courseUrl: baseUrl + "/courses",
    postCourseUrl: baseUrl + "/courses/add",
    loginUrl: baseUrl + "/login",
    logoutUrl: baseUrl + "/logout",
    registerUrl: baseUrl + "/register",
    userUrl: baseUrl + "/users/me"
  };