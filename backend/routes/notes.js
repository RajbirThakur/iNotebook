const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { validationResult } = require('express-validator');

// Endpoint: api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    const notes = await Note.find({user: req.user.id});
    res.json(notes);
})

// Endpoint: api/notes/addnote
router.post('/addnote', fetchuser, async (req, res)=>{
    try {
        const {title, description, tag} = req.body;
         
        //Checking for errors
        const errors = validationResult(req);
        if(!errors){
            res.status(400).json({ error : errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savednote = await note.save();
        res.json(savednote);

    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

// Endpoint: api/notes/updatenote
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    // This id in the url is the id of the particular note
    const {title, description, tag} = req.body;
    const newnote = {};
    if(title){
        newnote.title = title;
    }
    if(description){
        newnote.description = description;
    }
    if(tag){
        newnote.tag = tag;
    }

    let note = await Note.findById(req.params.id);

    if(!note){
        res.status(404).send("Not found");
    }

    if(note.user.toString() !== req.user.id){
        res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newnote}, {new: true});
    res.json(note);
})

// Endpoint: api/notes/deletenote
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try {

        let note = await Note.findById(req.params.id);
    
        if(!note){
            res.status(404).send("Not found");
        }
    
        if(note.user.toString() !== req.user.id){
            res.status(401).send("Not allowed");
        }
    
        note = await Note.findByIdAndDelete(req.params.id);
        res.json("Success note has been deleted");

    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

module.exports = router;