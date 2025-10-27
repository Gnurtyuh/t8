document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem("access_token");
    const username = localStorage.getItem("username");
    const roleLevel = localStorage.getItem("rolelevel");
    console.log("Role Level:", roleLevel);
    console.log("token:", token);
    if (!token || !username) {
        alert("Bạn chưa đăng nhập!");
        return;
    }
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

    //lay tai lieu cua nhan vien rolelevel = 1
    if (roleLevel === '1') {
    try {
        const userdto = await getUserByUsername(username);
        const departmentDto = userdto.departmentDto;
        const departmentName = departmentDto.departmentName;
        const response = await fetch(`http://localhost:8080/user/document?departmentName=${departmentName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();

        const documentList = document.getElementById('document-list');
        documentList.innerHTML = '';

        data.forEach(log => {
    const item = document.createElement('div');
    item.className = 'document-item';
    item.innerHTML = `
        <span class="file-id">id: ${log.documentId}</span>
        <span class="file-name">Tên Tài Liệu: ${log.title}</span>
        <span class="file-date">Ngày Gửi: ${new Date(log.uploadDate).toLocaleDateString()}</span>
        <span class="file-author">Người tạo: ${log.userDto.username}</span>
        <span class="file-dept">Phòng ban: ${log.departmentDto.departmentName}</span>
        <span class="file-division">Division: ${log.departmentDto.division}</span>
        <span class="file-desc">Mô tả: ${log.description}</span>
        <span class="file-path">Đường dẫn: ${log.filePath}</span>
        <a href="#" class="view-btn">Xem</a>
    `;
    documentList.appendChild(item);
});
        } catch (error) {
            console.error(error);
            alert("Không thể lấy dữ liệu từ server!");
        }
    }

    if (roleLevel === '2') {
   
    try {
        const userdto = await getUserByUsername(username);
        const departmentDto = userdto.departmentDto;
        console.log("userdto:", userdto);
        const departmentId = departmentDto.departmentId;
        console.log("departmentId:", departmentId);
        const response = await fetch(
          `http://localhost:8080/user/document/departmentId?departmentId=${departmentId}`,
        {
          method: 'GET',
          headers: {
          'Authorization': `Bearer ${token}`
           }
        }
        );

            const data = await response.json();

        const documentList = document.getElementById('document-list');
        documentList.innerHTML = '';

        data.forEach(log => {
    const item = document.createElement('div');
    item.className = 'document-item';
    item.innerHTML = `
        <span class="file-id">id: ${log.documentId}</span>
        <span class="file-name">Tên Tài Liệu: ${log.title}</span>
        <span class="file-date">Ngày Gửi: ${new Date(log.uploadDate).toLocaleDateString()}</span>
        <span class="file-author">Người tạo: ${log.userDto.username}</span>
        <span class="file-dept">Phòng ban: ${log.departmentDto.departmentName}</span>
        <span class="file-division">Division: ${log.departmentDto.division}</span>
        <span class="file-desc">Mô tả: ${log.description}</span>
        <span class="file-path">Đường dẫn: ${log.filePath}</span>
        <a href="#" class="view-btn">Xem</a>
    `;
    documentList.appendChild(item);
});
        } catch (error) {
            console.error(error);
            alert("Không thể lấy dữ liệu từ server!");
        }
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



    //lay tai lieu cua nhan vien rolelevel = 3
    if (roleLevel === '3') {
    try {
        const response = await fetch(`http://localhost:8080/user/document/username/${username}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu');

        const data = await response.json();

        const documentList = document.getElementById('document-list');
        documentList.innerHTML = '';

        data.forEach(log => {
    const item = document.createElement('div');
    item.className = 'document-item';
    item.innerHTML = `
        <span class="file-id">id: ${log.documentId}</span>
        <span class="file-name">Tên Tài Liệu: ${log.title}</span>
        <span class="file-date">Ngày Gửi: ${new Date(log.uploadDate).toLocaleDateString()}</span>
        <span class="file-author">Người tạo: ${log.userDto.username}</span>
        <span class="file-dept">Phòng ban: ${log.departmentDto.departmentName}</span>
        <span class="file-division">Division: ${log.departmentDto.division}</span>
        <span class="file-desc">Mô tả: ${log.description}</span>
        <span class="file-path">Đường dẫn: ${log.filePath}</span>
        <a href="#" class="view-btn">Xem</a>
    `;
    documentList.appendChild(item);
});

    } catch (error) {
        console.error(error);
        alert("Không thể lấy dữ liệu từ server!");
    }
}
});



  document.addEventListener('click', function(e) {
  if (e.target.classList.contains('view-btn')) {
    e.preventDefault();

    const parent = e.target.closest('.document-item');
    if (!parent) return;

    const idText = parent.querySelector('.file-id')?.textContent || '';
    const match = idText.match(/(\d+)/); // tìm số trong chuỗi "id: 123"
    const documentId = match ? match[1] : null;

    const filePathText = parent.querySelector('.file-path')?.textContent || '';
    const filePath = filePathText.replace('Đường dẫn:', '').trim();

    if (!filePath || !documentId) {
      alert("Thiếu thông tin tài liệu!");
      return;
    }
    window.location.href = `decrypt.html?file=${encodeURIComponent(filePath)}&documentId=${encodeURIComponent(documentId)}`;
  }
});


// document.addEventListener('click', function(e) {
//   if (e.target.classList.contains('view-btn')) {
//     e.preventDefault();
//     const documentId = e.target.dataset.id;
//     const filePath = decodeURIComponent(e.target.dataset.file);

//     if (!filePath || !documentId) {
//       alert("Thiếu thông tin tài liệu!");
//       return;
//     }
//     window.location.href = `decrypt.html?file=${encodeURIComponent(filePath)}&documentId=${documentId}`;
//   }
// });