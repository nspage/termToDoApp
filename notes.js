const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    // refactored function above
    // const duplicateNote = notes.filter(function (note){
    //     return note.title === title
    // })
   
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const readNote = (title) =>{
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('There is no such note, dumbass!'))
    }
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)   
    } catch (e){
        return []
    }
}

const removeNote = (title) => {
   const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    // refactored function above
    // const notesToKeep = notes.filter(function(note){
    //     return note.title !== title 
    // })
    saveNotes(notesToKeep)
    if (notesToKeep.length === notes.length) {
        console.log(chalk.red('No note found!'))
    } else {
        console.log(chalk.green('Note removed!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse('Here are all your notes!'))
    notes.forEach(note => console.log(note.title))
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
} 