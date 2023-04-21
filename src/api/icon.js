export const icon_array = [
    {
        icon:"mdi-account",
        patch:"/quan-li-can-bo"
    },
    {
        icon:"mdi-key",
        patch:"/quan-li-nhom-quyen"
    },
    {
        icon:"mdi-account-school",
        patch:"/quan-li-sinh-vien"
    },
    {
        icon:"mdi-menu-open",
        patch:"/quan-li-menu"
    },
    {
        icon:"mdi-newspaper-variant-outline",
        patch:"/quan-li-chuyen-muc-tin-tuc"
    },
    {
        icon:"mdi-newspaper-variant-multiple",
        patch:"/quan-li-bai-viet-tin-tuc"
    },
    {
        icon:"mdi-comment-multiple",
        patch:"/quan-li-gop-y"
    },
    {
        icon:"mdi-map-marker-distance",
        patch:"/quan-li-khu-vuc-ban-do"
    },
    {
        icon:"mdi-map",
        patch:"/quan-li-loai-ban-do"
    },
    {
        icon:"mdi-map-marker",
        patch:"/quan-li-ban-do"
    },
    {
        icon:"mdi-book-open-variant",
        patch:"/chuyen-muc-cam-nang-hoa-lac"
    },
    {
        icon:"mdi-bell",
        patch:"/quan-ly-thong-bao"
    },
    {
        icon:"mdi-home",
        patch:"/quan-ly-danh-sach-nha-tro"
    },
    {
        icon:"mdi-home-alert",
        patch:"/quan-ly-thong-tin-nha-tro"
    },
    {
        icon:"mdi-book-open",
        patch:"/quan-ly-thu-tuc"
    },
    {
        icon:"mdi-book-cog-outline",
        patch:"/cam-nang-hoa-lac"
    },
    

]

export const geticon = (patchs) =>{

    

    const ui = icon_array.find( e => e.patch == patchs);
    // console.log('ui: ',ui)
    if(ui) return ui.icon
      return ''


}