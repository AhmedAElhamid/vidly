
export function search(data, path, searchQuery) {
    return data.filter(item => item[path].toLowerCase()
        .includes(searchQuery.toLowerCase()))
}