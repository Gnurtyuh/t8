document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.loginForm');
    const usernameInput = loginForm.querySelector('input[type="username"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const loginBtn = document.querySelector('.loginBtn');

    function loginbtn() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '' || password === '') {
            alert('Vui lòng nhập tên đăng nhập và mật khẩu!');
            return;
        } else if (password.length > 12) {
            alert('Mật khẩu không được vượt quá 12 ký tự!');
            return;
        }

        fetch("http://localhost:8080/user/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: username,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Đăng nhập thất bại!');
            }
            return response.json();
        })
        .then(data => {
            const token = data.token;
            if (!token) {
                throw new Error('Không nhận được token từ server!');
            }

            // 🔹 Giải mã payload từ token (phần giữa)
            const payloadBase64 = token.split('.')[1];
            const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
            const payload = JSON.parse(payloadJson);

            console.log('Payload:', payload);
            console.log('Username trong token:', payload.sub);
            console.log('Role:', payload.role);

            // 🔹 Lưu token vào localStorage
            localStorage.setItem('access_token', token);

            // 🔹 (Tuỳ chọn) Chuyển hướng sang trang chính
            window.location.href = "/t8/frontend/static/home.html";
        })
        .catch(err => {
            alert(err.message);
        });
    }

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginbtn();
    });
});
