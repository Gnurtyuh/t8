
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString('vi-VN');
    document.getElementById('current-time').textContent = `${time}, ${date}`;
}
setInterval(updateTime, 1000);
updateTime();

// Chuyển tab
document.querySelectorAll('.sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const tabId = this.getAttribute('href').substring(1);
        if (tabId === 'logout-link') return;
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
        document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
        this.parentElement.classList.add('active');
    });
});

// Danh sach nhan vien sau khi call api
let users = [];
function loadUserOption() {
    getAllUser().then(users => {
        const selectUser = document.getElementById("assign-user");
            selectUser.innerHTML = '<option value ="">Chọn người dùng</option>';
            users.forEach(user => {
                const option = document.createElement("option");
                option.value = user.username;
                option.textContent = `${user.fullName}-${user.email}`;
                selectUser.appendChild(option);
            });
            
    });
}
function loadUserTable() {
    getAllUser().then(users => {
        const tbody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        users.forEach(user => {
          const row = tbody.insertRow();
          row.innerHTML = `
            <td>${user.fullName}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.department}</td>
            <td>${user.role}</td>
          `;
        });
      });
}

function loadRecentUsers() {
    getAllUser().then(users => {
        const tbody = document.getElementById('recent-users').getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        users.forEach(user => {
          const row = tbody.insertRow();
          row.innerHTML = `
            <td>${user.fullName}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
          `;
        });
      });
}

async function addUser() {
    const fields = [
        { id: 'username', warnId: 'warn-username' },
        { id: 'password', warnId: 'warn-password' },
        { id: 'email', warnId: 'warn-email' },
        { id: 'full-name', warnId: 'warn-fullname' }
      ];
      // Bien de kiem soat tinh hop le 
      let isValid = true;
      
      // Check input rong hay khong 
      fields.forEach(field => {
        const input = document.getElementById(field.id);
        const warnIcon = document.getElementById(field.warnId);
        //Lay gia tri tu input va xoa khoang trang dau/cuoi,
        if (!input.value.trim()) {
          warnIcon.style.display = 'inline';
          isValid = false;
        } else {
          warnIcon.style.display = 'none';
        }
      });
      
      if (!isValid) return;
    const select = document.getElementById('department')
    const selectedOption = select.options[select.selectedIndex];
    const departmentName = selectedOption.dataset.departmentName;
    const division = selectedOption.dataset.division;
    const newUser = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        fullName: document.getElementById('full-name').value,
        departmentDto : {
            departmentName,
            division
        }
    }
    try {
   const response = await fetch(addreddApiCreateUser, {
        method: 'POST',
        headers: 
        {'Content-Type' : 'application/json'},
        body:
        JSON.stringify(newUser)
    });
    if(!response.ok) {throw new Error("Lỗi khi gọi Api")}
    alert("Thêm thành công nhân viên:",username);
    console.log(newUser);
    //Xoa cac phan input vua nhap
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('email').value = '';
    document.getElementById('full-name').value = '';
    document.getElementById('department').selectedIndex = 0;
    fields.forEach(field => {
        document.getElementById(field.warnId).style.display = 'none';
      });
} catch(err){
    console.error(err);
}
}

//
const searchInput = document.getElementById("permission-user");
const searchResults = document.getElementById("search-results");
searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    if(keyword === "") {
        searchResults.style.display = "none";
        return;
    }
    const filtered = users.filter(user => 
        user.fullName.toLowerCase().includes(keyword) ||
        user.username.toLowerCase().includes(keyword) ||
        user.department.toLowerCase().includes(keyword)
    );
    renderSearchResults(filtered);
})
let selectUser = null;
function renderSearchResults(list) {
    searchResults.innerHTML = "";

    if(list.length === 0) {
        searchResults.innerHTML = "<div>Không có kết quả</div>";
    } else {
        list.forEach(user => {
            const div = document.createElement("div");
            div.textContent = `${user.fullName} - ${user.username} (${user.email})`;
            div.addEventListener("click",() => {
                selectUser = user;
                searchInput.value = `${user.fullName} - ${user.username} (${user.email})`;    
                searchResults.style.display = "none";
            });
            searchResults.appendChild(div);
        });
    }
    searchResults.style.display = "block";
}
document.addEventListener("click",(e) => {
    if(!e.target.closest(".form-group")) {
        searchResults.style.display = "none";
    }
})
//
const searchInput02 = document.getElementById("assign-user");
const searchResults02 = document.getElementById("assign-results");
searchInput02.addEventListener("input", () => {
const keyword = searchInput02.value.trim().toLowerCase();
if(keyword === "") {
searchResults02.style.display = "none";
return;
}
const filtered = users.filter(user => 
user.fullName.toLowerCase().includes(keyword) ||
user.username.toLowerCase().includes(keyword) ||
user.department.toLowerCase().includes(keyword)
);
renderSearchResults02(filtered);
})
let selectUser02 = null;
function renderSearchResults02(list) {
searchResults02.innerHTML = "";

if(list.length === 0) {
searchResults02.innerHTML = "<div>Không có kết quả</div>";
} else {
list.forEach(user => {
    const div = document.createElement("div");
    div.textContent = `${user.fullName} - ${user.username} (${user.email})`;
    div.addEventListener("click",() => {
        selectUser02 = user;
        searchInput02.value = `${user.fullName} - ${user.username} (${user.email})`;    
        searchResults02.style.display = "none";
    });
    searchResults02.appendChild(div);
});
}
searchResults02.style.display = "block";
}
document.addEventListener("click",(e) => {
if(!e.target.closest(".form-group")) {
searchResults02.style.display = "none";
}
})


function updatePermission() {

   if(!selectUser) {
    alert("Vui lòng chọn nhân viên trước");
    return;
   }
   const selectRole = document.getElementById("permission-role").value;
   const addreddApiUpdateUser = `http://localhost:8080/admin/updateRole/${selectUser.username}`;
   const updateData = {
        username: selectUser.username,
        roleLevel: parseInt(selectRole)
   };
   console.log(updateData);
   fetch(addreddApiUpdateUser, {
    method:"PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(updateData)
   })
   .then(response => {
    if(!response.ok) {
        throw new Error("Cập nhập thất bại");
    }
    return response.json();
   })
   .then(data => {
        alert("Chỉnh sửa chức vụ thành công");
        window.location.reload();
   })
   .catch(error => {
    console.error(error);
   })
}

function filterUsers() {
    getAllUser().then(user => {
    const searchTerm = document.getElementById('search-user').value.toLowerCase();
    const tbody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    const rows = tbody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        user.fullName = rows[i].cells[0].textContent.toLowerCase();
        user.sername = rows[i].cells[1].textContent.toLowerCase();
        user.email = rows[i].cells[2].textContent.toLowerCase();
        if (searchTerm === '' || fullName.includes(searchTerm) || username.includes(searchTerm) || email.includes(searchTerm)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
});
}


// Hàm tải dữ liệu tài liệu động (giả lập API)
let documents = [];
function loadDocuments() {
    getAllDocument().then(docs => {
    const documentList = document.getElementById('document-list');
    documentList.innerHTML = '';
    docs.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'doc-card';
        card.innerHTML = `
            <p class="title">Tên Tài Liệu: ${doc.name}</p>
            <p>Ngày Gửi: ${doc.date}</p>
            <p>Trạng Thái: ${doc.status}</p>
        `;
        documentList.appendChild(card);
    });
});
}

function loadRecentDocuments() {
getAllDocument().then(docs => {
    const documentList = document.getElementById('recent-documents');
    documentList.innerHTML = '';
    docs.slice(0, 3).forEach(doc => {
        const card = document.createElement('div');
        card.className = 'doc-card';
        card.innerHTML = `
            <p class="title">Tên Tài Liệu: ${doc.name}</p>
            <p>Ngày Gửi: ${doc.date}</p>
            <p>Trạng Thái: ${doc.status}</p>
        `;
        documentList.appendChild(card);
    });
});
}

function filterDocuments() {
    getAllDocument().then(docs => {
    const filterDate = document.getElementById('search-date').value;
    const searchTerm = document.getElementById('search-document').value.toLowerCase();
    const documentList = document.getElementById('document-list');
    documentList.innerHTML = '';

    const filteredDocs = docs.filter(doc => 
        (!filterDate || doc.date === filterDate) && 
        (!searchTerm || doc.name.toLowerCase().includes(searchTerm))
    );
    filteredDocs.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'doc-card';
        card.innerHTML = `
            <p class="title">Tên Tài Liệu: ${doc.name}</p>
            <p>Ngày Gửi: ${doc.date}</p>
            <p>Trạng Thái: ${doc.status}</p>
        `;
        documentList.appendChild(card);
    });
});
}


function toggleView() {
    const documentList = document.getElementById('document-list');
    const chartContainer = document.getElementById('chart-container');
    if (documentList.style.display !== 'none') {
        documentList.style.display = 'none';
        chartContainer.style.display = 'block';
        generateChart();
    } else {
        documentList.style.display = 'flex';
        chartContainer.style.display = 'none';
        loadDocuments();
    }
}

function generateChart() {
getAllDocument().then(docs => {
    const statusCount = {};
    docs.forEach(doc => {
        statusCount[doc.status] = (statusCount[doc.status] || 0) + 1;
    });

    const chartContainer = document.getElementById('chart-container');
    chartContainer.innerHTML = '';

    const chartCode = `
    <chartjs>
    {
        "type": "bar",
        "data": {
            "labels": ["${Object.keys(statusCount).join('", "')}"],
            "datasets": [{
                "label": "Số lượng tài liệu",
                "data": [${Object.values(statusCount).join(', ')}],
                "backgroundColor": ["#4a90e2", "#e67e22"],
                "borderColor": ["#357ab7", "#d35400"],
                "borderWidth": 1
            }]
        },
        "options": {
            "scales": {
                "y": {
                    "beginAtZero": true
                }
            }
        }
    }
    </chartjs>
    `;
    chartContainer.innerHTML = chartCode;
});
}

// Hàm tải dữ liệu log động (giả lập API)
let logs = [];
function loadLogs() {
    getAllLog().then(log => {
    const logContainer = document.getElementById('log-container');
    logContainer.innerHTML = '';

    log.forEach(log => {
        const card = document.createElement('div');
        card.className = 'log-card';
        card.innerHTML = `
            <p class="title">Tên người đăng hành động: ${log.fullName}</p>
            <p>Target: ${log.target}</p>
            <p>Tên tài liệu: ${log.documentName}</p>
            <p>Trạng thái: ${log.status}</p>
            <p>Description: ${log.description}</p>
            <p>Thời gian tạo file: ${log.timeCreate}</p>
            <p>Thời gian hoàn thành: ${log.timeCompleted}</p>
            <p>Tên phòng ban: ${log.departmentName}</p>
        `;
        logContainer.appendChild(card);
    });
});
}

function loadRecentLogs() {
    getAllLog().then(logs => {
    const logContainer = document.getElementById('recent-logs');
    logContainer.innerHTML = '';

    logs.forEach(log => {
        const card = document.createElement('div');
        card.className = 'log-card';
        card.innerHTML = `
            <p class="title">Tên người đăng hành động: ${log.fullName}</p>
            <p>Target: ${log.target}</p>
            <p>Tên tài liệu: ${log.documentName}</p>
            <p>Trạng thái: ${log.status}</p>
            <p>Description: ${log.description}</p>
            <p>Thời gian tạo file: ${log.timeCreate}</p>
            <p>Thời gian hoàn thành: ${log.timeCompleted}</p>
            <p>Tên phòng ban: ${log.departmentName}</p>
        `;
        logContainer.appendChild(card);
    });
});
}

// function filterHistory() {
//     getAllLog().then(logs => {
//     const filterDate = document.getElementById('history-date-filter').value;
//     const searchTerm = document.getElementById('search-log').value.toLowerCase();


//     const logContainer = document.getElementById('log-container');
//     logContainer.innerHTML = '';

//     const filteredLogs = logs.filter(log => 
//         (!filterDate || log.timeCompleted.split(' ')[0] === filterDate) && 
//         (!searchTerm || log.fullName.toLowerCase().includes(searchTerm) || log.documentName.toLowerCase().includes(searchTerm) || log.departmentName.toLowerCase().includes(searchTerm))
//     );
//     filteredLogs.forEach(log => {
//         const card = document.createElement('div');
//         card.className = 'log-card';
//         card.innerHTML = `
//             <p class="title">Tên người đăng hành động: ${log.fullName}</p>
//             <p>Target: ${log.target}</p>
//             <p>Tên tài liệu: ${log.documentName}</p>
//             <p>Trạng thái: ${log.status}</p>
//             <p>Description: ${log.description}</p>
//             <p>Thời gian tạo file: ${log.timeCreate}</p>
//             <p>Thời gian hoàn thành: ${log.timeCompleted}</p>
//             <p>Tên phòng ban: ${log.departmentName}</p>
//         `;
//         logContainer.appendChild(card);
//     });
// });
// }

// Quản Lý Phòng Ban
// function loadDepartments() {
//     const departments = [
//         { name: "Phòng Nhân Sự", description: "Quản lý nhân sự công ty", division: "Bộ phận Hành chính" },
//         { name: "Phòng CNTT", description: "Hỗ trợ công nghệ thông tin", division: "Bộ phận Công nghệ" }
//     ];
//     const departmentList = document.getElementById('department-list');
//     departmentList.innerHTML = '';
//     departments.forEach(dept => {
//         const card = document.createElement('div');
//         card.className = 'dept-card';
//         card.innerHTML = `
//             <p class="title">Tên Phòng Ban: ${dept.name}</p>
//             <p>Mô Tả: ${dept.description}</p>
//             <p>Tên Bộ Phận: ${dept.division}</p>
//         `;
//         departmentList.appendChild(card);
//     });
// }
function loadDepartmentList() {
    fetch('http://localhost:8080/admin/department/AllDepartment')
    .then(response => {
        if(!response.ok) throw new Error("Lỗi khi lấy thông tin phòng ban!");
        return response.json();
    })
    .then(data => {
        const departmentList = document.getElementById('department-list');
        departmentList.innerHTML = '';
       
        data.forEach(depart => {
            const card = document.createElement('div');
            card.className = 'dept-card';
            card.innerHTML = `
             <p class="title">Tên Phòng Ban: ${depart.departmentName}</p>
                    <p>Mô Tả: ${depart.description}</p>
                    <p>Tên Bộ Phận: ${depart.division}</p>
            `;
            departmentList.append(card);
        });
    })
    .catch(error => {
        console.error(error);
    })
}
// setInterval(loadDepartments, 5000);
window.onload = loadDepartmentList;


function loadDepartmentInfo() {
    fetch(addreddApiGetAll)
    .then(response => {
        if(!response.ok) throw new Error("Lỗi khi lấy thông tin phòng ban!");
        return response.json();
    })
    .then(data => {    
       
    const departmentList = document.getElementById('department-info');
    departmentList.innerHTML = '';
    data.forEach(dept => {
        const card = document.createElement('div');
        card.className = 'dept-card';
        card.innerHTML = `
            <p class="title">Tên Phòng Ban: ${dept.departmentName}</p>
            <p>Mô Tả: ${dept.description}</p>
            <p>Tên Bộ Phận: ${dept.division}</p>
        `;
        departmentList.appendChild(card);
    });
})
.catch(error => {
    console.error(error);
})
}

/////////////
function assignUserToDepartment() {
    const assignForm = document.getElementById('assign-form');
    const isActive = assignForm.classList.toggle('active');
    if (isActive) {
      setTimeout(() => {
        loadDepartments();
        setTimeout(() => loadUsers(),100);
      }, 0);
    }
  }

  function loadDepartments() {
    fetch(addreddApiGetAll)
      .then(response => {
        if (!response.ok) throw new Error("Error");
        return response.json();
      })
      .then(data => {
        const departSelect = document.getElementById("assign-dept");
        if (!departSelect) return;
  
        departSelect.innerHTML = '<option value="">Chọn phòng ban</option>';
  
        data.forEach(depart => {
          const option = document.createElement("option");
          option.value = `${depart.division} ${depart.departmentName}`;
          option.textContent = depart.departmentName;
          departSelect.appendChild(option);
        });
      })
      .catch(error => console.error("Department error:", error));
  }
  
  function loadUsers() {
    getAllUser()
      .then(users => {
        const selectUser = document.getElementById("assign-user-select");
        if (!selectUser) return;
     
        selectUser.innerHTML = '<option value="">Chọn người dùng</option>';
        users.forEach(user => {
          const option = document.createElement("option");
          option.value = user.username;
          option.textContent = `${user.fullName} - ${user.email} - ${user.department}`;
          selectUser.appendChild(option);
        });
      })
      .catch(error => console.error("User error:", error));
  }
    
// function filterDepartments() {
//     const searchTerm = document.getElementById('search-department').value.toLowerCase();
//     const departmentList = document.getElementById('department-list');
//     departmentList.innerHTML = '';
//     const filteredDepartments = departmentList.filter(dept => 
//         !searchTerm || dept.name.toLowerCase().includes(searchTerm)
//     );
//     filteredDepartments.forEach(dept => {
//         const card = document.createElement('div');
//         card.className = 'dept-card';
//         card.innerHTML = `
//             <p class="title">Tên Phòng Ban: ${dept.departmentName}</p>
//             <p>Mô Tả: ${dept.description}</p>
//             <p>Tên Bộ Phận: ${dept.division}</p>
//         `;
//         departmentList.appendChild(card);
//     });
// }
function confirm() {
    const deptSelect = document.getElementById("assign-dept");
    const userSelect = document.getElementById("assign-user-select");
  
    // Lấy giá trị được chọn
    const selectedDept = deptSelect.value;
    const selectedUser = userSelect.value;
  
    // Kiểm tra người dùng đã chọn đủ chưa
    if (!selectedDept || !selectedUser) {
      alert("Vui lòng chọn đầy đủ phòng ban và người dùng!");
      return;
    }
  
    // Tạo object gửi đi
    const updateData = {
      username: selectedUser,
      department: selectedDept 
    };
    const addreddApiUpdateDepartment = `http://localhost:8080/admin/updateDepartment/${selectedUser}`;
    fetch(addreddApiUpdateDepartment, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Cập nhật thất bại!");
          }
          return response.json();
        })
        .then(data => {
          alert("Cập nhật phòng ban thành công!");
          console.log("Phản hồi BE:", data);
        })
        .catch(error => {
          console.error("Lỗi khi cập nhật:", error);
          alert("Có lỗi xảy ra khi cập nhật!");
        });
}
// Tải dữ liệu khi trang được tải
window.onload = function() {
    loadRecentDocuments()
    loadUserOption()
    loadDocuments();
    loadUserTable();
    loadRecentUsers();
    // loadDepartments();
    loadDepartmentList()
    loadDepartmentInfo();
    loadLogs();
    loadRecentLogs();
    // filterHistory();
    // document.getElementById('search-document').addEventListener('input', filterDocuments);
    // document.getElementById('search-user').addEventListener('input', filterUsers);
    // document.getElementById('search-department').addEventListener('input', filterDepartments);
    // document.getElementById('search-log').addEventListener('input', filterHistory);
    // document.getElementById('search-date').addEventListener('input', filterDocuments);
    // document.getElementById('history-date-filter').addEventListener('input', filterHistory);
};
