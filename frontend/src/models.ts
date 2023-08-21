export type Gif = {
    id: string
    name: string
    description: string
    price: string
    status: boolean
}

export type GifWithoutId = {
    name: string
    description: string
    price: string
    status: boolean
}
