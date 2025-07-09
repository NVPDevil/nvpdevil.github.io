// Tạo hiệu ứng tuyết rơi
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = Math.random() * 100 + 'vw'; // Vị trí ngẫu nhiên ngang
    snowflake.style.top = '-20px'; // Bắt đầu từ đỉnh
    snowflake.style.animationDuration = Math.random() * 10 + 5 + 's'; // Giảm xuống 5-15s để tăng tốc độ
    snowflake.style.animationDelay = Math.random() * 2 + 's'; // Giảm delay để tránh dồn
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

setInterval(createSnowflake, 200); // Tăng tần suất để phân bố tuyết đều hơn

// Xử lý click và tooltip cho social icons
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault(); // Ngăn hành vi mặc định của thẻ <a>
        const link = icon.getAttribute('data-link');
        const tooltip = icon.getAttribute('data-tooltip');
        const tooltipElement = icon.querySelector('[data-tooltip]:after');

        if (link) {
            window.open(link, '_blank');
        } else if (tooltip) {
            navigator.clipboard.writeText(tooltip).then(() => {
                // Thay thế data-tooltip bằng "Copied!" khi copy
                icon.setAttribute('data-tooltip', 'Copied!');
                const copyMsg = document.createElement('div');
                copyMsg.textContent = 'Copied!';
                copyMsg.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0, 0, 0, 0.7); color: #fff; padding: 8px 16px; border-radius: 5px; z-index: 1000; font-size: 1rem;';
                document.body.appendChild(copyMsg);
                setTimeout(() => copyMsg.remove(), 1500); // Tự động biến mất sau 1.5s
            });
        }

        // Khôi phục data-tooltip ban đầu khi di chuột ra
        icon.addEventListener('mouseleave', () => {
            icon.setAttribute('data-tooltip', tooltip); // Khôi phục giá trị ban đầu
        }, { once: true }); // Chỉ chạy một lần khi rời chuột
    });
});

// Xử lý lớp phủ và âm thanh
const overlay = document.getElementById('audio-overlay');
const container = document.querySelector('.container');
const audio = document.getElementById('background-audio');

overlay.addEventListener('click', () => {
    overlay.style.opacity = '0'; // Fade out lớp phủ
    setTimeout(() => {
        overlay.style.display = 'none'; // Ẩn hoàn toàn sau khi fade
    }, 1000); // Tăng thời gian fade-out lên 1s cho mượt mà
    container.classList.add('active'); // Thêm class active để fade-in nội dung
    audio.play(); // Phát âm thanh chỉ khi nhấp
    audio.loop = true; // Đảm bảo audio loop
});

// Loại bỏ auto-play khi tải trang và hiển thị lớp phủ
window.addEventListener('load', () => {
    overlay.style.display = 'flex'; // Hiển thị lớp phủ ngay khi tải trang
    container.classList.remove('active'); // Đảm bảo nội dung mờ khi tải
});