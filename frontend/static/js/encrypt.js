document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const passwordInput = document.getElementById('passwordInput');
    const note = document.getElementById('noteInput');
    const title = document.getElementById('titleInput');
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


    // Fix lỗi click 2 lần
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
    nextBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // chặn form reload trang

    if (nextBtn.disabled) return;

    const file = fileInput.files[0];
    const password = passwordInput.value;
    const token = localStorage.getItem("access_token");

    // if (!token) {
    //     alert("Bạn chưa đăng nhập!");
    //     return;
    // }

    const formData = new FormData();
    formData.append("password", password);
    formData.append("file", file);
    console.log("token:", token);
    console.log("file:", file.name);
    console.log("password:", password);

    try {
        const response = await fetch("http://localhost:8080/user/aes/encrypt", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            console.error("Upload thất bại:", response.status);
            return;
        }
        const result = await response.json();
        console.log("Server trả về:", result);
        // alert("Mã hóa thành công!");
    } catch (error) {
        console.error("Lỗi khi mã hóa:", error);
    }
});



 
// Lấy thông tin userdto va departmentdto từ server dựa trên username
async function getUserByUsername(username) {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`http://localhost:8080/user/${username}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Không lấy được thông tin người dùng!");
    }

    return await response.json(); 
}



  // Xử lý gửi tài liệu
    sendDataBtn.addEventListener('click', async () => {
    if (sendDataBtn.disabled) return;

    const noteValue = note.value.trim();
    const titleValue = title.value.trim();
    const token = localStorage.getItem("access_token");
    const username = localStorage.getItem("username");
    const file = fileInput.files[0]; 

    try {
        const userdto = await getUserByUsername(username);
        const departmentDto = userdto.departmentDto;

        const documentDto = {
            title: titleValue,
            description: noteValue,
            filePath: file.name,
            userDto: userdto,
            departmentDto: departmentDto
        };
        console.log("📦 Document gửi đi:", documentDto);

        const response = await fetch("http://localhost:8080/user/document", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(documentDto)
        });

        if (!response.ok) {
            throw new Error("Gửi tài liệu thất bại!");
        }

        const result = await response.json();
        console.log("📤Server trả về:", result);
        alert("Gửi thành công!");
    } catch (err) {
        console.error("Send document error:", err);
        alert(err.message);
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