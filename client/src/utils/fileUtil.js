const fileIcons = [
    {
        type: ["doc", "docx"],
        icon: "https://chat.zalo.me/assets/icon-word.d7db8ecee5824ba530a5b74c5dd69110.svg"
    },

    {
        type: ["pdf"],
        icon: "https://chat.zalo.me/assets/icon-pdf.53e522c77f7bb0de2eb682fe4a39acc3.svg"
    },
    {
        type: ["xls", "xlsx"],
        icon: "https://chat.zalo.me/assets/icon-excel.fe93010062660a8332b5f5c7bb2a43b1.svg",
    },
    {
        type: "txt",
        icon: ""
    },
    , {
        type: ["jpg", "jpeg", "png", "gif", "svg", "bmp"],
        icon: "https://chat.zalo.me/assets/icon-photo.a5e578fd357185b3e24c5b7637f48f97.svg"
    }
]
const fileLink = (filename) => {
    return `${"http://localhost:8080"}/files/${filename}`
}

const extractFileExtension = (filename) => {
    // Tìm vị trí của dấu chấm cuối cùng
    var dotIndex = filename.lastIndexOf('.');

    // Nếu không tìm thấy dấu chấm, hoặc dấu chấm nằm ở vị trí cuối cùng
    if (dotIndex === -1 || dotIndex === filename.length - 1) {
        return "Không có đuôi file";
    }

    // Trả về phần đuôi của tên file
    return filename.substring(dotIndex + 1).toLowerCase();
}
function extractFileName(inputString) {
    // Tách chuỗi theo dấu '/'
    const parts = inputString.split('/');
    // Lấy phần đầu tiên của mảng kết quả
    const fileNamePart = parts[0];
    // Trả về phần tên tập tin
    return fileNamePart;
}

// Hàm để tách lấy phần kích thước
function extractFileSize(inputString) {
    // Tách chuỗi theo dấu '/'
    const parts = inputString.split('/');
    // Lấy phần thứ hai của mảng kết quả
    const fileSizePart = parts[1];
    // Trả về phần kích thước
    return fileSizePart;
}

function extraTimeStamp(chuoi) {
    const index = chuoi.indexOf('itpm');
    if (index !== -1) {
        return chuoi.substring(index);
    }
    return chuoi;
}




export { fileIcons, fileLink, extraTimeStamp, extractFileName, extractFileSize, extractFileExtension }