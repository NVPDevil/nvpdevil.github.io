// Hiệu ứng tuyết rơi
const maxSnowflakes = 50;
let snowflakeCount = 0;

function createSnowflake() {
    if (snowflakeCount >= maxSnowflakes) return;
    snowflakeCount++;
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.top = '-20px';
    snowflake.style.animationDuration = Math.random() * 10 + 5 + 's';
    snowflake.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(snowflake);

    // Xóa bông tuyết khi ra khỏi màn hình
    const checkHeight = () => {
        if (snowflake.getBoundingClientRect().top > window.innerHeight) {
            snowflake.remove();
            snowflakeCount--;
        }
    };
    const interval = setInterval(checkHeight, 100);
    snowflake.addEventListener('animationend', () => {
        clearInterval(interval);
        snowflake.remove();
        snowflakeCount--;
    });
}

setInterval(createSnowflake, 300); // Tạo bông tuyết mỗi 300ms

// Xử lý social icons
document.querySelectorAll('.social-icons a').forEach(icon => {
    const originalTooltip = icon.getAttribute('data-tooltip');

    // Xử lý click
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const link = icon.getAttribute('data-link');
        const tooltip = icon.getAttribute('data-tooltip');

        if (link) {
            window.open(link, '_blank');
        } else if (tooltip) {
            navigator.clipboard.writeText(tooltip.replace(/^(ID|Discord): /, '')).then(() => {
                icon.setAttribute('data-tooltip', 'Đã sao chép!');
                setTimeout(() => {
                    icon.setAttribute('data-tooltip', originalTooltip);
                }, 1500); // Khôi phục tooltip sau 1.5s
            });
        }
    });

    // Khôi phục tooltip khi rời chuột
    icon.addEventListener('mouseleave', () => {
        icon.setAttribute('data-tooltip', originalTooltip);
    }, { once: true });

    // Hỗ trợ long-press trên mobile
    let pressTimer;
    icon.addEventListener('touchstart', () => {
        pressTimer = setTimeout(() => {
            icon.classList.add('active');
            setTimeout(() => icon.classList.remove('active'), 1000);
        }, 500);
    });
    icon.addEventListener('touchend', () => clearTimeout(pressTimer));
    icon.addEventListener('touchcancel', () => clearTimeout(pressTimer));
});

// Xử lý lớp phủ và âm thanh
const overlay = document.getElementById('audio-overlay');
const container = document.querySelector('.container');
const audio = document.getElementById('background-audio');
const audioControl = document.getElementById('audio-control');

overlay.addEventListener('click', () => {
    overlay.classList.add('fade-out');
    setTimeout(() => overlay.style.display = 'none', 1500); // Đợi fade-out hoàn tất
    container.classList.add('active');
    audio.play().catch(() => {
        const errorMsg = document.createElement('div');
        errorMsg.textContent = 'Không thể phát âm thanh. Vui lòng kiểm tra cài đặt trình duyệt.';
        errorMsg.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255, 0, 0, 0.7); color: #fff; padding: 8px 16px; border-radius: 5px; z-index: 1000; font-size: 1rem;';
        document.body.appendChild(errorMsg);
        setTimeout(() => errorMsg.remove(), 3000);
    });
});

// Nút bật/tắt âm thanh
audioControl.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        audioControl.textContent = '🔊';
    } else {
        audio.pause();
        audioControl.textContent = '🔇';
    }
});

// Hiển thị lớp phủ khi tải trang
window.addEventListener('load', () => {
    overlay.style.display = 'flex';
    container.classList.remove('active');
});