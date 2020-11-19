import React, { useEffect, useState } from 'react';
import './PostData.css';
import StarsIcon from '@material-ui/icons/Stars';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentData from '../CommentData/CommentData';
import CommentUserInfo from '../CommentUserInfo/CommentUserInfo';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    likeTrue: {
        fill: '#1DB954',
        paddingRight: '30px',
        marginRight: '5px',
        fontSize: '16px',
        paddingTop: '5px',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.1)'
        }
    },
    likeNone: {
        fill: '#191414',
        paddingRight: '30px',
        marginRight: '5px',
        fontSize: '16px',
        paddingTop: '5px',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.1)'
        }
    }
}));

const PostData = ({ data }) => {

    const classes = useStyles();
    const [comment, setComment] = useState('')
    const userId = useSelector(state => state.auth.id);
    const fetchWithCSRF = useSelector(state => state.auth.csrf);
    const [commentsData, setCommentsData] = useState();
    const [commentUser, setCommentUser] = useState();
    const [hidden, setHidden] = useState(true)
    const history = useHistory()
    const [favorited, setFavorited] = useState(false)

    const newComment = async () => {
        const res = await fetchWithCSRF(`/api/post/${data.id}/${userId}/comment`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment)
        })
        if (res.ok) {
            const data = await res.json()
            setCommentUser([...commentUser, data.user])
            setCommentsData([...commentsData, data.comment])
        }
        return
    }

    const favorite = async () => {

        if (favorited === false) {
            const res = await fetchWithCSRF(`/api/post/${data.id}/${userId}/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            if (res.ok) {
                const data = await res.json()
            }
        } else {
            const res = await fetchWithCSRF(`/api/post/${data.id}/${userId}/like`, {
                method: 'DELETE',
            })

            if (res.ok) {
                const data = await res.json();
            }
        }
    }

    const handleComment = (e) => {
        e.preventDefault()
        newComment()
        setComment('')
    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetchWithCSRF(`/api/post/${data.id}/post/comments`, {
                methods: 'GET'
            })
            if (res.ok) {
                const data = await res.json()
                setCommentsData(data.comments)
                setCommentUser(data.userInfo)
            }
        }

        async function fetchLikes() {
            const res = await fetchWithCSRF(`/api/post/${data.id}/${userId}/like`, {
                method: 'GET',
            })

            if (res.ok) {
                const data = await res.json()

                if (data.like === true) {
                    setFavorited(true)
                } else {
                    setFavorited(false)
                }
            }

        }

        fetchData()

        fetchLikes()

    }, [])

    const commentViewChange = () => {
        if (hidden === true) {
            setHidden(false)
        } else {
            setHidden(true)
        }
    }

    const routeChange = () => {
        history.push(`/post/${data.id}`)
    }

    const handleFavorite = () => {
        favorite()
        if (favorited === false) {
            setFavorited(true)
        } else {
            setFavorited(false)
        }
    }

    if (commentsData === undefined || commentUser === undefined) {
        return <h1>loading...</h1>
    }


    return (
        <div className='postData'>
            <img src={data.img} alt='Image could not be found' onClick={routeChange} />
            <div className='postData__caption'>
                <StarsIcon className='postData__star' className={favorited ? classes.likeTrue : classes.likeNone} onClick={handleFavorite} />
                <div>
                    {data.caption}
                </div>
            </div>
            <button className='viewCommentBtn' onClick={commentViewChange} hidden={!hidden}>View all {commentsData.length} comments</button>
            <button className='closeCommentBtn' onClick={commentViewChange} hidden={hidden}>Close Comments</button>
            <div hidden={hidden}>
                <div className='comment' >
                    {commentsData.map((item, index) => {
                        return (
                            <div key={index} className='post__comment'>
                                <CommentUserInfo data={commentUser[commentsData.length - (index + 1)]} />
                                <CommentData data={commentsData[commentsData.length - (index + 1)]} />
                            </div>
                        )
                    })}
                </div>
                <div className='comment-form-div'>
                    <form onSubmit={handleComment} className='comment-form'>
                        <input value={comment} className='post__comment__input' type='text' placeholder='Add a comment...' onChange={(e) => setComment(e.target.value)} />
                        <button type='submit' hidden={true} className='comment-btn'></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostData
