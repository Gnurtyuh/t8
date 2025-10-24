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



    // Kiểm tra điều kiện kích hoạt nút tải và gửi
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

    // nhập file và hiển thị tên file khi chọn 
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const name = fileInput.files[0].name;
            fileNameDisplay.textContent = `📁 Đã chọn: ${name}`;
        } else {
            fileNameDisplay.textContent = '';
        }
        checkButtonState();
    });



    // Nhập mật khẩu để kiểm tra trạng thái nút
    passwordInput.addEventListener('input', checkButtonState);


    
    // Kéo thả file
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

    const file = fileInput.files[0];
    const password = passwordInput.value.trim();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("file", file);

    // post path file về cho server xử lý
    // Xử lý mã hóa & tải file
    nextBtn.addEventListener('click', async () => {
    if (nextBtn.disabled) return;

    const file = fileInput.files[0];
    const password = passwordInput.value;
    const token = localStorage.getItem("access_token");

    if (!token) {
        alert("Bạn chưa đăng nhập!");
        return;
    }
    
    const formData = new FormData();
    formData.append("password", password);
    formData.append("file", file);
    console.log("token:", token);
    console.log("file:", file.name)
    console.log("password:", password);
    const response = await fetch("http://localhost:8080/user/aes/encrypt", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
        
    });
    
    if (response.ok) {
        const result = await response.json();
        console.log("Server trả về:", result);
    } else {
        console.error("Upload thất bại:", response.status);
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

            alert(`Đã xảy ra lỗi khi gửi tập tin "${file.name}". Vui lòng thử lại!`);
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