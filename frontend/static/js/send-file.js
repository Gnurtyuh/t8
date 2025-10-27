document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const recipientEmail = document.getElementById('recipientEmail');
    const nextBtn = document.querySelector('.nextBtn');
    const browseBtn = document.querySelector('.browseBtn');
    const fileUpload = document.querySelector('.fileUpload');
    const notificationBell = document.querySelector('.notificationBell');
    const notificationPanel = document.querySelector('.notificationPanel');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const togglePasswordBtn = document.querySelector('.togglePasswordBtn');

    // ✅ Kiểm tra điều kiện kích hoạt nút gửi
    function checkButtonState() {
        if (fileInput.files.length > 0 && recipientEmail.value.trim() !== '') {
            nextBtn.disabled = false;
            nextBtn.classList.add('enabled');
        } else {
            nextBtn.disabled = true;
            nextBtn.classList.remove('enabled');
        }
    }

    // ✅ Hiển thị tên file khi chọn
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const name = fileInput.files[0].name;
            fileNameDisplay.textContent = `📁 Đã chọn: ${name}`;
        } else {
            fileNameDisplay.textContent = '';
        }
        checkButtonState();
    });

    // ✅ Nhập email người nhận
    recipientEmail.addEventListener('input', checkButtonState);

    const loginBtn = document.getElementById('loginBtn');
    if (token) {
        // Nếu đã đăng nhập
        loginBtn.textContent = 'ĐĂNG XUẤT';
        loginBtn.href = '#'; // không chuyển trang login nữa

        // Khi bấm, sẽ đăng xuất
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token'); // xóa token
            alert('Đã đăng xuất!');
            window.location.href = 'login.html'; // quay về trang login
        });
    }
    // ✅ Kéo thả file
    fileUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUpload.style.borderColor = '#3182ce';
    });

    fileUpload.addEventListener('dragleave', () => {
        fileUpload.style.borderColor = '#e2e8f0';
    });

    fileUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUpload.style.borderColor = '#e2e8f0';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            fileNameDisplay.textContent = `📁 Đã chọn: ${files[0].name}`;
            checkButtonState();
        }
    });

    // ✅ Fix lỗi click 2 lần
    browseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });

    // ✅ Xử lý gửi file
    nextBtn.addEventListener('click', async () => {
        if (nextBtn.disabled) return;

        const file = fileInput.files[0];
        const email = recipientEmail.value;

        try {
            // Tạo link tải trực tiếp (giả lập gửi file qua email)
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Thêm thông báo thành công
            const now = new Date();
            const time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const date = now.toLocaleDateString('vi-VN');
            const notificationList = document.querySelector('.notificationList');
            const newNotification = document.createElement('li');
            newNotification.textContent = `✅ Tập tin "${file.name}" đã được gửi đến ${email} lúc ${time}, ${date}.`;
            notificationList.insertBefore(newNotification, notificationList.firstChild);

            alert(`✅ Tập tin "${file.name}" đã được gửi đến ${email} thành công!`);
            // Xóa file đã chọn sau khi gửi
            fileInput.value = '';
            fileNameDisplay.textContent = '';
            recipientEmail.value = '';
            checkButtonState();
        } catch (error) {
            console.error('Send file error:', error);
            // Thêm thông báo lỗi
            const now = new Date();
            const time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const date = now.toLocaleDateString('vi-VN');
            const notificationList = document.querySelector('.notificationList');
            const newNotification = document.createElement('li');
            newNotification.textContent = `⚠️ Lỗi gửi tập tin "${file.name}" đến ${email} lúc ${time}, ${date}.`;
            notificationList.insertBefore(newNotification, notificationList.firstChild);

            alert(`❌ Đã xảy ra lỗi khi gửi tập tin "${file.name}" đến ${email}. Vui lòng thử lại!`);
        }
    });

    // ✅ Xử lý hiển thị panel thông báo
    notificationBell.addEventListener('click', () => {
        notificationPanel.style.display = notificationPanel.style.display === 'block' ? 'none' : 'block';
    });

    // Ẩn panel khi nhấp ra ngoài
    document.addEventListener('click', (e) => {
        if (!notificationBell.contains(e.target) && !notificationPanel.contains(e.target)) {
            notificationPanel.style.display = 'none';
        }
    });

    // ✅ Xử lý ẩn/hiện mật khẩu (dùng cho email như một trường bảo mật)
    togglePasswordBtn.addEventListener('click', () => {
        const type = recipientEmail.getAttribute('type') === 'email' ? 'text' : 'email';
        const isEmail = type === 'email';
        recipientEmail.setAttribute('type', type);
        togglePasswordBtn.textContent = isEmail ? '👁️' : '🙈';
        const value = recipientEmail.value; // Lưu giá trị hiện tại
        recipientEmail.value = value; // Gán lại giá trị để giữ nguyên nội dung
    });
});