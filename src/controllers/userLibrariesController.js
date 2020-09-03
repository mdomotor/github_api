const userLibraries = require('../repository/userLibrariesRepository');
const libraries = require('../repository/librariesRepository');

async function saveUserLibrary(req, res) {
    // check if library already exists
    let lib_id = await libraries.selectLibraries(req.params.owner, req.params.repo);
    
    // save library if doesn't exists
    if (lib_id.length === 0) {
        lib_id = await libraries.insertLibrary(req.params.owner, req.params.repo);
    }

    // save user library
    const rows = await userLibraries.insertUserLibrary(lib_id[0].id, req.query.user);

    res.json({ 
        savedUserLibrary: rows
    });
}

async function deleteUserLibrary(req, res) {
    // delete userLibrary
    const rows = await userLibraries.deleteUserLibrary(req.params.owner, req.params.repo, req.query.user);
    
    res.json({ 
        deletedUserLibrary: rows
    });
}

module.exports = { saveUserLibrary, deleteUserLibrary };