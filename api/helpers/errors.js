const HttpStatus = require('http-status-codes');

function serverError(res,...message){
    res.status(HttpStatus.BAD_REQUEST).json({
        error:true, code:HttpStatus.BAD_REQUEST, errors:[HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)].concat(message)
    })
}

function InvalidPDFError(res,...message){
    res.status(HttpStatus.BAD_REQUEST).json({
        error:true, code:HttpStatus.BAD_REQUEST, errors:[HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)].concat(message)
    })
}
function ConflictError(res,...message){
    res.status(HttpStatus.CONFLICT).json({
        error:true, code:HttpStatus.CONFLICT, errors:[HttpStatus.getStatusText(HttpStatus.CONFLICT)].concat(message)
    })
}

function EmptyFilesError(res,...message){
    res.status(HttpStatus.BAD_REQUEST).json({
        error:true, code:HttpStatus.BAD_REQUEST, errors:[HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)].concat(message)
    })
}

function UnauthorizedError(res,...message){
    res.status(HttpStatus.UNAUTHORIZED).json({
        error:true, code:HttpStatus.UNAUTHORIZED, errors:[HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)].concat(message)
    })
}
function NotFoundError(res,...message){
    res.status(HttpStatus.NOT_FOUND).json({
        error:true, code:HttpStatus.NOT_FOUND, errors:[HttpStatus.getStatusText(HttpStatus.NOT_FOUND)].concat(message)
    })
}

module.exports= {serverError, InvalidPDFError,EmptyFilesError,UnauthorizedError, NotFoundError, ConflictError}