
async function signUp() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmpw = document.getElementById('confirm-password').value;
    const errorMsg = document.getElementById('error-msg');

    // Tạo đối tượng chứa thông tin đăng nhập
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('confirmpw', confirmpw);

    // Kiểm tra mật khẩu và mật khẩu xác nhận có khớp nhau không
    if (password !== confirmpw) {
        errorMsg.innerText = 'Password and Confirm Password do not match!';
        event.preventDefault();
    }

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        errorMsg.innerText = '';
        // Hiển thị thông báo thành công
        alert('Account created successfully!');
        // Chuyển hướng đến trang đăng nhập
        window.location.href = '/sign-in.html'; // Điều chỉnh đường dẫn nếu cần thiết
    } catch (error) {
        console.error('Error:', error);
    }
}

function togglePasswordVisibility() {  //hiển thị mật khẩu
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    }
}

function togglePasswordVisibility2() {  //hiển thị xác nhân mật khẩu
    const passwordInput = document.getElementById('confirm-password');
    const eyeIcon = document.getElementById('eye-icon2');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    }
}
