
export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};
export function isBase64Image(str) {
    if (str.startsWith('data:image')) {
        if (str.includes('base64,')) {
            return true;
        }
    }
    return false;
}



