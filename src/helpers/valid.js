export default (i, n, shorts, typesREGX) => {
    if (!typesREGX.test(i)) {
        shorts[n].invalid = true
        return true
    }
    return false
}
