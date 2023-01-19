export default function PhotoList({ $target, initialState, onScrollEnded }) {
    let isInitialized = false;
    const $photoList = document.createElement('div')
    $target.appendChild($photoList)
    this.state = initialState
    this.setState = nextState => {
        this.state = nextState
        this.render();
    }
    this.render = () => {
        if (!isInitialized) {
            $photoList.innerHTML = `
            <ul class="PhotoList_photos"></ul>
            `
            isInitialized = true;
        }
        const { photos } = this.state;
        const $photos = $photoList.querySelector('.PhotoList_photos')
        photos.forEach(photo => {
            // photo의 id 기준으로 렌더링이 되어있는지 체크
            if (!$photos.querySelector(`li[data-id="${photo.id}"]`)) {
                // 없으면 li 생성하고 $photos에 appendChild
                const $li = document.createElement('li')
                $li.setAttribute('data-id', photo.id)
                $li.style = 'list-style: none;'
                $li.innerHTML = `<img width="100%" src="${photo.imagePath}"/>`

                $photos.appendChild($li)
            }
        })
    }

    window.addEventListener('scroll', () => {
        const {isLoading, totalCount, photos} = this.state;
        const isScrollEnded = (window.innerHeight + window.scrollY) + 100 >= document.body.offsetHeight;
        if(isScrollEnded && !isLoading && photos.length < totalCount) {
            onScrollEnded()
        }
    })
}