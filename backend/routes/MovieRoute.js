const {  startUploadChunk, uploadSingleChunkOneByOne, completeUploadAndAssembleChunk, deleteS3ResourceFromBucket, getAllMovie, fetchMovieDetail } = require("../Controller/MovieController");
const multer = require('multer');
const upload = multer();



const router = require("express").Router();

router.get('/get-all-movie',getAllMovie)
router.get('/movie/:id',fetchMovieDetail)
router.post('/start-upload',startUploadChunk)

router.post('/upload-part',upload.single('data'),uploadSingleChunkOneByOne)

router.post('/complete-upload',completeUploadAndAssembleChunk)
router.delete('/delete-s3-resource/:key',deleteS3ResourceFromBucket)

module.exports=router