var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/notes', getNotes);
router.get('/note/:id', getNote);
router.get('/notes/:subject', getNotesBySubject)
router.get('/subjects', getSubjects);
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

function getNotesBySubject(req, res, next) {
    var subject = req.params.subject;
    var notes = data.notes.filter(filterBySubject);

    if (notes) {
        res.status(200).send(notes);
    } else {
        four0four.send404(req, res, 'No notes found for subject ' + subject);
    }

    function filterBySubject(obj) {
        if ('subject' in obj && typeof(obj.subject) === 'string' && obj.subject == subject) {
            return true;
        } else {
            return false;
        }
    }
}

function getSubjects(req, res, next) {
    res.status(200).send(data.subjects);
}
