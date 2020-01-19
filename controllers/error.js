exports.getError = (req, res, next) => {
    res.status(404).render('404',{
        pageTitle: "Page not found!",
        path: "/error",
        isAuthenticated: req.session.isAuthenticated ? true : false,
        isAuthorized: req.session.isAuthorized ? true : false
    })
}
