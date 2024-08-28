// this is a comment.js files which handles the comments in the blog webpage 
// but its only store the comments in one session


import React, { useState } from 'react';
import './comment.css'

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedComments = comments.map((c, index) =>
                index === editIndex ? { name, comment } : c
            );
            setComments(updatedComments);
            setEditIndex(null);
        } else {
            setComments([...comments, { name, comment }]);
        }
        setName('');
        setComment('');
    };

    const handleEditComment = (index) => {
        setName(comments[index].name);
        setComment(comments[index].comment);
        setEditIndex(index);
    };

    const handleDeleteComment = (index) => {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
    };

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            <form onSubmit={handleAddComment}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                />
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Your Comment"
                    required
                ></textarea>
                <button type="submit">{editIndex !== null ? 'Update Comment' : 'Add Comment'}</button>
            </form>
            <div className="comments-list">
                {comments.map((c, index) => (
                    <div key={index} className="comment">
                        <p><strong>{c.name}</strong></p>
                        <p>{c.comment}</p>
                        <div className="comment-actions">
                            <button onClick={() => handleEditComment(index)}>Edit</button>
                            <button onClick={() => handleDeleteComment(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
