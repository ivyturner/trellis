export function isProd() {
    if (import.meta.env.PROD == true) return true
    return false
}