import siteRoute from './site.routes';
import adminRoute from './admin.routes'
import contestRoute from './contest.routes'
import subjectRoute from './subject.routes'
const initWebRoute = (app) => {

    app.use('/api/v1/admin', adminRoute);
    app.use('/api/v1/contest', contestRoute);
    app.use('/api/v1/subjects', subjectRoute);
    app.use('/api/v1', siteRoute);
    return app.use('/', function (req, res) {
        res.send('Hello World')
    });
}

module.exports = initWebRoute;