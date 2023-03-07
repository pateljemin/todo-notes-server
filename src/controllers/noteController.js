const { addNoteToDB, updateNoteToDB, deleteNoteFromDB, getNoteFromDB, getNoteOfUserFromDB } = require('../services/noteService');

/**
 * Note add controller.
 *
 * @param req : Http Request with title and content.
 * @param res : Http Response
 */
const addNote = async(req, res) => {
    const { title, content } = req.body;

    // Check that the request includes a title and content
    if (!title || !content) {
        return res.status(400).json({ message: 'Missing title or content' });
    }

    const noteInfo = await addNoteToDB(title, content, req.user.id);
    if (!noteInfo.isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }

    res.status(200).json({...noteInfo.note });
};

/**
 * Note update controller.
 *
 * @param req : Http Request with updated title and content.
 * @param res : Http Response
 */
const updateNote = async(req, res) => {

    const id = parseInt(req.params.id);

    const { title, content } = req.body;

    // Check that the request includes a title and content
    if (!title || !content) {
        return res.status(400).json({ message: 'Missing title or content' });
    }

    const noteInfo = await updateNoteToDB(id, title, content, req.user.id);
    if (!noteInfo.isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }

    if (!noteInfo.isAuthorized) {
        return res.status(403).json({ message: 'You are not authorized' })
    }

    res.status(200).json({...noteInfo.note });
};

/**
 * Note delete controller.
 *
 * @param req : Http Request with id of note to be deleted.
 * @param res : Http Response
 */
const deleteNote = async(req, res) => {

    const id = parseInt(req.params.id);
    const noteInfo = await deleteNoteFromDB(id, req.user.id);

    if (!noteInfo.isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }

    if (noteInfo.isSuccess && !noteInfo.isExists) {
        return res.status(404).json({ message: 'Invalid Id' })
    }

    if (!noteInfo.isAuthorized) {
        return res.status(403).json({ message: 'You are not authorized' })
    }

    res.status(204).json({ message: "Success" });
};

/**
 * Note get controller.
 *
 * @param req : Http Request with id of note to be deleted.
 * @param res : Http Response
 */
const getNote = async(req, res) => {

    const id = parseInt(req.params.id);

    const noteInfo = await getNoteFromDB(id, req.user.id);
    if (!noteInfo.isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }
    if (!noteInfo.note) {
        return res.status(404).json({ message: 'Invalid Id' });
    }
    res.status(200).json({...noteInfo.note });
};

/**
 * Note get controller.
 *
 * @param req : Http Request with id of note to be deleted.
 * @param res : Http Response
 */
const getNotesOfUser = async(req, res) => {

    const noteInfo = await getNoteOfUserFromDB(req.user.id);
    if (!noteInfo.isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }

    res.status(200).json([...noteInfo.notes]);
};

module.exports = {
    addNote,
    updateNote,
    deleteNote,
    getNote,
    getNotesOfUser
}