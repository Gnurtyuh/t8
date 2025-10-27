
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
//  ? new Date(log.completedAt).toLocaleString('vi-VN') : 'Chưa hoàn thành'
//  ? new Date(log.createdAt).toLocaleString('vi-VN') : (doc.uploadDate ? new Date(doc.uploadDate).toLocaleString('vi-VN') : 'Không rõ'
  async function getUserByUsername(username) {
    const res = await fetch(`http://localhost:8080/user/${username}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Không lấy được thông tin người dùng!");
    return await res.json();
  }
  //hien thi list data log
  function renderDocuments(data) {
    const documentList = document.getElementById('document-list');
    documentList.innerHTML = '';

      data.forEach(log => {
    const doc = log?.documentDto || {};
    const user = log?.userDto || {};
    const dept = log?.departmentDto || {};
    const action = log.action || "NHÂN VIÊN GỬI TÀI LIỆU";
    const title = doc.title || log.target;
    const docDescription = doc.description;
    const username = user.username;
    const division = dept.division;
    const departmentName = dept.departmentName;
    const filePath = doc.filePath;
    const status = log.status;
    const createdAt = log.createdAt
  ? new Date(log.createdAt).toLocaleString('vi-VN')
  : 'Chưa hoàn thành';

const completedAt = log.completedAt
  ? new Date(log.completedAt).toLocaleString('vi-VN')
  : 'Chưa có thời gian hoàn thành';
    const item = document.createElement('div');
    item.className = 'document-item';
   item.innerHTML = `
  <div class="document-item">
    <div class="document-main">
      <div class="cols">
        <div class="doc-left">
          <div class="file-name"><strong>Tên tài liệu:</strong> ${action}</div>
          <div class="file-desc"><strong>Mô tả:</strong> ${docDescription}</div>
          <div class="file-author"><strong>Người tạo:</strong> ${username}</div>
          <div class="file-dept"><strong>Phòng ban:</strong> ${departmentName}</div>
          <div class="file-division"><strong>Bộ phận:</strong> ${division}</div>
        </div>

        <div class="doc-right">
        <div class="file-action"><strong>Hành động:</strong> ${title}</div>
          <div class="file-path"><strong>Tên file:</strong> ${filePath}</div>
          <div class="log-status"><strong>Trạng thái:</strong> ${status}</div>
          <div class="log-created"><strong>Ngày tạo:</strong> ${createdAt}</div>
          <div class="log-completed"><strong>Hoàn thành:</strong> ${completedAt}</div>
        </div>
      </div> 

      <div class="action-group">
        <a href="#" class="view-btn" data-file="${encodeURIComponent(filePath)}">Xem</a>
        <button class="approve-btn">Phê duyệt</button>
        <button class="reject-btn">Từ chối</button>
      </div>
    </div> 
  </div> 
`;
    documentList.appendChild(item);
// || (log.status !== 'CHỜ XÉT DUYỆT' && log.status !== 'APPROVED')
//dieu kien quyen
if (roleLevel === '3') {
  hideActionButtons(item);
}
if (roleLevel ==='2' && (log.status === 'ĐÃ ĐƯỢC PHÊ DUYỆT'||log.status === 'HOÀN THÀNH')){
  hideActionButtons(item);
}

if (roleLevel == '1' && (log.status === 'CHỜ XÉT DUYỆT' ||log.status === 'HOÀN THÀNH' )){
  hideActionButtons(item);
}

    // nút xem tài liệu
const viewBtn = item.querySelector('.view-btn');
if (viewBtn) {
  viewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const file = decodeURIComponent(viewBtn.dataset.file || '');
    if (!file) return alert('Không có file để xem');
    window.location.href = `decrypt.html?file=${encodeURIComponent(file)}`;
  });
}

// nút phê duyệt
const approveBtn = item.querySelector('.approve-btn');
if (approveBtn) {
  approveBtn.addEventListener('click', async () => {
    try {
      approveBtn.disabled = true;
      const updatedLog = structuredClone(log);
      if(roleLevel ==='2'){updatedLog.status = 'ĐÃ ĐƯỢC PHÊ DUYỆT';}
      else if(roleLevel ==='1'){
        updatedLog.status = 'HOÀN THÀNH';
      }
      console.log("status", updatedLog.status);
      const response = await fetch(`http://localhost:8080/user/log/update/${updatedLog.logId}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedLog)
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Update error:', errText);
        alert('Lỗi khi cập nhật trạng thái!');
        approveBtn.disabled = false;
        return;
      }

      appendStatusLine(item, 'Tài liệu đã được phê duyệt');
      hideActionButtons(item); 
    } catch (e) {
      console.error(e);
      alert('Lỗi kết nối đến server!');
      approveBtn.disabled = false;
    }
  });
}

// nút từ chối
const rejectBtn = item.querySelector('.reject-btn');
if (rejectBtn) {
  rejectBtn.addEventListener('click', async () => {
    try {
      rejectBtn.disabled = true;
      const updatedLog = structuredClone(log);
      updatedLog.status = 'TỪ CHỐI';
      console.log("status", updatedLog.status);
      const response = await fetch(`http://localhost:8080/user/log/update/${updatedLog.logId}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedLog)
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Update error:', errText);
        alert('Lỗi khi cập nhật trạng thái!');
        rejectBtn.disabled = false;
        return;
      }

      appendStatusLine(item, 'Tài liệu đã bị từ chối');
      hideActionButtons(item); 
    } catch (e) {
      console.error(e);
      alert('Lỗi kết nối đến server!');
      rejectBtn.disabled = false;
    }
  });
}
  });
}

//ẩn hiện dữ liệu
function hideActionButtons(item) {
  const approveBtn = item.querySelector('.approve-btn');
  const rejectBtn = item.querySelector('.reject-btn');

  if (approveBtn) approveBtn.style.display = 'none';
  if (rejectBtn) rejectBtn.style.display = 'none';
}


// thêm 1 dòng trạng thái vào item
function appendStatusLine(item, text) {
  const s = document.createElement('div');
  s.className = 'status-line';
  const now = new Date().toLocaleString('vi-VN');
  s.textContent = `${text} — ${now}`;
  item.appendChild(s);
}

  //goi api theo role
  try {
    if (roleLevel === '1') {
      const userdto = await getUserByUsername(username);
      const departmentName = userdto.departmentDto.departmentName;
      const res = await fetch(`http://localhost:8080/user/log/departments?departmentName=${departmentName}`, {
         headers: {
                'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
      });
      const data = await res.json();
      renderDocuments(data);

    } else if (roleLevel === '2') {
      const userdto = await getUserByUsername(username);
      console.log("user" ,userdto)
      const departmentId = userdto.departmentDto.departmentId;
      console.log("dep" ,departmentId)
      const res = await fetch(`http://localhost:8080/user/log/department/${departmentId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      renderDocuments(data);

    } else if (roleLevel === '3') {
      const res = await fetch(`http://localhost:8080/user/log/userid/${username}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      renderDocuments(data);
    }
  } catch (error) {
    console.error(error);
    alert("Không thể lấy dữ liệu từ server!");
  }
});
