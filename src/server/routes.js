var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/notes', getNotes);
router.get('/note/:id', getNote);
router.get('/notes/:course', getNotesByCourse)
router.get('/courses', getCourses);
router.get('/course/:id', getCourse);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getNotes(req, res, next) {
    res.status(200).send(data.notes);
}

function getNote(req, res, next) {
    var id = +req.params.id;
    var note = data.notes.filter(function(p) {
        return p.id === id;
    })[0];

    if (note) {
        res.status(200).send(note);
    } else {
        four0four.send404(req, res, 'note ' + id + ' not found');
    }
}

function getNotesByCourse(req, res, next) {
    var course = req.params.course;
    var notes = data.notes.filter(filterByCourse);

    if (notes) {
        res.status(200).send(notes);
    } else {
        four0four.send404(req, res, 'No notes found for course ' + course);
    }

    function filterByCourse(obj) {
        if ('course' in obj && typeof(obj.course) === 'string' && obj.course == course) {
            return true;
        } else {
            return false;
        }
    }
}

function getCourses(req, res, next) {
    res.status(200).send(data.courses);
}

function getCourse(req, res, next) {
    var id = +req.params.id;
    var course = data.courses.filter(function(p) {
        return p.id === id;
    })[0];

    if (course) {
        res.status(200).send(course);
    } else {
        four0four.send404(req, res, 'course ' + id + ' not found');
    }
}
