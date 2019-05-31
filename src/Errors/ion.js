import React from 'react'
import Error from './Errors'
export  default ({ location:{pathname} }) => (
    <div>
        {Error('There seems to be a problem', ['The page at ' +pathname + ' doesn\'t exist','It may have been deleted or moved to a different location'])}
    </div>)