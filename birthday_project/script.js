document.addEventListener('DOMContentLoaded', () => {
    // --- KHAI BÁO BIẾN ---
    const passwordInput = document.getElementById('password-input');
    const unlockButton = document.getElementById('unlock-button');
    const lockScreen = document.getElementById('lock-screen');
    const desktopScreen = document.getElementById('desktop-screen');
    const errorMessage = document.getElementById('error-message');
    
    const letterIcon = document.getElementById('letter-icon');
    const letterViewer = document.getElementById('letter-viewer');
    const filmReelIcon = document.getElementById('film-reel-icon');
    const filmViewer = document.getElementById('film-viewer');
    
    // BIẾN NHẠC
    const birthdayMusic = document.getElementById('birthday-music');
    
    // --- HÀM XỬ LÝ DẤU (Giữ nguyên) ---
    function removeVietnameseTones(str) {
        str = str.toLowerCase().trim().replace(/\s/g, ''); 
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/[^a-z0-9]/g, ""); 
        return str;
    }

    // Danh sách các thông báo lỗi và mật khẩu (Giữ nguyên)
    const incorrectMessages = [
        "mk đéo đúng", "tệ vãi…", "???", "câu trả lời của bạn chưa đúng ý tôi", "vãi l tệ",
    ];
    const correctPasswords = ["YESIDO", "CO", "YE"]; 

    /**
     * Hàm xử lý mở khóa màn hình
     */
    function handleUnlock() {
        const rawInput = passwordInput.value;
        const processedInput = removeVietnameseTones(rawInput).toUpperCase(); 

        if (correctPasswords.includes(processedInput)) {
            // Mật khẩu đúng
            errorMessage.textContent = 'hay quá ta!?';
            errorMessage.style.color = '#3ac200ff'; 
            
            setTimeout(() => {
                lockScreen.classList.remove('active');
                desktopScreen.classList.add('active');
                errorMessage.textContent = ''; 
                errorMessage.style.color = '#ff3b30'; 
                
                // LOGIC PHÁT NHẠC
                if (birthdayMusic) {
                    birthdayMusic.play().catch(error => {
                        console.log("Không thể tự động phát nhạc:", error);
                    });
                }

            }, 1500);

        } else {
            // Mật khẩu sai (Giữ nguyên)
            const randomIndex = Math.floor(Math.random() * incorrectMessages.length);
            errorMessage.textContent = incorrectMessages[randomIndex];
            errorMessage.style.color = '#ff3b30'; 
            
            passwordInput.value = '';
            passwordInput.focus(); 
        }
    }
    
    // Gắn sự kiện cho nút Mở khóa và Enter
    unlockButton.addEventListener('click', handleUnlock);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUnlock();
        }
    });

    /**
     * Xử lý click vào ICON THƯ và DOCK
     */
    letterIcon.addEventListener('click', () => {
        letterViewer.classList.remove('hidden');
        filmViewer.classList.add('hidden'); 
    });
    
    filmReelIcon.addEventListener('click', () => {
        filmViewer.classList.remove('hidden');
        letterViewer.classList.add('hidden'); 
    });

    /**
     * Xử lý click vào màn hình nền để làm ẩn cửa sổ và dừng nhạc (nếu có)
     */
    desktopScreen.addEventListener('click', (e) => {
        if (e.target.id === 'desktop-screen' || e.target.classList.contains('desktop-bg')) {
            letterViewer.classList.add('hidden');
            filmViewer.classList.add('hidden');
        }
    });
    
    // Đảm bảo nhạc dừng nếu người dùng quay lại màn hình khóa
    lockScreen.addEventListener('click', () => {
        if (birthdayMusic && lockScreen.classList.contains('active')) {
             birthdayMusic.pause();
             birthdayMusic.currentTime = 0; 
        }
    });
});