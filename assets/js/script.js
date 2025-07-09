// Tạo hiệu ứng tuyết rơi
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 15 + 10 + 's'; // 10-25s
    snowflake.style.animationDelay = Math.random() * 3 + 's';
    document.body.appendChild(snowflake);

    // Xóa tuyết rơi khi vượt quá chiều cao trang
    const checkHeight = () => {
        if (snowflake.getBoundingClientRect().top > window.innerHeight) {
            snowflake.remove();
        }
    };
    const interval = setInterval(checkHeight, 100);
    snowflake.addEventListener('animationend', () => {
        clearInterval(interval);
        snowflake.remove();
    });
}

setInterval(createSnowflake, 400);

// Xử lý click và tooltip cho social icons
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('click', (e) => {
        const link = icon.getAttribute('data-link');
        const tooltip = icon.getAttribute('data-tooltip');
        if (link) {
            window.open(link, '_blank');
            e.preventDefault();
        } else if (tooltip) {
            navigator.clipboard.writeText(tooltip).then(() => {
                const copyMsg = document.createElement('div');
                copyMsg.textContent = 'Copied!';
                copyMsg.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0, 0, 0, 0.7); color: #fff; padding: 8px 16px; border-radius: 5px; z-index: 1000; font-size: 1rem;';
                document.body.appendChild(copyMsg);
                setTimeout(() => copyMsg.remove(), 1500); // Tự động biến mất sau 1.5s
            });
            e.preventDefault();
        }
    });
});

// Xử lý lớp phủ và âm thanh
const overlay = document.getElementById('audio-overlay');
const audio = document.getElementById('background-audio');

overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    audio.play().then(() => {
        console.log("Audio started successfully.");
    }).catch(error => {
        console.log("Error playing audio: ", error);
    });
});

// Thử auto-play khi tải trang (dự phòng)
window.addEventListener('load', () => {
    audio.play().catch(error => {
        console.log("Auto-play blocked by browser: ", error);
        overlay.style.display = 'flex'; // Hiển thị lớp phủ nếu auto-play bị chặn
    });
});