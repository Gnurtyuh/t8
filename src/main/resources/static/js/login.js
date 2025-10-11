document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.loginForm');
    const emailInput = loginForm.querySelector('input[type="email"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const loginBtn = document.querySelector('.loginBtn');

    // Kiểm tra điều kiện đăng nhập
    function validateLogin() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === '' || password === '') {
            alert('Vui lòng nhập email và mật khẩu!');
            return false;
        }
        // Giả lập kiểm tra đăng nhập
        if (email.includes('@') && password.length >= 6) {
            console.log('Đăng nhập thành công với email:', email, 'và role:', document.querySelector('input[name="role"]:checked').value);
            return true;
        } else {
            alert('Email hoặc mật khẩu không hợp lệ!');
            return false;
        }
    }

    // Xử lý sự kiện submit form
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn form submit mặc định

        if (validateLogin()) {
            const role = document.querySelector('input[name="role"]:checked').value;
            const redirectUrl = `home.html?role=${encodeURIComponent(role)}`; // Encode URL để tránh lỗi ký tự đặc biệt

            console.log('Chuyển hướng đến:', redirectUrl);
            try {
                window.location.href = redirectUrl;
            } catch (error) {
                console.error('Lỗi khi chuyển hướng:', error);
                alert('Không thể chuyển hướng. Vui lòng kiểm tra đường dẫn hoặc chạy trên server local!');
            }
        }
    });

    // Kích hoạt nút đăng nhập khi có dữ liệu
    function updateButtonState() {
        loginBtn.disabled = !(emailInput.value.trim() && passwordInput.value.trim());
    }

    emailInput.addEventListener('input', updateButtonState);
    passwordInput.addEventListener('input', updateButtonState);
});