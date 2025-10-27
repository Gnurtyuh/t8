document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const nextBtn = document.querySelector('.nextBtn');
    const browseBtn = document.querySelector('.browseBtn');
    const fileUpload = document.querySelector('.fileUpload');
    const notificationBell = document.querySelector('.notification-bell');
    const notificationPanel = document.querySelector('.notification-panel');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const togglePasswordBtn = document.querySelector('.toggle-password-btn');
    const fileInput = document.getElementById('fileInput');
    const sendDataBtn = document.querySelector('.sendDataBtn');
    const params = new URLSearchParams(window.location.search);
    const filePath = params.get('file');
    const documentId = params.get('documentId');
    const token = localStorage.getItem("access_token");
if (sendDataBtn) {
    sendDataBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = `approve-document.html?documentId=${encodeURIComponent(documentId)}`;
    });
  }
if (filePath) {
    fileNameDisplay.textContent = `📁 File đã chọn: ${filePath}`;
}
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
    // Kiểm tra điều kiện kích hoạt nút tải và gửi
    function checkButtonState() {
        const hasFile = fileNameDisplay.textContent.trim() !== '';
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
    
    //Nhập mật khẩu
    passwordInput.addEventListener('input', checkButtonState);


    // Fix lỗi click 2 lần
    browseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });

     nextBtn.addEventListener('click', async () => {
  if (nextBtn.disabled) return;
  const token = localStorage.getItem("access_token");
  console.log("token:", token);
  const filePath = params.get('file'); 
  const password = passwordInput.value;

  if (!filePath || !password) {
    alert('Thiếu file hoặc mật khẩu');
    return;
  }

  try {
    const res = await fetch(`http://localhost:8080/user/aes/decrypt?password=${encodeURIComponent(password)}&filename=${encodeURIComponent(filePath)}`, {
        method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server lỗi: ${res.status} ${text}`);
    }

    // lấy filename từ header Content-Disposition nếu server gửi
    const cd = res.headers.get('Content-Disposition') || '';
    let filename = 'download';
    const match = cd.match(/filename\*=UTF-8''(.+)|filename="(.+)"|filename=(.+)/);
    if (match) {
      filename = decodeURIComponent(match[1] || match[2] || match[3]);
    } else {
      // fallback: lấy tên từ đường dẫn
      filename = filePath.split('/').pop();
    }

    // lấy mime type nếu server gửi
    const contentType = res.headers.get('Content-Type') || 'application/octet-stream';

    const arrayBuffer = await res.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: contentType });

    // tạo link download và click
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    alert(`✅ Đã tạo file: ${filename}`);
  } catch (err) {
    console.error(err);
    alert('Lỗi khi tải file: ' + err.message);
  }
});


    //Xử lý hiển thị panel thông báo
    notificationBell.addEventListener('click', () => {
        notificationPanel.style.display = notificationPanel.style.display === 'block' ? 'none' : 'block';
    });

    // Ẩn panel khi nhấp ra ngoài
    document.addEventListener('click', (e) => {
        if (!notificationBell.contains(e.target) && !notificationPanel.contains(e.target)) {
            notificationPanel.style.display = 'none';
        }
    });

    // Xử lý ẩn/hiện mật khẩu
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        const isPassword = type === 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordBtn.textContent = isPassword ? '👁️' : '🙈';
        const value = passwordInput.value; // Lưu giá trị hiện tại
        passwordInput.value = value; // Gán lại giá trị để giữ nguyên nội dung
    });
});
