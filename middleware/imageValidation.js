module.exports = (req, res, next) => {
    console.log(req.file)
    // if(typeof(req.file) === 'undefined') {
    //     return res.status(400).json({
    //         msg: 'Problem sending data', param: 'avatar'
    //     })
    // }

    // if(
    //     !(req.file.mimetype).includes('jpeg') &&
    //     !(req.file.mimetype).includes('jpg') &&
    //     !(req.file.mimetype).includes('png')

    // ){
    //        return res.status(400).json({
    //          msg: "Unsupported file type",
    //          param: "avatar",
    //        });
    // }

    // if(req.file.size >  10000000) {
    //      return res.status(400).json({
    //        msg: "File too large (>10mb)",
    //        param: "avatar",
    //      });
    // }

    next()
}