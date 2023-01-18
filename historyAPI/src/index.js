function route() {
    const $container = document.querySelector('#container')
    const { pathname } = location;
    if (pathname === '/') {
        $container.innerHTML = '<h1>Home</h1>'
    } else if (pathname === '/product-list') {
        $container.innerHTML = `<h1>게시글 목록</h1>`
    } else if (pathname === '/article-list') {
        $container.innerHTML = `<h1>상품 목록</h1>`
    } else {
        $container.innerHTML = '<h1>Home</h1>'
    }
}
route()
window.addEventListener('click', e => {
    if (e.target.className === 'LinkItem') {
        e.preventDefault();
        const { href } = e.target;
        const path = href.replace(window.location.origin, '')
        history.pushState(null, null, path)
        route()
    }
})
// popstate : 뒤로 가기, 앞으로 가기 이벤트
window.addEventListener('popstate', () => route())