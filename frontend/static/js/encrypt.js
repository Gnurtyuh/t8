document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const passwordInput = document.getElementById('passwordInput');
    const nextBtn = document.querySelector('.nextBtn');
    const browseBtn = document.querySelector('.browseBtn');
    const fileUpload = document.querySelector('.fileUpload');
    const notificationBell = document.querySelector('.notification-bell');
    const notificationPanel = document.querySelector('.notification-panel');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const togglePasswordBtn = document.querySelector('.toggle-password-btn');
    const sendDataBtn = document.querySelector('.sendDataBtn');

    // ✅ Kiểm tra điều kiện kích hoạt nút tải và gửi
    function checkButtonState() {
        const hasFile = fileInput.files.length > 0;
        const hasPassword = passwordInput.value.trim() !== '';
        nextBtn.disabled = !(hasFile && hasPassword);
        sendDataBtn.disabled = !(hasFile && hasPassword);
        if (hasFile && hasPassword) {
            nextBtn.classList.add('enabled');
            sendDataBtn.classList.add('enabled');
        } else {
            nextBtn.classList.remove('enabled');
            sendDataBtn.classList.remove('enabled');
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

    // ✅ Nhập mật khẩu
    passwordInput.addEventListener('input', checkButtonState);

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

    // ✅ Xử lý mã hóa & tải file
    nextBtn.addEventListener('click', async () => {
        if (nextBtn.disabled) return;

        const file = fileInput.files[0];
        const password = passwordInput.value;

        try {
            const encoder = new TextEncoder();
            const data = await file.arrayBuffer();
            const salt = crypto.getRandomValues(new Uint8Array(16));
            const passwordKey = await crypto.subtle.importKey(
                'raw',
                encoder.encode(password),
                'PBKDF2',
                false,
                ['deriveKey']
            );
            const aesKey = await crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt,
                    iterations: 100000,
                    hash: 'SHA-256'
                },
                passwordKey,
                { name: 'AES-CBC', length: 256 },
                false,
                ['encrypt']
            );
            const iv = crypto.getRandomValues(new Uint8Array(16));
            const encrypted = await crypto.subtle.encrypt(
                { name: 'AES-CBC', iv },
                aesKey,
                data
            );

            const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
            combined.set(salt, 0);
            combined.set(iv, salt.length);
            combined.set(new Uint8Array(encrypted), salt.length + iv.length);

            const blob = new Blob([combined], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${file.name}.encrypted`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Thêm thông báo thành công
            const now = new Date();
            const time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const date = now.toLocaleDateString('vi-VN');
            const notificationList = document.querySelector('.notification-list');
            const newNotification = document.createElement('li');
            newNotification.textContent = `✅ Tập tin "${file.name}" đã được mã hóa lúc ${time}, ${date}.`;
            notificationList.insertBefore(newNotification, notificationList.firstChild);

            alert('✅ Tập tin đã được mã hóa và tải về thành công!');
        } catch (error) {
            console.error('Encryption error:', error);
            // Thêm thông báo lỗi
            const now = new Date();
            const time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const date = now.toLocaleDateString('vi-VN');
            const notificationList = document.querySelector('.notification-list');
            const newNotification = document.createElement('li');
            newNotification.textContent = `⚠️ Lỗi mã hóa tập tin "${file.name}" lúc ${time}, ${date}.`;
            notificationList.insertBefore(newNotification, notificationList.firstChild);

            alert('❌ Đã xảy ra lỗi khi mã hóa tập tin. Vui lòng thử lại!');
        }
    });

    // ✅ Xử lý gửi dữ liệu
    sendDataBtn.addEventListener('click', () => {
        if (sendDataBtn.disabled) return;

        const file = fileInput.files[0];
        const password = passwordInput.value;

        // Giả lập gửi dữ liệu (có thể thay bằng API gửi file)
        try {
            const now = new Date();
            const time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const date = now.toLocaleDateString('vi-VN');
            const notificationList = document.querySelector('.notification-list');
            const newNotification = document.createElement('li');
            newNotification.textContent = `✅ Tập tin "${file.name}" đã được gửi lúc ${time}, ${date}.`;
            notificationList.insertBefore(newNotification, notificationList.firstChild);

            alert(`✅ Tập tin "${file.name}" đã được gửi thành công!`);
            // Xóa file và mật khẩu sau khi gửi (tuỳ chọn)
            fileInput.value = '';
            passwordInput.value = '';
            fileNameDisplay.textContent = '';
            checkButtonState();
        } catch (error) {
            console.error('Send data error:', error);
            const now = new Date();
            const time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const date = now.toLocaleDateString('vi-VN');
            const notificationList = document.querySelector('.notification-list');
            const newNotification = document.createElement('li');
            newNotification.textContent = `⚠️ Lỗi gửi tập tin "${file.name}" lúc ${time}, ${date}.`;
            notificationList.insertBefore(newNotification, notificationList.firstChild);

            alert(`❌ Đã xảy ra lỗi khi gửi tập tin "${file.name}". Vui lòng thử lại!`);
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

    // ✅ Xử lý ẩn/hiện mật khẩu
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        const isPassword = type === 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordBtn.textContent = isPassword ? '👁️' : '🙈';
        const value = passwordInput.value; // Lưu giá trị hiện tại
        passwordInput.value = value; // Gán lại giá trị để giữ nguyên nội dung
    });
});