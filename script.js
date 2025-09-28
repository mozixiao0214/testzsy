// 1. 代码雨动画（完全保留原有逻辑，无任何修改）
function createMatrix() {
  const matrixBg = document.getElementById('matrix-bg');
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  const charSize = 16;
  const gap = 20;
  const rowHeight = 30;

  const rows = Math.ceil(window.innerHeight / rowHeight);
  matrixBg.innerHTML = '';

  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.className = 'matrix-row';
    matrixBg.appendChild(row);

    const cols = Math.ceil(window.innerWidth / (charSize + gap));
    for (let j = 0; j < cols; j++) {
      if (Math.random() > 0.5) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const delay = Math.random() * 10;
        const duration = 8 + Math.random() * 4;
        const charEl = document.createElement('span');
        charEl.className = 'matrix-char';
        charEl.style.animationDelay = `${delay}s`;
        charEl.style.animationDuration = `${duration}s`;
        charEl.textContent = char;
        row.appendChild(charEl);
      }
    }
  }
}

// 2. 参考你的代码：仅做数据读取加载（核心修改，无多余字段）
const cardContainer = document.getElementById('card-container');
// 你的JSON文件路径（本地用"./data.json"，线上替换为实际链接）
const jsonUrl = './data.json'; 

// 参考你的async/await逻辑读取JSON，无任何额外处理
async function loadJSON() {
  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error('网络错误：无法加载数据');
    return await response.json();
  } catch (error) {
    console.error('加载JSON失败:', error);
    cardContainer.innerHTML = '<p style="color:#fff; text-align:center;">加载数据失败</p>';
    throw error;
  }
}

// 3. 生成卡片：完全保留原有逻辑，字段与之前一致（仅用image和title）
function createCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  // 完全保留原有字段（image和title），无任何新增
  card.innerHTML = `
    <div class="img-wrapper">
      <img src="${item.image}" alt="${item.title}" />
    </div>
    <div class="title">${item.title}</div>
  `;
  return card;
}

// 4. 显示卡片：参考你的async逻辑，渲染逻辑完全不变
async function displayCards() {
  try {
    const data = await loadJSON();
    cardContainer.innerHTML = ''; // 清空容器
    data.forEach(item => {
      const card = createCard(item);
      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.error('显示卡片失败:', error);
  }
}

// 5. 搜索功能（完全保留原有逻辑，无任何修改）
function initSearch() {
  const input = document.getElementById('search-input');
  input.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const title = card.querySelector('.title').textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// 6. 页面初始化（仅替换数据加载函数为displayCards，其他不变）
window.addEventListener('DOMContentLoaded', function() {
  createMatrix();
  displayCards(); // 用参考的读取逻辑加载数据
  initSearch();
  window.addEventListener('resize', createMatrix);
});
