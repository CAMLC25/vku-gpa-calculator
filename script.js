// Danh sách câu châm ngôn về học tập
const learningQuotes = [
    "Học tập là một kho báu sẽ theo chủ nhân ở khắp nơi",
     "Không có con đường nào dẫn đến thành công mà không qua cổng học tập",
    "Tri thức là sức mạnh, học hỏi là chìa khóa mở cánh cửa tương lai",
    "Học mà không suy nghĩ thì vô ích, suy nghĩ mà không học thì nguy hiểm",
    "Đầu tư vào tri thức luôn mang lại lợi nhuận cao nhất",
    "Việc học không bao giờ làm cạn kiệt tâm trí",
    "Người học suốt đời không bao giờ ngừng phát triển",
    "Giáo dục là vũ khí mạnh nhất để thay đổi thế giới",
    "Học tập không phải là chuẩn bị cho cuộc sống, học tập chính là cuộc sống",
    "Mỗi ngày học một điều mới là mỗi ngày bạn tiến thêm một bước",
    "Thất bại là cơ hội để bắt đầu lại một cách thông minh hơn",
    "Kiến thức có được từ học tập là kho báu vô giá",
    "Học để biết, biết để làm, làm để trở thành",
    "Sự kiên trì trong học tập sẽ mang lại thành công vượt mong đợi",
    "Học tập là hành trình dài nhưng mỗi bước đều có ý nghĩa",
    "Đọc sách là đối thoại với những tâm hồn cao quý nhất",
    "Học không chỉ để thi mà để hiểu cuộc sống",
    "Sự tò mò là động lực mạnh mẽ nhất của việc học",
    "Những điều khó khăn hôm nay sẽ trở thành sức mạnh ngày mai",
    "Học tập là cách tốt nhất để đầu tư cho bản thân"
];

let currentQuoteIndex = 0;
let rowCount = 1;

// Hàm thay đổi câu châm ngôn
function changeQuote() {
    const quoteElement = document.getElementById('learningQuote');
        
    // Thêm hiệu ứng fade
    quoteElement.style.opacity = '0';
    quoteElement.style.transform = 'translateY(10px)';
        
    setTimeout(() => {
        currentQuoteIndex = Math.floor(Math.random() * learningQuotes.length);
        quoteElement.textContent = `"${learningQuotes[currentQuoteIndex]}"`;
        quoteElement.style.opacity = '1';
        quoteElement.style.transform = 'translateY(0)';
    }, 200);
}

    // Tự động thay đổi câu châm ngôn mỗi 10 giây
    setInterval(changeQuote, 10000);

    // Thay đổi câu châm ngôn khi tải trang
    window.addEventListener('load', () => {
    changeQuote();
});

function addRow() {
  const table = document.getElementById('gradeTable').getElementsByTagName('tbody')[0];
  const rowCount = table.rows.length;
  const row = table.insertRow();
  
  row.innerHTML = `
    <td>${rowCount + 1}</td>
    <td><input type="text" placeholder="Tên lớp học phần" /></td>
    <td><input type="number" min="0" value="" /></td>
    <td><input type="number" min="0" max="10" step="0.1" value="" /></td>
    <td><input type="number" min="0" max="10" step="0.1" value="" /></td>
    <td><input type="number" min="0" max="10" step="0.1" value="" /></td>
    <td><input type="number" min="0" max="10" step="0.1" value="" /></td>
    <td><input type="text" value="1-2-2-5" /></td>
    <td class="score-cell t10">–</td>
    <td class="score-cell letter">–</td>
    <td><button class="delete-btn" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button></td>
  `;
  updateRowNumbers();
  attachInputListeners(row);
}

function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
  updateRowNumbers();
  calculateAll();
}

function updateRowNumbers() {
  const rows = document.getElementById('gradeTable').getElementsByTagName('tbody')[0].rows;
  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[0].textContent = i + 1;
  }
}

function calculateT10(attendance, assignment, midterm, final, weights) {
  const weightArray = weights.split('-').map(Number);
  if (weightArray.length !== 4) return null;
  const sumWeights = weightArray.reduce((a, b) => a + b, 0);
  if (sumWeights === 0) return null;
  
  const result = (attendance * weightArray[0] +
                 assignment * weightArray[1] +
                 midterm * weightArray[2] +
                 final * weightArray[3]) / sumWeights;
  return Math.round(result * 10) / 10; // Làm tròn chính xác
}

function getLetterGrade(t10) {
  const numT10 = parseFloat(t10);
  if (numT10 >= 8.5) return 'A';
  if (numT10 >= 7.0) return 'B';
  if (numT10 >= 5.5) return 'C';
  if (numT10 >= 4.0) return 'D';
  return 'F';
}

function getGradePoint(letter) {
  const gradePoints = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
  return gradePoints[letter] || 0;
}

function getClassification(gpa) {
  if (gpa >= 3.6 && gpa <= 4.0) return 'Xuất sắc';
  if (gpa >= 3.2 && gpa < 3.6) return 'Giỏi';
  if (gpa >= 2.5 && gpa < 3.2) return 'Khá';
  if (gpa >= 2.0 && gpa < 2.5) return 'Trung bình';
  if (gpa >= 1.0 && gpa < 2.0) return 'Yếu';
  return 'Kém';
}

function calculateRow(row) {
  const inputs = row.getElementsByTagName('input');
  const credits = parseFloat(inputs[1].value) || 0;
  const attendance = parseFloat(inputs[2].value) || 0;
  const assignment = parseFloat(inputs[3].value) || 0;
  const midterm = parseFloat(inputs[4].value) || 0;
  const final = parseFloat(inputs[5].value) || 0;
  const weights = inputs[6].value.trim();
  
  const t10 = calculateT10(attendance, assignment, midterm, final, weights);
  if (t10 !== null) {
    const displayT10 = t10.toFixed(1);
    const letter = getLetterGrade(displayT10);
    row.cells[8].textContent = displayT10;
    row.cells[9].textContent = letter;
  } else {
    row.cells[8].textContent = '–';
    row.cells[9].textContent = '–';
  }
}

function calculateAll() {
  const rows = document.getElementById('gradeTable').getElementsByTagName('tbody')[0].rows;
  let totalCredits = 0;
  let totalT10Points = 0; // Tổng điểm T10 tích lũy
  let totalGradePoints = 0; // Tổng điểm theo hệ số 4.0
  
  for (let row of rows) {
    calculateRow(row);
    const inputs = row.getElementsByTagName('input');
    const credits = parseFloat(inputs[1].value) || 0;
    const t10 = parseFloat(row.cells[8].textContent) || 0;
    const letter = row.cells[9].textContent;
    const gradePoint = getGradePoint(letter);
    
    totalCredits += credits;
    totalT10Points += t10 * credits; // Tổng điểm T10 trước khi chia
    totalGradePoints += gradePoint * credits; // Tổng điểm theo hệ số 4.0
  }
  
  // Tính trung bình
  const avgT10 = totalCredits > 0 ? (totalT10Points / totalCredits).toFixed(2) : 0.0;
  const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0.0;
  const classification = getClassification(parseFloat(gpa));
  
  document.getElementById('totalCredits').textContent = totalCredits;
  document.getElementById('totalT10').textContent = avgT10; // Hiển thị trung bình điểm T10
  document.getElementById('gpa').textContent = gpa; // Hiển thị GPA theo hệ số 4.0
  document.getElementById('classification').textContent = classification; // Hiển thị xếp loại
}

function attachInputListeners(row) {
  const inputs = row.getElementsByTagName('input');
  for (let input of inputs) {
    input.addEventListener('input', () => calculateAll());
  }
}

// Thêm listener cho các hàng hiện tại khi trang tải
document.addEventListener('DOMContentLoaded', () => {
  const rows = document.getElementById('gradeTable').getElementsByTagName('tbody')[0].rows;
  for (let row of rows) {
    attachInputListeners(row);
  }
  calculateAll();
});

// Khởi tạo event listeners
document.addEventListener('DOMContentLoaded', function() {
    const initialRow = document.querySelector('#gradeTable tbody tr');
    addInputEventListeners(initialRow);
        
    // Hiển thị câu châm ngôn đầu tiên
    setTimeout(changeQuote, 1000);
});

// Hiển thị modal hướng dẫn
function showGuide() {
  document.getElementById('guideModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Hiển thị modal giới thiệu
function showAbout() {
  document.getElementById('aboutModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Đóng modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Đóng modal khi click bên ngoài
window.onclick = function(event) {
  const guideModal = document.getElementById('guideModal');
  const aboutModal = document.getElementById('aboutModal');
  
  if (event.target === guideModal) {
    closeModal('guideModal');
  }
  if (event.target === aboutModal) {
    closeModal('aboutModal');
  }
}

// Xử lý phím ESC để đóng modal
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal('guideModal');
    closeModal('aboutModal');
  }
});