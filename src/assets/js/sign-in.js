async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    // Tạo đối tượng chứa thông tin đăng nhập
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
        // Gọi API sử dụng Fetch
        const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,
        });

        // Chuyển đổi phản hồi thành định dạng JSON
        const result = await response.json();

        if (response.ok) {
            // Đăng nhập thành công
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            window.location.href = '/store';
            // document.getElementById('login-form').style.display = 'none';
            // document.getElementById('logout-form').style.display = 'block';
            // document.getElementById('user-name').innerText = result.username; // Giả sử API trả về tên người dùng
            errorMsg.innerText = '';
        } else {
            // Đăng nhập thất bại
            errorMsg.innerText = result.message || 'Invalid username or password!';
        }
    } catch (error) {
        // Xử lý lỗi khi gọi API
        errorMsg.innerText = 'An error occurred. Please try again.';
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
    const passwordInput = document.getElementById('password');
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

function loginNavigation(){
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('logout-form').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}