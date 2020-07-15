/**
 * 本地存储 工具函数封装
 */
// 暴露一个对象
export default {
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    set(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    }
}