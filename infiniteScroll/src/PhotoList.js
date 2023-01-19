export default function PhotoList({ $target, initialState, onScrollEnded }) {
    let isInitialized = false;
    const $photoList = document.createElement('div')
    $target.appendChild($photoList)
    this.state = initialState
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // 해당 엔트리가 화면에 보이는지 체크
            if (entry.isIntersecting && !this.state.isLoading) {
                observer.unobserve(entry.target);
                console.log(entry.target)
                if(this.state.totalCount > this.state.photos.length) {
                    onScrollEnded();
                }
            }
        })
    }, {
        // 0 : 감시하는 요소가 화면에 조금이라도 보이면 이벤트 발생
        // 1 : 감시하는 요소가 화면에 전부 보여야 이벤트 발생
        // 0.5 : 감시하는 요소가 화면에 절반이 보여야 이벤트 발생
        threshold: 0.5
    })
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
        if($photos === undefined)
            return
        photos.forEach(photo => {
            // photo의 id 기준으로 렌더링이 되어있는지 체크
            if (!$photos.querySelector(`li[data-id="${photo.id}"]`)) {
                // 없으면 li 생성하고 $photos에 appendChild
                const $li = document.createElement('li')
                $li.setAttribute('data-id', photo.id)
                $li.style = 'list-style: none; min-height: 100px'
                $li.innerHTML = `<img width="100%" src="${photo.imagePath}"/>`

                $photos.appendChild($li)
            }
        })

        const $lastLi = $photos.querySelector('li:last-child')
        if ($lastLi) {
            observer.observe($lastLi);
        }
    }


    // window.addEventListener('scroll', () => {
    //     const {isLoading, totalCount, photos} = this.state;
    //     const isScrollEnded = (window.innerHeight + window.scrollY) + 100 >= document.body.offsetHeight;
    //     if(isScrollEnded && !isLoading && photos.length < totalCount) {
    //         onScrollEnded()
    //     }
    // })
}