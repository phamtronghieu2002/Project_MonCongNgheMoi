
function formatDateString(dateString) {
    var inputDate = new Date(dateString);
    var today = new Date();

    if (
        inputDate.getDate() === today.getDate() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getFullYear() === today.getFullYear()
    ) {
        return "hôm nay";
    } else {
        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return inputDate.toLocaleDateString('en-US', options);
    }
}
function chuyenDoiThoiGian(timeString) {
    // Tạo một đối tượng Date từ chuỗi thời gian đầu vào
    const date = new Date(timeString);

    // Lấy giờ và phút từ đối tượng Date
    const gio = date.getHours();
    const phut = date.getMinutes();

    // Tạo chuỗi định dạng "9h:11"
    const chuoiThoiGian = gio.toString().padStart(2, '0') + 'h:' + phut.toString().padStart(2, '0');

    return chuoiThoiGian;
}


function formatTimeDifference(timeDifference) {
    let seconds = Math.floor(timeDifference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    let lang = localStorage.getItem('language')
    const day = lang === 'en' ? 'day' : 'ngày'
    const hour = lang === 'en' ? 'hour' : 'giờ'
    const minute = lang === 'en' ? 'minute' : 'phút'
    const second = lang === 'en' ? 'second' : 'giây'
    if (days > 0) {
        return `${days} ${day}`;
    } else if (hours > 0) {
        return `${hours} ${hour}`;
    } else if (minutes > 0) {
        return `${minutes} ${minute}`;
    } else {
        return `${seconds} ${second}`;
    }


}


const timeDuaration = (time) => {
    let currentTime = new Date(time);
    let now = new Date();

    let timeDifference = now - currentTime;

    return formatTimeDifference(timeDifference);
}





export { formatDateString, chuyenDoiThoiGian, timeDuaration }