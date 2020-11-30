import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CommentDelete = ({ data }) => {

    const [hidden, setHidden] = useState(true)
    const userId = useSelector(state => state.auth.id)

    useEffect(() => {
        if (data.id === userId) {
            setHidden(false)
        }
    }, [])

    return (
        <button type='submit' hidden={hidden}>Delete</button>
    )
}

export default CommentDelete;
