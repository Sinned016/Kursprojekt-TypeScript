
export default function fetchOptions<T>(method: string, body: T) {
    return {
        method: method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    }
}