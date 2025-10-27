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


    


    // Lấy departmentId của user hien tai
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








    //lay tai lieu cua nhan vien rolelevel = 2
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

