const textures = [
    { name: 'jelly',   price: 7, description: 'transparent, glossy, thick' , image: 'https://64.media.tumblr.com/96035671b753bcc1bd6a6737baf4d3b7/51b9a3064ab90b8b-27/s400x600/ec0784874397632c87b8283e8a2d19ef33ff3d19.gifv' },
    { name: 'glossy',  price: 7, description: 'opaque, glossy, thick' , image: 'https://64.media.tumblr.com/64e984c982c2a2704df54b5463795072/89a2fcb2d650f695-df/s400x600/3bd151441f0de6ce8a63016691f55344495722f3.gif' },
    { name: 'butter',  price: 7.5, description: 'smooth, soft, light' , image: 'https://64.media.tumblr.com/e9ea2b811f28b15a2d56030586b047e1/afb0cffdcce152a3-42/s400x600/6e206adb15386b31da229f67b74997d979f85df6.gifv' },
    { name: 'cloud',   price: 6.5, description: 'soft, airy' , image: 'https://64.media.tumblr.com/c8ec2e974401e46131f238518580438b/fb5b9278b539c393-d2/s400x600/973d87381d837aff217333daa241f5d5329d1fbb.gifv' },
    { name: 'floam',   price: 4, description: 'crunchy, thick, ' , image: 'https://i.redd.it/7qc9tylekf031.gif' },
    { name: 'water',   price: 4, description: 'transparent, glossy, runny' , image: 'https://i.pinimg.com/originals/02/b9/cf/02b9cf768d6a7910d368924b29a8aea8.gif' },
]

const sizes = [
    { name: 'S',    qty: '4oz'  , price_mult: 1.0},
    { name: 'M',    qty: '6oz'  , price_mult: 1.2},
    { name: 'L',    qty: '8oz'  , price_mult: 1.7},
    { name: 'XL',   qty: '12oz' , price_mult: 2.0}
]

const colors = [
    { name: 'white/clear',     hex: '#f3f3f3', price: 0 },
    { name: 'ink',             hex: '#000000', price: 0 },
    { name: 'chocolate',       hex: '#6F4E37', price: 0 },
    { name: 'red',             hex: '#a50815', price: 0 },
    { name: 'citrus',          hex: '#FF9500', price: 0 },
    { name: 'honey',           hex: '#e79f31', price: 0 },
    { name: 'dandelion',       hex: '#ffd900', price: 0 },
    { name: 'mint',            hex: '#98FF98', price: 0 },
    { name: 'emerald',         hex: '#0a6629', price: 0 },
    { name: 'electric green',  hex: '#39FF14', price: 0 },
    { name: 'teal',            hex: '#15b6b6', price: 0 },
    { name: 'turquoise',       hex: '#1ea1dd', price: 0 },
    { name: 'sky blue',        hex: '#9fd1e6', price: 0 },
    { name: 'midnight blue',   hex: '#03113d', price: 0 },
    { name: 'lavender',        hex: '#B19CD9', price: 0 },
    { name: 'ultraviolet',     hex: '#530196', price: 0 },
    { name: 'magenta',         hex: '#f717d9', price: 0 },
    { name: 'blush',           hex: '#eb95b5', price: 0 },
]

const toppings = [
    { name: 'none',                 price: 0   , image: 'https://www.clker.com/cliparts/d/U/D/9/Z/u/grey-prohibited-symbol-md.png'},
    { name: 'strawberries',         price: 1.00, image: 'https://i.etsystatic.com/28750123/r/il/d8b819/6171737227/il_1140xN.6171737227_ac3a.jpg' }, // https://www.etsy.com/listing/1747391736/strawberry-feilds-polymer-clay-sprinkles
    { name: 'candy',                price: 1.00, image: 'https://i.etsystatic.com/9729164/r/il/ed39f6/1670091395/il_1140xN.1670091395_etrd.jpg' }, // https://www.etsy.com/listing/630677844/candy-land-mix-bright-polymer-clay-fake
    { name: 'clouds',               price: 1.00, image: 'https://i.etsystatic.com/33380461/r/il/f83167/6543949178/il_1140xN.6543949178_ncoa.jpg' }, // https://www.etsy.com/listing/1853629155/10g30g50g-white-cloud-polymer-clay
    { name: 'black cats',           price: 1.00, image: 'https://i.etsystatic.com/37064527/r/il/50e08b/7151714458/il_1140xN.7151714458_9n0p.jpg' }, // https://www.etsy.com/listing/4360183004/black-cat-polymer-clay-sprinkles-kawaii
    { name: 'orange slices',        price: 1.00, image: 'https://i.etsystatic.com/20072383/r/il/6d4e90/3885037619/il_794xN.3885037619_j3le.jpg' }, // https://www.etsy.com/listing/1005961076/10grams-2010mm-orange-brightly-colored
    { name: 'rubber ducks',         price: 1.00, image: 'https://i.etsystatic.com/11196208/r/il/11fedc/6008530860/il_1140xN.6008530860_39fj.jpg' },
    { name: 'pastel sprinkles',     price: 0.75, image: 'https://i.etsystatic.com/9729164/r/il/d78374/1555041961/il_1140xN.1555041961_e1kh.jpg' }, // https://www.etsy.com/listing/601481410/unicorn-dreams-pastel-polymer-clay-fake
    { name: 'rainbow jimmies',      price: 0.75, image: 'https://franscakeandcandy.com/cdn/shop/products/brithrainbowjimmies2.jpg?v=1589070501&width=1445' },
    { name: 'rainbow nonpareils',   price: 0.75, image: 'https://thumbs.dreamstime.com/b/non-pareils-sprinkles-13203273.jpg' },
    { name: 'confetti',             price: 0.75, image: 'https://m.media-amazon.com/images/I/71SVusjuu9S._SL1500_.jpg' },
    { name: 'pink sugar',           price: 0.75, image: 'https://www.qualitysprinkles.com/cdn/shop/products/QualitySprinklesShimmerPinkSugarCrystalsDairyFreeSprinklesCakeDecoration-1_192b1223-bef2-4194-8005-8442d0d51f53_1024x1024.jpg' },
    { name: 'blue sugar',           price: 0.75, image: 'https://m.media-amazon.com/images/I/91JxdSWjGwL.jpg' },
    { name: 'pearls',               price: 1.00, image: 'https://www.countrykitchensa.com/catalog/images/cd/cg-3460x.jpg' },
    { name: 'gold pearls',          price: 1.00, image: 'https://m.media-amazon.com/images/I/81+Y766CVUL._AC_UF894,1000_QL80_.jpg' },
    { name: 'peppermint',           price: 1.00, image: 'https://i.etsystatic.com/9729164/r/il/e0f9d7/1894636937/il_1140xN.1894636937_m21d.jpg' },
    { name: 'stars',                price: 1.00, image: 'https://i.etsystatic.com/63578749/r/il/80a4d7/7995340461/il_1140xN.7995340461_716v.jpg' },
    
]

const glitters = [
    { name: 'none',             price: 0   ,  image: 'https://www.clker.com/cliparts/d/U/D/9/Z/u/grey-prohibited-symbol-md.png'},
    { name: 'beetle',           price: 0.65,  image: 'https://i.etsystatic.com/15904004/r/il/d84f06/2834094584/il_1140xN.2834094584_13we.jpg'},
    { name: 'celestial',        price: 0.65,  image: 'https://i.etsystatic.com/9729164/r/il/a2f0f6/4416417852/il_1140xN.4416417852_4cda.jpg'},
    { name: 'love rush',        price: 0.65,  image: 'https://www.miniaturesweethk.com/cdn/shop/products/il_fullxfull.830678869_i3fh_grande.jpeg?v=1517647796'},
    { name: 'rainbow stars',    price: 0.65,  image: 'https://i.etsystatic.com/24848003/r/il/4f67d2/3745725279/il_1140xN.3745725279_cq6k.jpg'},
    { name: 'kawaii',           price: 0.65,  image: 'https://www.miniaturesweethk.com/cdn/shop/products/019_9ba401a9-67da-4d80-866e-118728dd6f09_1024x1024.jpg?v=1531578249'},
    { name: 'snowflakes',       price: 0.65,  image: 'https://i.etsystatic.com/17444910/r/il/e353f5/5568386875/il_1140xN.5568386875_kpe0.jpg'},
    { name: 'beach day',        price: 0.65,  image: 'https://i.etsystatic.com/26946479/r/il/864646/3916976735/il_1140xN.3916976735_pxkx.jpg'},
    { name: 'sparkles',         price: 0.65,  image: 'https://i.etsystatic.com/9729164/r/il/98057b/1798664755/il_1140xN.1798664755_ha0y.jpg'},
    { name: 'spooky',           price: 0.65,  image: 'https://i.etsystatic.com/9729164/r/il/445455/5309651586/il_1140xN.5309651586_bqq9.jpg'},
    { name: 'mystic',           price: 0.65,  image: 'https://i.etsystatic.com/22492780/r/il/144f9f/2485226641/il_794xN.2485226641_2pge.jpg'},
    { name: 'autumn',           price: 0.65,  image: 'https://i.etsystatic.com/21490056/r/il/bf9386/4062822673/il_1140xN.4062822673_mwt4.jpg'},
    { name: 'raindrops',        price: 0.65,  image: 'https://cdn11.bigcommerce.com/s-hjqrmebkj2/images/stencil/1280x1280/products/994/3319/IMG_1554__46536.1616535929.JPG?c=1?imbypass=on'},
    { name: 'daisies',          price: 0.65,  image: 'https://i.etsystatic.com/22492780/r/il/87dcad/3162915847/il_1140xN.3162915847_7p9s.jpg'},
    { name: 'dreamy',           price: 0.65 , image: 'https://i.pinimg.com/736x/1b/37/12/1b3712edc2a5787ec31598eea8f3920a.jpg'},
    { name: 'pastel goth',      price: 0.65 ,  image: 'https://i.etsystatic.com/9277941/r/il/65e723/1592366888/il_1140xN.1592366888_318d.jpg'},
    { name: 'butterflies',      price: 0.65 ,  image: 'https://cdn11.bigcommerce.com/s-hjqrmebkj2/images/stencil/1280x1280/products/1212/4054/IMG_2107__67183.1642693978.JPG?c=1?imbypass=on'},
    { name: 'holiday',          price: 0.65 ,  image: 'https://i.etsystatic.com/17265795/r/il/16189a/2729728089/il_1140xN.2729728089_t7aq.jpg'},
    { name: 'retro',            price: 0.65 ,  image: 'https://i.etsystatic.com/15904004/r/il/5a23ff/2782916484/il_1140xN.2782916484_gtmp.jpg'},
    { name: 'melon',            price: 0.65 ,  image: 'https://i.etsystatic.com/43997359/r/il/8e8ee9/6607985721/il_1140xN.6607985721_948k.jpg'},
    
]

const micas = [
    { name: 'none',                price: 0   ,     hex: ''},
    { name: 'olive gren',          price: 0.40,     hex: '#898a52'},
    { name: 'mocha',               price: 0.40,     hex: '#534245'},
    { name: 'baby pink',           price: 0.40,     hex: '#cda0d0'},
    { name: 'blush pink',          price: 0.40,     hex: '#b35b98'},
    { name: 'phthalo green',       price: 0.40,     hex: '#408282'},
    { name: 'deep sea',            price: 0.40,     hex: '#225262'},
    { name: 'peach',               price: 0.40,     hex: '#c37077'},
    { name: 'rose gold',           price: 0.40,     hex: '#a26978'},
    { name: 'choco brown',         price: 0.40,     hex: '#684f57'},
    { name: 'pink',                price: 0.40,     hex: '#ce5399'},
    { name: 'magenta',             price: 0.40,     hex: '#b01d93'},
    { name: 'cobalt blue',         price: 0.40,     hex: '#3a3fa7'},
    { name: 'zinc',                price: 0.40,     hex: '#2b8986'},
    { name: 'orange',              price: 0.40,     hex: '#c96762'},
    { name: 'red gold',            price: 0.40,     hex: '#90424f'},
    { name: 'grey',                price: 0.40,     hex: '#575370'},
    { name: 'maroon',              price: 0.40,     hex: '#842d51'},
    { name: 'purple',              price: 0.40,     hex: '#6e2cab'},
    { name: 'turquoise blue',      price: 0.40,     hex: '#2393d9'},
    { name: 'turquoise gold tint', price: 0.40,     hex: '#72bbb0'},
    { name: 'bright orange',       price: 0.40,     hex: '#e46720'},
    { name: 'copper',              price: 0.40,     hex: '#935a5d'},
    { name: 'dark black',          price: 0.40,     hex: '#2d2938'},
    { name: 'red light',           price: 0.40,     hex: '#c12957'},
    { name: 'light purple',        price: 0.40,     hex: '#9976af'},
    { name: 'blue',                price: 0.40,     hex: '#126bc5'},
    { name: 'sea green',           price: 0.40,     hex: '#7dab80'},
    { name: 'yellow',              price: 0.40,     hex: '#daab22'},
    { name: 'gold',                price: 0.40,     hex: '#c8945d'},
    { name: 'white',               price: 0.40,     hex: '#ebe6f5'},
    { name: 'red sparkle',         price: 0.40,     hex: '#a31d3d'},
    { name: 'violet night',        price: 0.40,     hex: '#352546'},
    { name: 'dark blue',           price: 0.40,     hex: '#2348a7'},
    { name: 'parrot',              price: 0.40,     hex: '#82b845'},
    { name: 'fresh green',         price: 0.40,     hex: '#82b845'}
]

const scents = [
    { name: 'none',         price: 0 },
    { name: 'strawberry',   price: 0 },
    { name: 'raspberry',    price: 0 },
    { name: 'cherry',       price: 0 },
    { name: 'kiwi',         price: 0 },
    { name: 'cotton candy', price: 0 },
    { name: 'lavender',     price: 0 },
    { name: 'rose',         price: 0 },
    { name: 'vanilla',      price: 0 },
    { name: 'root beer',    price: 0 },
    { name: 'lemonade',     price: 0 },
    { name: 'honey',        price: 0 },
    { name: 'citrus',       price: 0 },
    { name: 'mango',        price: 0 },
    { name: 'mint',         price: 0 },
    { name: 'forest',       price: 0 },
    { name: 'jasmine',      price: 0 },
]


export default {
    textures,
    sizes,
    colors,
    toppings,
    micas,
    glitters,
    scents,
}