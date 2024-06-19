document.getElementById('changePasswordForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirm-newPassword').value;
    const messageDiv1 = document.getElementById('message');

    if (newPassword !== confirmNewPassword) {
        messageDiv1.innerText = 'Password and Confirm Password do not match!';
        return;
    }

    const requestData = {
        oldPassword: oldPassword,
        newPassword: newPassword
    };

    fetch('https://your-api-endpoint.com/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            const messageDiv = document.getElementById('message');
            if (data.success) {
                messageDiv.innerHTML = '<p style="color: green;">Password changed successfully!</p>';
            } else {
                messageDiv.innerHTML = '<p style="color: red;">Error: ' + data.message + '</p>';
            }
        })
        .catch(error => {
            const messageDiv = document.getElementById('message');
            messageDiv.innerHTML = '<p style="color: red;">An error occurred: ' + error.message + '</p>';
        });
});
