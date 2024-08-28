document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addComment();
});

function addComment() {
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    if (name && comment) {
        const commentList = document.getElementById('comments-list');
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <p><strong>${name}</strong></p>
            <p>${comment}</p>
            <div class="comment-actions">
                <button onclick="editComment(this)">Edit</button>
                <button onclick="deleteComment(this)">Delete</button>
            </div>
        `;
        commentList.appendChild(commentElement);

        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
    }
}

function editComment(button) {
    const commentElement = button.parentElement.parentElement;
    const name = commentElement.querySelector('strong').innerText;
    const comment = commentElement.querySelector('p:nth-child(2)').innerText;

    document.getElementById('name').value = name;
    document.getElementById('comment').value = comment;

    deleteComment(button);
}

function deleteComment(button) {
    const commentElement = button.parentElement.parentElement;
    commentElement.remove();
}

