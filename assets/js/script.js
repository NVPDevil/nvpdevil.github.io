// Kiểm tra và chặn thiết bị di động
function blockMobileDevices() {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth <= 768;

    if (isMobile || isSmallScreen) {
        document.querySelector('.container').style.display = 'none';
        document.getElementById('background-container').style.display = 'none';
        document.querySelector('.right-controls').style.display = 'none';
        document.getElementById('bg-toggle').style.display = 'none';
        document.getElementById('snow-canvas').style.display = 'none';

        const blockMessage = document.createElement('div');
        blockMessage.className = 'block-message';
        blockMessage.innerHTML = `
            <div>
                <h2>Xin lỗi!</h2>
                <p>Website này chỉ hỗ trợ truy cập từ máy tính.<br>Vui lòng sử dụng máy tính để xem nội dung.</p>
            </div>
        `;
        document.body.appendChild(blockMessage);

        const audio = document.getElementById('background-audio');
        audio.pause();
    }
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('load', () => {
    blockMobileDevices();
    overlay.style.display = 'flex';
    container.classList.remove('active');
    overlay.focus();
});
window.addEventListener('resize', debounce(() => {
    resizeCanvas();
    blockMobileDevices();
}, 200));

// Cấu hình loại nền
let backgroundType = 'video';
const backgroundConfig = {
    image: {
        src: 'assets/images/peter.webp',
        alt: 'Hình nền tĩnh'
    },
    gif: {
        src: 'assets/images/background.gif',
        alt: 'Hình nền động'
    },
    video: {
        src: 'assets/videos/background.mp4',
        fallback: 'assets/images/4.mp4'
    }
};

// Thiết lập nền
function setupBackground() {
    const container = document.getElementById('background-container');
    const spinner = document.getElementById('loading-spinner');
    spinner.classList.add('active');
    container.classList.add('changing'); // Thêm class để fade
    const isSlowNetwork = navigator.connection && navigator.connection.effectiveType !== '4g';
    if (backgroundType === 'video' && !isSlowNetwork) {
        container.innerHTML = `
            <video autoplay muted loop playsinline>
                <source src="${backgroundConfig.video.src}" type="video/mp4">
                <img src="${backgroundConfig.video.fallback}" alt="Hình nền tĩnh" loading="lazy">
            </video>
        `;
    } else if (backgroundType === 'gif') {
        container.innerHTML = `
            <img src="${backgroundConfig.gif.src}" alt="${backgroundConfig.gif.alt}" loading="lazy">
        `;
    } else {
        container.innerHTML = `
            <img src="${backgroundConfig.image.src}" alt="${backgroundConfig.image.alt}" loading="lazy">
        `;
    }
    setTimeout(() => {
        spinner.classList.remove('active');
        container.classList.remove('changing'); // Xóa class sau khi chuyển cảnh
    }, 500);
}
setupBackground();

// Nút chuyển đổi nền
const bgTypes = ['image', 'gif', 'video'];
let currentBgIndex = bgTypes.indexOf(backgroundType);
document.getElementById('bg-toggle').addEventListener('click', () => {
    currentBgIndex = (currentBgIndex + 1) % bgTypes.length;
    backgroundType = bgTypes[currentBgIndex];
    setupBackground();
});

// Hiệu ứng tuyết rơi bằng canvas
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
let snowEnabled = true;
const snowflakes = [];
const snowflakeCount = Math.min(50, Math.floor(window.innerWidth / 20));

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', debounce(resizeCanvas, 200));
resizeCanvas();

function createSnowflake() {
    return {
        x: Math.random() * canvas.width,
        y: 0,
        radius: Math.random() * 4 + 2,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        wind: (Math.random() - 0.5) * 2,
        angle: Math.random() * Math.PI * 2
    };
}

function drawSnowflake(flake) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(flake.x, flake.y);
    ctx.rotate(flake.angle);
    ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
    const spikes = 6;
    const outerRadius = flake.radius;
    const innerRadius = flake.radius / 2;
    for (let i = 0; i < spikes; i++) {
        const angle = (Math.PI * 2 / spikes) * i;
        ctx.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
        ctx.lineTo(Math.cos(angle + Math.PI / spikes) * innerRadius, Math.sin(angle + Math.PI / spikes) * innerRadius);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!snowEnabled) return;

    snowflakes.forEach((flake, index) => {
        drawSnowflake(flake);

        flake.y += flake.speed;
        flake.x += flake.wind + Math.sin(flake.angle) * 0.5;
        flake.angle += 0.01;

        if (flake.y > canvas.height || flake.x < 0 || flake.x > canvas.width) {
            snowflakes.splice(index, 1);
            snowflakes.push(createSnowflake());
        }
    });

    requestAnimationFrame(drawSnowflakes);
}

function initSnowflakes() {
    for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push(createSnowflake());
    }
    drawSnowflakes();
}

initSnowflakes();

// Nút bật/tắt tuyết
document.getElementById('toggle-snow').addEventListener('click', () => {
    snowEnabled = !snowEnabled;
    const snowIcon = document.querySelector('#toggle-snow .snow-icon');
    snowIcon.src = snowEnabled ? 'assets/images/icon/snowflake.png' : 'assets/images/icon/cloud.png';
    snowIcon.alt = snowEnabled ? 'Biểu tượng bật hiệu ứng tuyết' : 'Biểu tượng tắt hiệu ứng tuyết';
    if (snowEnabled) {
        requestAnimationFrame(drawSnowflakes);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

// Hiệu ứng rung và âm thanh avatar
const clickSound = document.getElementById('click-sound');
document.querySelector('.avatar').addEventListener('click', () => {
    const avatar = document.querySelector('.avatar');
    avatar.style.animation = 'shake 0.5s';
    clickSound.volume = 0.3;
    clickSound.play().catch((err) => console.log('Lỗi phát âm thanh click:', err));
    setTimeout(() => {
        avatar.style.animation = 'rotate 12s linear infinite';
    }, 500);
});

// Xử lý social icons
document.querySelectorAll('.social-icons a, .social-icons button').forEach(icon => {
    const originalTooltip = icon.getAttribute('data-tooltip');
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
                }, 1500);
            });
        }
    });
    icon.addEventListener('mouseleave', () => {
        icon.setAttribute('data-tooltip', originalTooltip);
    });
});

// Xử lý lớp phủ và âm thanh
const overlay = document.getElementById('audio-overlay');
const container = document.querySelector('.container');
const audio = document.getElementById('background-audio');
const audioControl = document.getElementById('audio-control');
const audioIcon = audioControl.querySelector('.audio-icon');
const volumeControl = document.getElementById('volume-control');
const audioContainer = document.querySelector('.audio-control-container');

function showErrorMessage() {
    const errorMsg = document.createElement('div');
    errorMsg.innerHTML = 'Không thể phát âm thanh. <button class="retry-btn">Thử lại</button>';
    errorMsg.setAttribute('role', 'alert');
    errorMsg.className = 'error-message';
    document.body.appendChild(errorMsg);
    errorMsg.querySelector('.retry-btn').addEventListener('click', () => {
        playAudio();
        errorMsg.remove();
    });
}

function playAudio() {
    console.log('Đang cố gắng phát âm thanh...');
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Âm thanh phát thành công');
            audioIcon.src = 'assets/images/icon/speaker.png';
            audioIcon.alt = 'Bật âm thanh';
            audioControl.setAttribute('aria-pressed', 'true');
            volumeControl.value = audio.volume || 1;
        }).catch((err) => {
            console.log('Lỗi phát âm thanh:', err);
            showErrorMessage();
        });
    }
}

overlay.addEventListener('click', () => {
    overlay.classList.add('fade-out');
    setTimeout(() => {
        overlay.style.display = 'none';
        document.querySelector('.profile-card').focus();
    }, 1500);
    container.classList.add('active');
    playAudio();
});

// Nút bật/tắt âm thanh
audioControl.addEventListener('click', (e) => {
    e.preventDefault();
    if (audio.paused) {
        console.log('Bật âm thanh từ nút điều khiển');
        playAudio();
    } else {
        console.log('Tắt âm thanh từ nút điều khiển');
        audio.pause();
        audio.currentTime = 0;
        audioIcon.src = 'assets/images/icon/mute.png';
        audioIcon.alt = 'Tắt âm thanh';
        audioControl.setAttribute('aria-pressed', 'false');
        volumeControl.value = 0;
    }
});

// Thanh điều chỉnh âm lượng
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
    if (volumeControl.value > 0 && audio.paused) {
        console.log('Phát âm thanh khi tăng âm lượng');
        playAudio();
    } else if (volumeControl.value == 0 && !audio.paused) {
        console.log('Tắt âm thanh khi âm lượng về 0');
        audio.pause();
        audio.currentTime = 0;
        audioIcon.src = 'assets/images/icon/mute.png';
        audioIcon.alt = 'Tắt âm thanh';
        audioControl.setAttribute('aria-pressed', 'false');
    }
});

// Hiển thị thanh âm lượng trên thiết bị cảm ứng
audioControl.addEventListener('touchstart', () => {
    audioContainer.classList.add('active');
    setTimeout(() => audioContainer.classList.remove('active'), 3000);
});

// Nút chia sẻ
document.getElementById('share-button').addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'NVP Devil Profile',
            text: 'Khám phá hồ sơ cá nhân của NVP Devil!',
            url: window.location.href
        }).catch(() => console.log('Lỗi khi chia sẻ'));
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const shareButton = document.getElementById('share-button');
            shareButton.setAttribute('data-tooltip', 'Đã sao chép link!');
            setTimeout(() => {
                shareButton.removeAttribute('data-tooltip');
            }, 1500);
        });
    }
});

// Đồng hồ
function updateClock() {
    const now = new Date();
    const options = { timeZone: 'Asia/Ho_Chi_Minh' };
    const time = now.toLocaleTimeString('vi-VN', options);
    const date = now.toLocaleDateString('vi-VN', options);
    document.getElementById('clock').textContent = `${time}, ${date}`;
}

setInterval(updateClock, 1000);
updateClock();

// Thống kê lượt truy cập (sử dụng CountAPI)
function updateVisitorCount() {
    const namespace = '{your-namespace}';
    const key = '{your-key}';
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('visitor-counter').textContent = data.value || 0;
        })
        .catch((err) => {
            console.log('Lỗi khi gọi API CountAPI:', err);
            document.getElementById('visitor-counter').textContent = 'N/A';
        });
}

updateVisitorCount();

// Phím tắt
document.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && overlay.style.display !== 'none') {
        overlay.click();
    } else if (e.key === 'm' || e.key === 'M') {
        audioControl.click();
    } else if (e.key === 's' || e.key === 'S') {
        document.getElementById('toggle-snow').click();
    }
});