
//         function updateTime() {
//             const now = new Date();
//             const time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
//             const date = now.toLocaleDateString('vi-VN');
//             document.getElementById('current-time').textContent = `${time}, ${date}`;
//         }
//         setInterval(updateTime, 1000);
//         updateTime();

//         // Chuyển tab
//         document.querySelectorAll('.sidebar a').forEach(anchor => {
//             anchor.addEventListener('click', function(e) {
//                 e.preventDefault();
//                 const tabId = this.getAttribute('href').substring(1);
//                 if (tabId === 'logout-link') return;
//                 document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
//                 document.getElementById(tabId).classList.add('active');
//                 document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
//                 this.parentElement.classList.add('active');
//             });
//         });

//         // function lay va hien thi tat ca nguoi dung
//         function loadUserTable() {
//             let users = [];
//             fetch(addreddApiGetAllUser)
//             .then(response => {
//                 if(!response.ok) throw new Error("Lỗi khi tải nhân viên");
//                 return response.json();
//             })
//             .then(data => {
//                 users = data.map(user => {
//                     const departmentName = user.departmentDto?.departmentName;
//                     const division = user.departmentDto?.division;
//                     const departmentDisplay = departmentName ? `${departmentName} - ${division}` : division;
            
//                     let roleName = "";
//                     if(user.roleLevel === 1) roleName = "Giám đốc";
//                     else if (user.roleLevel === 2) roleName = "Trưởng phòng";
//                     else if (user.roleLevel === 3) roleName = "Nhân viên";
//                     else roleName = "Không xác định";
//                     return {
//                     fullName: user.fullName,
//                     username: user.username,
//                     email: user.email,
//                     department: departmentDisplay,
//                     role: roleName
//                     };
//                 });
//                 // console.log("Danh sách nhân viên",users);
//                 const tbody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
//                 tbody.innerHTML = '';
//                 users.forEach((user) => {
//                     const row = tbody.insertRow();
//                     row.innerHTML = `
//                         <td>${user.fullName}</td>
//                         <td>${user.username}</td>
//                         <td>${user.email}</td>
//                         <td>${user.department}</td>
//                         <td>${user.role}</td>
                      
//                     `;
//                 });
//             })
//             .catch(error => {
//                 console.error("Lỗi", error);
//             });
     
//         }
      
//         function loadRecentUsers() {
//             let users = [];
//             fetch(addreddApiGetAllUser)
//             .then(response => {
//                 if(!response.ok) throw new Error("Lỗi khi tải nhân viên");
//                 return response.json();
//             })
//             .then(data => {
//                 users = data.map(user => {
//                     const departmentName = user.departmentDto?.departmentName;
//                     const division = user.departmentDto?.division;
//                     const departmentDisplay = departmentName ? `${departmentName} - ${division}` : division;
            
//                     let roleName = "";
//                     if(user.roleLevel === 1) roleName = "Giám đốc";
//                     else if (user.roleLevel === 2) roleName = "Trưởng phòng";
//                     else if (user.roleLevel === 3) roleName = "Nhân viên";
//                     else roleName = "Không xác định";
//                     return {
//                     fullName: user.fullName,
//                     username: user.username,
//                     email: user.email,
//                     department: departmentDisplay,
//                     role: roleName
//                     };
//                 });
//                 // console.log("Danh sách nhân viên",users);
//                 const tbody = document.getElementById('recent-users').getElementsByTagName('tbody')[0];
//                 tbody.innerHTML = '';
//                 users.forEach((user) => {
//                     const row = tbody.insertRow();
//                     row.innerHTML = `
//                         <td>${user.fullName}</td>
//                         <td>${user.username}</td>
//                         <td>${user.email}</td>
                       
//                         <td>${user.role}</td>
                      
//                     `;
//                 });
//             })
//             .catch(error => {
//                 console.error("Lỗi", error);
//             });
//         }

//         async function addUser() {
//             const fields = [
//                 { id: 'username', warnId: 'warn-username' },
//                 { id: 'password', warnId: 'warn-password' },
//                 { id: 'email', warnId: 'warn-email' },
//                 { id: 'full-name', warnId: 'warn-fullname' }
//               ];
//               // Bien de kiem soat tinh hop le 
//               let isValid = true;
              
//               // Check input rong hay khong 
//               fields.forEach(field => {
//                 const input = document.getElementById(field.id);
//                 const warnIcon = document.getElementById(field.warnId);
//                 //Lay gia tri tu input va xoa khoang trang dau/cuoi,
//                 if (!input.value.trim()) {
//                   warnIcon.style.display = 'inline';
//                   isValid = false;
//                 } else {
//                   warnIcon.style.display = 'none';
//                 }
//               });
              
//               if (!isValid) return;
//             const select = document.getElementById('department')
//             const selectedOption = select.options[select.selectedIndex];
//             const departmentName = selectedOption.dataset.departmentName;
//             const division = selectedOption.dataset.division;
//             const newUser = {
//                 username: document.getElementById('username').value,
//                 password: document.getElementById('password').value,
//                 email: document.getElementById('email').value,
//                 fullName: document.getElementById('full-name').value,
//                 departmentDto : {
//                     departmentName,
//                     division
//                 }
//             }
//             try {
//            const response = await fetch(addreddApiCreateUser, {
//                 method: 'POST',
//                 headers: 
//                 {'Content-Type' : 'application/json'},
//                 body:
//                 JSON.stringify(newUser)
//             });
//             if(!response.ok) {throw new Error("Lỗi khi gọi Api")}
//             alert("Thêm thành công nhân viên:",username);
//             console.log(newUser);
//             //Xoa cac phan input vua nhap
//             document.getElementById('username').value = '';
//             document.getElementById('password').value = '';
//             document.getElementById('email').value = '';
//             document.getElementById('full-name').value = '';
//             document.getElementById('department').selectedIndex = 0;
//             fields.forEach(field => {
//                 document.getElementById(field.warnId).style.display = 'none';
//               });
//         } catch(err){
//             console.error(err);
//         }
//     }

//         // function deleteUser(index) {
//         //     if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
//         //         users.splice(index, 1);
//         //         loadUserTable();
//         //         loadRecentUsers();
//         //     }
//         // }
// //
//         const searchInput = document.getElementById("permission-user");
//         const searchResults = document.getElementById("search-results");
//         searchInput.addEventListener("input", () => {
//             const keyword = searchInput.value.trim().toLowerCase();
//             if(keyword === "") {
//                 searchResults.style.display = "none";
//                 return;
//             }
//             const filtered = users.filter(user => 
//                 user.fullName.toLowerCase().includes(keyword) ||
//                 user.username.toLowerCase().includes(keyword) ||
//                 user.department.toLowerCase().includes(keyword)
//             );
//             renderSearchResults(filtered);
//         })
//         let selectUser = null;
//         function renderSearchResults(list) {
//             searchResults.innerHTML = "";

//             if(list.length === 0) {
//                 searchResults.innerHTML = "<div>Không có kết quả</div>";
//             } else {
//                 list.forEach(user => {
//                     const div = document.createElement("div");
//                     div.textContent = `${user.fullName} - ${user.username} (${user.email})`;
//                     div.addEventListener("click",() => {
//                         selectUser = user;
//                         searchInput.value = `${user.fullName} - ${user.username} (${user.email})`;    
//                         searchResults.style.display = "none";
//                     });
//                     searchResults.appendChild(div);
//                 });
//             }
//             searchResults.style.display = "block";
//         }
//         document.addEventListener("click",(e) => {
//             if(!e.target.closest(".form-group")) {
//                 searchResults.style.display = "none";
//             }
//         })
// //
// const searchInput02 = document.getElementById("assign-user");
// const searchResults02 = document.getElementById("assign-results");
// searchInput02.addEventListener("input", () => {
//     const keyword = searchInput02.value.trim().toLowerCase();
//     if(keyword === "") {
//         searchResults02.style.display = "none";
//         return;
//     }
//     const filtered = users.filter(user => 
//         user.fullName.toLowerCase().includes(keyword) ||
//         user.username.toLowerCase().includes(keyword) ||
//         user.department.toLowerCase().includes(keyword)
//     );
//     renderSearchResults02(filtered);
// })
// let selectUser02 = null;
// function renderSearchResults02(list) {
//     searchResults02.innerHTML = "";

//     if(list.length === 0) {
//         searchResults02.innerHTML = "<div>Không có kết quả</div>";
//     } else {
//         list.forEach(user => {
//             const div = document.createElement("div");
//             div.textContent = `${user.fullName} - ${user.username} (${user.email})`;
//             div.addEventListener("click",() => {
//                 selectUser02 = user;
//                 searchInput02.value = `${user.fullName} - ${user.username} (${user.email})`;    
//                 searchResults02.style.display = "none";
//             });
//             searchResults02.appendChild(div);
//         });
//     }
//     searchResults02.style.display = "block";
// }
// document.addEventListener("click",(e) => {
//     if(!e.target.closest(".form-group")) {
//         searchResults02.style.display = "none";
//     }
// })

//         function updatePermission() {
        
//            if(!selectUser) {
//             alert("Vui lòng chọn nhân viên trước");
//             return;
//            }
//            const selectRole = document.getElementById("permission-role").value;
//            const addreddApiUpdateUser = `http://localhost:8080/admin/updateRole/${selectUser.username}`;
//            const updateData = {
//                 username: selectUser.username,
//                 roleLevel: parseInt(selectRole)
//            };
//            console.log(updateData);
//            fetch(addreddApiUpdateUser, {
//             method:"PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(updateData)
//            })
//            .then(response => {
//             if(!response.ok) {
//                 throw new Error("Cập nhập thất bại");
//             }
//             return response.json();
//            })
//            .then(data => {
//                 alert("Chỉnh sửa chức vụ thành công");
//                 window.location.reload();
//            })
//            .catch(error => {
//             console.error(error);
//            })
//         }

//         function filterUsers() {
//             const searchTerm = document.getElementById('search-user').value.toLowerCase();
//             const tbody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
//             const rows = tbody.getElementsByTagName('tr');
//             for (let i = 0; i < rows.length; i++) {
//                 const fullName = rows[i].cells[0].textContent.toLowerCase();
//                 const username = rows[i].cells[1].textContent.toLowerCase();
//                 const email = rows[i].cells[2].textContent.toLowerCase();
//                 if (searchTerm === '' || fullName.includes(searchTerm) || username.includes(searchTerm) || email.includes(searchTerm)) {
//                     rows[i].style.display = '';
//                 } else {
//                     rows[i].style.display = 'none';
//                 }
//             }
//         }

//         // Lay danh sach tai lieu va do len giao dien nguoi dung
//         let documents = [];
//         const addreddApiGetAllDocument = 'http://localhost:8080/admin/documents';
// fetch(addreddApiGetAllDocument)
// .then(response => {
//     if(!response.ok) throw new Error("Lỗi khi tải tài liệu");
//     return response.json();
// })
// .then(data => {
//     documents = data.map(document => {
//         const formatted = new Date(document.uploadDate).toLocaleString('vi-VN', {
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//             second: '2-digit'
//         });
//         let roleName = "";
//         if(document.userDto.roleLevel === 1) roleName = "Giám đốc";
//         else if(document.userDto.roleLevel === 2) roleName = "Trưởng phòng";
//         else if(document.userDto.roleLevel === 3) roleName = "Nhân viên"
//         else roleName = "Không xác định";
//         return {
//             name: document.title,
//             fullName: document.userDto.fullName,
//             email: document.userDto.email,
//             date: formatted,
//             status: document.description,
//             roleName: roleName,
//             department: document.departmentDto.departmentName
//         };
//     });
//     console.log("Danh sách tài liệu",documents);
// })
// .catch(error => {
//     console.log(error);
// });
// //
// const searchdocument = document.getElementById("search-document");
// const searchresults04 = document.getElementById("assign-results1");
// searchdocument.addEventListener("input", () => {
//     const keyword = search-document.value.trim().toLowerCase();
//     if(keyword === "") {
//         searchresults04.style.display = "none";
//         return;
//     }
//     const filtered = documents.filter(document => 
//         document.name.toLowerCase().includes(keyword) ||
//         document.fullName.toLowerCase().includes(keyword) ||
//         document. email.toLowerCase().includes(keyword) ||
//         document.date.toLowerCase().includes(keyword) ||
//         document.status.toLowerCase().includes(keyword) ||
//         document.roleName.toLowerCase().includes(keyword) ||
//         document.department.toLowerCase().includes(keyword)
//     );
//     renderSearchResults03(filtered);
// })
// let searchDocument = null;
// function renderSearchResults03(list) {
//     searchresults04.innerHTML = "";

//     if(list.length === 0) {
//         searchresults04.innerHTML = "<div>Không có kết quả</div>";
//     } else {
//         list.forEach(document => {
//             const div = document.createElement("div");
//             div.textContent = `${document .name} - ${document .fullName} - ${document.email}`;
//             div.addEventListener("click",() => {
//                 searchDocument = document;
//                 searchdocument.value = `${document.fullName} - ${document.username} (${document.email})`;    
//                 searchresults04.style.display = "none";
//             });
//             searchresults04.appendChild(div);
//         });
//     }
//     searchresults04.style.display = "block";
// }
// document.addEventListener("click",(e) => {
//     if(!e.target.closest(".search-group1")) {
//         searchresults04.style.display = "none";
//     }
// })
// //
//         function loadDocuments() {
//             const documentList = document.getElementById('document-list');
//             documentList.innerHTML = '';

//             documents.forEach(doc => {
//                 const card = document.createElement('div');
//                 card.className = 'doc-card';
//                 card.innerHTML = `
//                     <p class="title">Tên tài liệu: ${doc.name}</p>
//                     <p>Ngày gửi: ${doc.date}</p>
//                     <p>Mô tả: ${doc.status}</p>
//                     <p>Nhân viên: ${doc.fullName}</p>
//                     <p>Chức vụ: ${doc.roleName}</p>
//                     <p>Email: ${doc.email}</p>
//                     <div class="actions">
//                         <button onclick="viewDocument('${doc.name}')">Xem</button>
//                     </div>
//                 `;
//                 documentList.appendChild(card);
//             });
//         }

//         function loadRecentDocuments() {
//             const documents = [
//                 // { name: "document.pdf", date: "15/10/2025", status: "Hoàn thành" },
//                 // { name: "report.docx", date: "14/10/2025", status: "Đang xử lý" },
//                 // { name: "presentation.pptx", date: "13/10/2025", status: "Hoàn thành" }
//             ];

//             const documentList = document.getElementById('recent-documents');
//             documentList.innerHTML = '';

//             documents.slice(0, 3).forEach(doc => {
//                 const card = document.createElement('div');
//                 card.className = 'doc-card';
//                 card.innerHTML = `
//                     <p class="title">Tên Tài Liệu: ${doc.name}</p>
//                     <p>Ngày Gửi: ${doc.date}</p>
//                     <p>Trạng Thái: ${doc.status}</p>
//                 `;
//                 documentList.appendChild(card);
//             });
//         }

//         function filterDocuments() {
//             const filterDate = document.getElementById('search-date').value;
//             const searchTerm = document.getElementById('search-document').value.toLowerCase();
//             // const documents = [
//             //     { name: "document.pdf", date: "15/10/2025", status: "Hoàn thành" },
//             //     { name: "report.docx", date: "14/10/2025", status: "Đang xử lý" },
//             //     { name: "presentation.pptx", date: "13/10/2025", status: "Hoàn thành" }
//             // ];

//             const documentList = document.getElementById('document-list');
//             documentList.innerHTML = '';

//             const filteredDocs = documents.filter(doc => 
//                 (!filterDate || doc.date === filterDate) && 
//                 (!searchTerm || doc.name.toLowerCase().includes(searchTerm))
//             );
//             filteredDocs.forEach(doc => {
//                 const card = document.createElement('div');
//                 card.className = 'doc-card';
//                 card.innerHTML = `
//                     <p class="title">Tên Tài Liệu: ${doc.name}</p>
//                     <p>Ngày Gửi: ${doc.date}</p>
//                     <p>Trạng Thái: ${doc.status}</p>
//                     <div class="actions">
//                         <button onclick="viewDocument('${doc.name}')">Xem</button>
//                     </div>
//                 `;
//                 documentList.appendChild(card);
//             });
//         }

//         function viewDocument(docName) {
//             alert(`Đang xem tài liệu: ${docName}`);
//         }

//         function toggleView() {
//             const documentList = document.getElementById('document-list');
//             const chartContainer = document.getElementById('chart-container');
//             if (documentList.style.display !== 'none') {
//                 documentList.style.display = 'none';
//                 chartContainer.style.display = 'block';
//                 generateChart();
//             } else {
//                 documentList.style.display = 'flex';
//                 chartContainer.style.display = 'none';
//                 loadDocuments();
//             }
//         }

//         function generateChart() {
//             const documents = [
//                 { name: "document.pdf", date: "15/10/2025", status: "Hoàn thành" },
//                 { name: "report.docx", date: "14/10/2025", status: "Đang xử lý" },
//                 { name: "presentation.pptx", date: "13/10/2025", status: "Hoàn thành" }
//             ];

//             const statusCount = {};
//             documents.forEach(doc => {
//                 statusCount[doc.status] = (statusCount[doc.status] || 0) + 1;
//             });

//             const chartContainer = document.getElementById('chart-container');
//             chartContainer.innerHTML = '';

//             const chartCode = `
//             <chartjs>
//             {
//                 "type": "bar",
//                 "data": {
//                     "labels": ["${Object.keys(statusCount).join('", "')}"],
//                     "datasets": [{
//                         "label": "Số lượng tài liệu",
//                         "data": [${Object.values(statusCount).join(', ')}],
//                         "backgroundColor": ["#4a90e2", "#e67e22"],
//                         "borderColor": ["#357ab7", "#d35400"],
//                         "borderWidth": 1
//                     }]
//                 },
//                 "options": {
//                     "scales": {
//                         "y": {
//                             "beginAtZero": true
//                         }
//                     }
//                 }
//             }
//             </chartjs>
//             `;
//             chartContainer.innerHTML = chartCode;
//         }

//         // Hàm tải dữ liệu log động 
//         let logs = [];
//         const addreddApiGetAllLog = 'http://localhost:8080/admin/log/all';
// fetch(addreddApiGetAllLog)
// .then(response => {
//     if(!response.ok) throw new Error("Lỗi khi lấy thông tin");
//     return response.json();
// })
// .then(data => {
//     logs = data.map(log => {
//         let roleName = "";
//         if(log.userDto.roleLevel === 1) roleName = "Giám đốc";
//         else if(log.userDto.roleLevel === 2) roleName = "Trưởng phòng";
//         else if(log.userDto.roleLevel === 3) roleName = "Giám đốc";
//         else roleName = "Không xác định";
//         return {
//             action: log.action,
//             target: log.target,
//             role: roleName,
//             email: log.userDto.email,
//             fullName: log.userDto.fullName,
//             documentName: log.documentDto.title,
//             description: log.documentDto.description,
//             timeCreate: log.documentDto.uploadDate,
//             timeCreateLog: log.createdAt,
//             timeCompleted: log.completedAt,
//             departmentName: log.departmentDto.departmentName
//         };
//     });
// })
// .catch(error => {
//     console.error(error);
// })
//         function loadLogs() {

//             const logContainer = document.getElementById('log-container');
//             logContainer.innerHTML = '';

//             logs.forEach(log => {
//                 const card = document.createElement('div');
//                 card.className = 'log-card';
//                 card.innerHTML = `
//                     <p class="title">Hành động: ${log.action}</p>
//                     <p class="title">Tên nhân viên tạo: ${log.fullName}</p>
//                     <p>Email: ${log.email}</p>
//                     <p>Chức vụ: ${log.role}</p>
//                     <p>Tên phòng ban: ${log.departmentName}</p>
//                     <p>Tên tài liệu: ${log.documentNamet}</p>
//                     <p>Mục tiêu: ${log.target}</p>
//                     <p>Trạng thái: ${log.status}</p>
//                     <p>Description: ${log.description}</p>
//                     <p>Thời gian tạo file: ${log.timeCreate}</p>
//                     <p>Thời gian hoàn thành: ${log.timeCompleted}</p>
//                 `;
//                 logContainer.appendChild(card);
//             });
//         }

//         function loadRecentLogs() {
//             const logContainer = document.getElementById('recent-logs');
//             logContainer.innerHTML = '';

//             logs.forEach(log => {
//                 const card = document.createElement('div');
//                 card.className = 'log-card';
//                 card.innerHTML = `
//                      <p class="title">Hành động: ${log.action}</p>
//                     <p class="title">Tên nhân viên tạo: ${log.fullName}</p>
//                     <p>Email: ${log.email}</p>
//                     <p>Chức vụ: ${log.role}</p>
//                     <p>Tên phòng ban: ${log.departmentName}</p>
//                     <p>Tên tài liệu: ${log.documentNamet}</p>
//                     <p>Mục tiêu: ${log.target}</p>
//                     <p>Trạng thái: ${log.status}</p>
//                     <p>Description: ${log.description}</p>
//                     <p>Thời gian tạo file: ${log.timeCreate}</p>
//                     <p>Thời gian hoàn thành: ${log.timeCompleted}</p>
                    
//                 `;
//                 logContainer.appendChild(card);
//             });
//         }

//         function filterHistory() {
//             const filterDate = document.getElementById('history-date-filter').value;
//             const searchTerm = document.getElementById('search-log').value.toLowerCase();
//             const logContainer = document.getElementById('log-container');
//             logContainer.innerHTML = '';

//             const filteredLogs = logs.filter(log => 
//                 (!filterDate || log.completeTime.split(' ')[0] === filterDate) && 
//                 (!searchTerm || log.actionUser.toLowerCase().includes(searchTerm) || log.document.toLowerCase().includes(searchTerm) || log.department.toLowerCase().includes(searchTerm))
//             );
//             filteredLogs.forEach(log => {
//                 const card = document.createElement('div');
//                 card.className = 'log-card';
//                 card.innerHTML = `
//                    <p class="title">Hành động: ${log.action}</p>
//                     <p class="title">Tên nhân viên tạo: ${log.fullName}</p>
//                     <p>Email: ${log.email}</p>
//                     <p>Chức vụ: ${log.role}</p>
//                     <p>Tên phòng ban: ${log.departmentName}</p>
//                     <p>Tên tài liệu: ${log.documentNamet}</p>
//                     <p>Mục tiêu: ${log.target}</p>
//                     <p>Trạng thái: ${log.status}</p>
//                     <p>Description: ${log.description}</p>
//                     <p>Thời gian tạo file: ${log.timeCreate}</p>
//                     <p>Thời gian hoàn thành: ${log.timeCompleted}</p>
                  
//                 `;
//                 logContainer.appendChild(card);
//             });
//         }

//         // Quản Lý Phòng Ban
//         // function loadDepartments() {
//         //     const departments = [
//         //         { name: "Phòng Nhân Sự", description: "Quản lý nhân sự công ty", division: "Bộ phận Hành chính" },
//         //         { name: "Phòng CNTT", description: "Hỗ trợ công nghệ thông tin", division: "Bộ phận Công nghệ" }
//         //     ];
//         //     const departmentList = document.getElementById('department-list');
//         //     departmentList.innerHTML = '';
//         //     departments.forEach(dept => {
//         //         const card = document.createElement('div');
//         //         card.className = 'dept-card';
//         //         card.innerHTML = `
//         //             <p class="title">Tên Phòng Ban: ${dept.name}</p>
//         //             <p>Mô Tả: ${dept.description}</p>
//         //             <p>Tên Bộ Phận: ${dept.division}</p>
//         //         `;
//         //         departmentList.appendChild(card);
//         //     });
//         // }
//         const addreddApiGetAll = 'http://localhost:8080/admin/department/AllDepartment';
//         function loadDepartments() {
//             fetch(addreddApiGetAll)
//             .then(response => {
//                 if(!response.ok) throw new Error("Lỗi khi lấy thông tin phòng ban!");
//                 return response.json();
//             })
//             .then(data => {
//                 const departmentList = document.getElementById('department-list');
//                 departmentList.innerHTML = '';
        
//                 data.forEach(depart => {
//                     const card = document.createElement('div');
//                     card.className = 'dept-card';
//                     card.innerHTML = `
//                      <p class="title">Tên Phòng Ban: ${depart.departmentName}</p>
//                             <p>Mô Tả: ${depart.description}</p>
//                             <p>Tên Bộ Phận: ${depart.division}</p>
//                     `;
//                     departmentList.append(card);
//                 });
//             })
//             .catch(error => {
//                 console.error(error);
//             })
//         }
//         // setInterval(loadDepartments, 5000);
//         window.onload = loadDepartments;

        
//         function loadDepartmentInfo() {
//             const departments = [
//                 { name: "Phòng Nhân Sự", description: "Quản lý nhân sự công ty", division: "Bộ phận Hành chính" },
//                 { name: "Phòng CNTT", description: "Hỗ trợ công nghệ thông tin", division: "Bộ phận Công nghệ" }
//             ];
//             const departmentList = document.getElementById('department-info');
//             departmentList.innerHTML = '';
//             departments.forEach(dept => {
//                 const card = document.createElement('div');
//                 card.className = 'dept-card';
//                 card.innerHTML = `
//                     <p class="title">Tên Phòng Ban: ${dept.name}</p>
//                     <p>Mô Tả: ${dept.description}</p>
//                     <p>Tên Bộ Phận: ${dept.division}</p>
//                 `;
//                 departmentList.appendChild(card);
//             });
//         }

//         // function createDepartment() {
//         //     const name = document.getElementById('dept-name').value;
//         //     const description = document.getElementById('dept-description').value;
//         //     const division = document.getElementById('dept-division').value;
//         //     if (name && description && division) {
//         //         alert(`Đã tạo phòng ban: ${name} - ${description} - ${division}`);
//         //         document.getElementById('dept-name').value = '';
//         //         document.getElementById('dept-description').value = '';
//         //         document.getElementById('dept-division').value = '';
//         //         loadDepartments();
//         //         loadDepartmentInfo();
//         //     }
//         // }

//         // function toggleAssignForm() {
//         //     const assignForm = document.getElementById('assign-form');
//         //     assignForm.classList.toggle('active');
//         // }

//         function assignUserToDepartment() {
//             const assignForm = document.getElementById('assign-form');
//             assignForm.classList.toggle('active');
//             fetch(addreddApiGetAll)
//             .then(response => {
//                 if(!response.ok) throw new Error("Error");
//                 return response.json();
//             })
//             .then(data => {
//                 const departSelect = document.getElementById("assign-dept");
//                 data.forEach(depart => {
//                     const option = document.createElement("option");
//                     option.textContent = depart.departmentName;
//                     departSelect.appendChild(option);
//                 });
//                 console.log(data);
//             })
//             .catch(error => 
//                 console.error(error));
            
            
//         }
            
            
//             // const dept = document.getElementById('assign-dept').value;
//             // const user = document.getElementById('assign-user').value;
//             // if (dept && user) {
//             //     alert(`Đã gán ${user} vào ${dept}`);
//             //     document.getElementById('assign-dept').value = '';
//             //     document.getElementById('assign-user').value = '';
//             //     toggleAssignForm();
//             // }
        

//         function filterDepartments() {
//             const searchTerm = document.getElementById('search-department').value.toLowerCase();
//             const departments = [
//                 { name: "Phòng Nhân Sự", description: "Quản lý nhân sự công ty", division: "Bộ phận Hành chính" },
//                 { name: "Phòng CNTT", description: "Hỗ trợ công nghệ thông tin", division: "Bộ phận Công nghệ" }
//             ];
//             const departmentList = document.getElementById('department-list');
//             departmentList.innerHTML = '';
//             const filteredDepartments = departments.filter(dept => 
//                 !searchTerm || dept.name.toLowerCase().includes(searchTerm)
//             );
//             filteredDepartments.forEach(dept => {
//                 const card = document.createElement('div');
//                 card.className = 'dept-card';
//                 card.innerHTML = `
//                     <p class="title">Tên Phòng Ban: ${dept.name}</p>
//                     <p>Mô Tả: ${dept.description}</p>
//                     <p>Tên Bộ Phận: ${dept.division}</p>
//                 `;
//                 departmentList.appendChild(card);
//             });
//         }

//         // Tải dữ liệu khi trang được tải
//         window.onload = function() {
//             loadDocuments();
//             loadUserTable();
//             loadRecentUsers();
//             loadDepartments();
//             loadDepartmentInfo();
//             loadLogs();
//             loadRecentLogs();
//             filterHistory();
//             document.getElementById('search-document').addEventListener('input', filterDocuments);
//             // document.getElementById('search-user').addEventListener('input', filterUsers);
//             document.getElementById('search-department').addEventListener('input', filterDepartments);
//             document.getElementById('search-log').addEventListener('input', filterHistory);
//             document.getElementById('search-date').addEventListener('input', filterDocuments);
//             document.getElementById('history-date-filter').addEventListener('input', filterHistory);
//         };
   

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
// console.log("danh sach",users);
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

function deleteUser(index) {
    if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
        users.splice(index, 1);
        loadUserTable();
        loadRecentUsers();
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
    const searchTerm = document.getElementById('search-user').value.toLowerCase();
    const tbody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    const rows = tbody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const fullName = rows[i].cells[0].textContent.toLowerCase();
        const username = rows[i].cells[1].textContent.toLowerCase();
        const email = rows[i].cells[2].textContent.toLowerCase();
        if (searchTerm === '' || fullName.includes(searchTerm) || username.includes(searchTerm) || email.includes(searchTerm)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
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
            <div class="actions">
                <button onclick="viewDocument('${doc.name}')">Xem</button>
            </div>
        `;
        documentList.appendChild(card);
    });
});
}

function loadRecentDocuments() {

    const documentList = document.getElementById('recent-documents');
    documentList.innerHTML = '';

    documents.slice(0, 3).forEach(doc => {
        const card = document.createElement('div');
        card.className = 'doc-card';
        card.innerHTML = `
            <p class="title">Tên Tài Liệu: ${doc.name}</p>
            <p>Ngày Gửi: ${doc.date}</p>
            <p>Trạng Thái: ${doc.status}</p>
        `;
        documentList.appendChild(card);
    });
}

function filterDocuments() {
    const filterDate = document.getElementById('search-date').value;
    const searchTerm = document.getElementById('search-document').value.toLowerCase();
    // const documents = [
    //     { name: "document.pdf", date: "15/10/2025", status: "Hoàn thành" },
    //     { name: "report.docx", date: "14/10/2025", status: "Đang xử lý" },
    //     { name: "presentation.pptx", date: "13/10/2025", status: "Hoàn thành" }
    // ];

    const documentList = document.getElementById('document-list');
    documentList.innerHTML = '';

    const filteredDocs = documents.filter(doc => 
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
            <div class="actions">
                <button onclick="viewDocument('${doc.name}')">Xem</button>
            </div>
        `;
        documentList.appendChild(card);
    });
}

function viewDocument(docName) {
    alert(`Đang xem tài liệu: ${docName}`);
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
    // const documents = [
    //     { name: "document.pdf", date: "15/10/2025", status: "Hoàn thành" },
    //     { name: "report.docx", date: "14/10/2025", status: "Đang xử lý" },
    //     { name: "presentation.pptx", date: "13/10/2025", status: "Hoàn thành" }
    // ];

    const statusCount = {};
    documents.forEach(doc => {
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
    // const logs = [
    //     { actionUser: "Nguyen Van A", target: "User1", document: "document.pdf", status: "Hoàn thành", description: "Tài liệu đã được phê duyệt", createTime: "14/10/2025 09:00", completeTime: "15/10/2025 14:30", department: "Phòng CNTT" },
    //     { actionUser: "Tran Thi B", target: "User2", document: "report.docx", status: "Đang xử lý", description: "Chờ phê duyệt", createTime: "13/10/2025 10:00", completeTime: "14/10/2025 16:00", department: "Phòng Nhân Sự" }
    // ];

    const logContainer = document.getElementById('recent-logs');
    logContainer.innerHTML = '';

    logs.forEach(log => {
        const card = document.createElement('div');
        card.className = 'log-card';
        card.innerHTML = `
            <p class="title">Tên người đăng hành động: ${log.actionUser}</p>
            <p>Target: ${log.target}</p>
            <p>Tên tài liệu: ${log.document}</p>
            <p>Trạng thái: ${log.status}</p>
            <p>Description: ${log.description}</p>
            <p>Thời gian tạo file: ${log.createTime}</p>
            <p>Thời gian hoàn thành: ${log.completeTime}</p>
            <p>Tên phòng ban: ${log.department}</p>
        `;
        logContainer.appendChild(card);
    });
}

function filterHistory() {
    const filterDate = document.getElementById('history-date-filter').value;
    const searchTerm = document.getElementById('search-log').value.toLowerCase();
    // const logs = [
    //     { actionUser: "Nguyen Van A", target: "User1", document: "document.pdf", status: "Hoàn thành", description: "Tài liệu đã được phê duyệt", createTime: "14/10/2025 09:00", completeTime: "15/10/2025 14:30", department: "Phòng CNTT" },
    //     { actionUser: "Tran Thi B", target: "User2", document: "report.docx", status: "Đang xử lý", description: "Chờ phê duyệt", createTime: "13/10/2025 10:00", completeTime: "14/10/2025 16:00", department: "Phòng Nhân Sự" },
    //     { actionUser: "Le Van C", target: "User3", document: "presentation.pptx", status: "Hoàn thành", description: "Tài liệu đã hoàn tất", createTime: "12/10/2025 08:30", completeTime: "13/10/2025 15:00", department: "Phòng CNTT" }
    // ];

    const logContainer = document.getElementById('log-container');
    logContainer.innerHTML = '';

    const filteredLogs = logs.filter(log => 
        (!filterDate || log.completeTime.split(' ')[0] === filterDate) && 
        (!searchTerm || log.username.toLowerCase().includes(searchTerm) || log.documentName.toLowerCase().includes(searchTerm) || log.departmentName.toLowerCase().includes(searchTerm))
    );
    filteredLogs.forEach(log => {
        const card = document.createElement('div');
        card.className = 'log-card';
        card.innerHTML = `
            <p class="title">Tên người đăng hành động: ${log.username}</p>
            <p>Target: ${log.target}</p>
            <p>Tên tài liệu: ${log.documentName}</p>
            <p>Trạng thái: ${log.status}</p>
            <p>Description: ${log.description}</p>
            <p>Thời gian tạo file: ${log.createTime}</p>
            <p>Thời gian hoàn thành: ${log.completeTime}</p>
            <p>Tên phòng ban: ${log.departmentName}</p>
        `;
        logContainer.appendChild(card);
    });
}

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
function loadDepartments() {
    fetch(addreddApiGetAll)
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
window.onload = loadDepartments;


function loadDepartmentInfo() {
    // const departments = [
    //     { name: "Phòng Nhân Sự", description: "Quản lý nhân sự công ty", division: "Bộ phận Hành chính" },
    //     { name: "Phòng CNTT", description: "Hỗ trợ công nghệ thông tin", division: "Bộ phận Công nghệ" }
    // ];
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

// function createDepartment() {
//     const name = document.getElementById('dept-name').value;
//     const description = document.getElementById('dept-description').value;
//     const division = document.getElementById('dept-division').value;
//     if (name && description && division) {
//         alert(`Đã tạo phòng ban: ${name} - ${description} - ${division}`);
//         document.getElementById('dept-name').value = '';
//         document.getElementById('dept-description').value = '';
//         document.getElementById('dept-division').value = '';
//         loadDepartments();
//         loadDepartmentInfo();
//     }
// }

// function toggleAssignForm() {
//     const assignForm = document.getElementById('assign-form');
//     assignForm.classList.toggle('active');
// }

function assignUserToDepartment() {
    const assignForm = document.getElementById('assign-form');
    assignForm.classList.toggle('active');
    fetch(addreddApiGetAll)
    .then(response => {
        if(!response.ok) throw new Error("Error");
        return response.json();
    })
    .then(data => {
        const departSelect = document.getElementById("assign-dept");
        data.forEach(depart => {
            const option = document.createElement("option");
            option.textContent = depart.departmentName;
            departSelect.appendChild(option);
        });
        console.log(data);
    })
    .catch(error => 
        console.error(error));
    
    
}
    
    
    // const dept = document.getElementById('assign-dept').value;
    // const user = document.getElementById('assign-user').value;
    // if (dept && user) {
    //     alert(`Đã gán ${user} vào ${dept}`);
    //     document.getElementById('assign-dept').value = '';
    //     document.getElementById('assign-user').value = '';
    //     toggleAssignForm();
    // }


function filterDepartments() {
    const searchTerm = document.getElementById('search-department').value.toLowerCase();
    const departmentList = document.getElementById('department-list');
    departmentList.innerHTML = '';
    const filteredDepartments = departments.filter(dept => 
        !searchTerm || dept.name.toLowerCase().includes(searchTerm)
    );
    filteredDepartments.forEach(dept => {
        const card = document.createElement('div');
        card.className = 'dept-card';
        card.innerHTML = `
            <p class="title">Tên Phòng Ban: ${dept.departmentName}</p>
            <p>Mô Tả: ${dept.description}</p>
            <p>Tên Bộ Phận: ${dept.division}</p>
        `;
        departmentList.appendChild(card);
    });
}

// Tải dữ liệu khi trang được tải
window.onload = function() {
    loadDocuments();
    loadUserTable();
    loadRecentUsers();
    loadDepartments();
    loadDepartmentInfo();
    loadLogs();
    loadRecentLogs();
    filterHistory();
    document.getElementById('search-document').addEventListener('input', filterDocuments);
    // document.getElementById('search-user').addEventListener('input', filterUsers);
    document.getElementById('search-department').addEventListener('input', filterDepartments);
    document.getElementById('search-log').addEventListener('input', filterHistory);
    document.getElementById('search-date').addEventListener('input', filterDocuments);
    document.getElementById('history-date-filter').addEventListener('input', filterHistory);
};
