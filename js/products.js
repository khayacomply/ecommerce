/* === PRODUCT DATABASE ===
   All 36 products with categories, prices, and details
*/

const products = [
    // 1. PERSONAL MOBILITY
    {id:1,name:"Graffiti Hoverboard 6.5\"",category:"mobility",price:2499,sku:"HB-GRAF-001",image:"images/products/hoverboard-graffiti.jpg",description:"Stylish hoverboard with LED lights, Bluetooth speakers, self-balancing tech, 300W motor, 7.5 mph speed, 6-8 mile range. UL2272 certified.",colors:["Graffiti","Black","White","Blue","Pink","Camo","Chrome","Red"],stock:true},
    {id:2,name:"Handlebar Hoverboard 8\"",category:"mobility",price:3299,sku:"HB-HAND-002",image:"images/products/hoverboard-handlebar.jpg",description:"Self-balancing hoverboard with adjustable handlebar, 8\" wheels for rough terrain, LED lights, Bluetooth, 400W motor, 9 mph speed, 7-10 mile range. 265 lbs capacity.",colors:["Black","White","Red","Blue","Green"],stock:true},
    {id:3,name:"Gotrax GXL V2 Electric Scooter",category:"mobility",price:5999,sku:"ES-GOT-003",image:"images/products/gotrax-scooter.jpg",description:"Compact commuter scooter, 250W motor, 15.5 mph top speed, 12-mile range, 5.2Ah battery, foldable design, LED display, pneumatic tires. 220 lbs capacity.",colors:["Black/Blue","Black/Red","Gray","Green","Pink"],stock:true},
    {id:4,name:"Jackson Quad Roller Skates",category:"mobility",price:1899,sku:"RS-JACK-004",image:"images/products/jackson-skates.jpg",description:"Classic quad skates with leather boots, aluminum chassis, 58mm PU wheels, ABEC-5 bearings. High-ankle support for indoor/outdoor use. Sizes 5-12.",colors:["Black","White","Pink","Blue"],stock:true},
    
    // 2. SEWING MACHINES
    {id:5,name:"JOCKY JK200-01 Industrial Sewing Machine",category:"sewing",price:8999,sku:"SM-JOCK-005",image:"images/products/jocky-sewing.jpg",description:"Industrial straight-stitch machine, 5500 SPM, digital display, auto thread cutter, LED light. For heavy fabrics like denim/leather. Low noise, energy efficient.",colors:["White/Blue","Gray"],stock:true},
    {id:6,name:"Brother PR655 Embroidery Machine",category:"sewing",price:15999,sku:"EM-BRO-006",image:"images/products/brother-embroidery.jpg",description:"6-needle embroidery machine, 4x4\" hoop, touchscreen, USB connectivity, 1000 SPM. Perfect for caps, shirts, towels. Includes thread and software.",colors:["White","Silver"],stock:true},
    
    // 3. POWER BANKS
    {id:7,name:"Mini Power Bank 5000mAh",category:"powerbank",price:299,sku:"PB-MINI-007",image:"images/products/mini-powerbank.jpg",description:"Ultra-compact with LED display, USB-C fast charging, pocket-sized for phones and earbuds.",colors:["Black","Silver","White","Blue"],stock:true},
    {id:8,name:"66W Fast Charge Power Bank 20000mAh",category:"powerbank",price:899,sku:"PB-66W-008",image:"images/products/powerbank-66w.jpg",description:"High-speed charging, 66W PD output, digital display, USB-A/C ports. Supports laptops and phones.",colors:["Black","White"],stock:true},
    {id:9,name:"120W Power Bank 30000mAh",category:"powerbank",price:1499,sku:"PB-120W-009",image:"images/products/powerbank-120w.jpg",description:"High-capacity with 120W output, LED screen, full protocol fast charging for phones, tablets, laptops.",colors:["Black","White"],stock:true},
    {id:10,name:"Solar Belt Power Bank 10000mAh",category:"powerbank",price:599,sku:"PB-SOLB-010",image:"images/products/solar-belt.jpg",description:"Wearable solar charger with belt strap, solar panel recharging, USB ports. Ideal for hiking.",colors:["Black/Yellow","Green"],stock:true},
    {id:11,name:"Rugged Solar Power Bank 20000mAh",category:"powerbank",price:799,sku:"PB-SOLR-011",image:"images/products/solar-rugged.jpg",description:"Waterproof, shockproof, wireless charging, built-in cables, LED flashlight.",colors:["Orange","Black","Green"],stock:true},
    {id:12,name:"Solar Power Bank 50000mAh",category:"powerbank",price:1199,sku:"PB-SOL5-012",image:"images/products/solar-50000.jpg",description:"Large capacity, 4 USB outputs, IP66 waterproof, LED flashlight, fast charging. Perfect for camping.",colors:["Red","Black","Blue"],stock:true},
    {id:13,name:"All-in-One Charging Kit",category:"powerbank",price:349,sku:"CK-ALLI-013",image:"images/products/charging-kit.jpg",description:"Portable case with USB-C, Lightning, Micro-USB cables, SIM adapters, phone stand. Universal compatibility.",colors:["Black","White"],stock:true},
    {id:14,name:"3-in-1 Lay-Flat Wireless Charger",category:"powerbank",price:699,sku:"WC-FLAT-014",image:"images/products/wireless-charger-flat.jpg",description:"Charges phone, watch, and earbuds simultaneously. Intelligent current matching, flat desk design.",colors:["Black","White"],stock:true},
    {id:15,name:"3-in-1 Foldable Wireless Charger",category:"powerbank",price:899,sku:"WC-FOLD-015",image:"images/products/wireless-charger-fold.jpg",description:"Foldable stand for phone, watch, earbuds. MagSafe compatible, travel-friendly.",colors:["White","Black"],stock:true},
    
    // 4. POWER STATIONS
    {id:16,name:"Compact Power Station 300W/200Wh",category:"powerstation",price:3999,sku:"PS-300W-016",image:"images/products/powerstation-300w.jpg",description:"LCD display, multiple USB ports, DC output, AC socket. For laptops and small appliances.",colors:["Gray","Black"],stock:true},
    {id:17,name:"Multi-Outlet Power Station 500W",category:"powerstation",price:6999,sku:"PS-500W-017",image:"images/products/powerstation-500w.jpg",description:"AC outlets, USB, DC, car port, LCD screen, expandable battery. For camping/emergencies.",colors:["Gray","Black"],stock:true},
    {id:18,name:"VTOMAN Jump 600 Power Station",category:"powerstation",price:8999,sku:"PS-VTOM-018",image:"images/products/vtoman-powerstation.jpg",description:"Expandable 600W, LiFePO4 battery, AC outlets, USB, solar input. Stackable design.",colors:["Black/Yellow","Gray"],stock:true},
    
    // 5. SPEAKERS (JBL)
    {id:19,name:"JBL Go Essential",category:"speakers",price:599,sku:"SP-JBLE-019",image:"images/products/jbl-go-essential.jpg",description:"Waterproof Bluetooth speaker, 5-hour battery, 3.1W output, compact for outdoor use.",colors:["Black","Red","Blue"],stock:true},
    {id:20,name:"JBL Boombox 3",category:"speakers",price:7999,sku:"SP-JBLB-020",image:"images/products/jbl-boombox.jpg",description:"40W output, 24-hour battery, IPX7 waterproof, handle, deep bass, party mode.",colors:["Black","Camo"],stock:true},
    {id:21,name:"JBL Partybox 310",category:"speakers",price:9999,sku:"SP-JBLP-021",image:"images/products/jbl-partybox.jpg",description:"250W output, LED lights, DJ controls, mic input, 12-hour battery. For events/karaoke.",colors:["Black"],stock:true},
    {id:22,name:"JBL Go 4",category:"speakers",price:799,sku:"SP-JBL4-022",image:"images/products/jbl-go4.jpg",description:"Ultra-portable, 7-hour battery, IP67 waterproof/dustproof, bold sound.",colors:["Black","Red","Blue","Camo"],stock:true},
    
    // 6. ADULT TOYS
    {id:23,name:"Rose Vibrator with Thrusting Dildo",category:"adult",price:899,sku:"AT-ROSE-023",image:"images/products/rose-vibrator-dildo.jpg",description:"Silicone rose clitoral suction vibrator with thrusting dildo, 10 modes, waterproof, USB rechargeable.",colors:["Pink","Red","Purple"],stock:true},
    {id:24,name:"Finger Sleeve Vibrator",category:"adult",price:299,sku:"AT-FING-024",image:"images/products/finger-vibrator.jpg",description:"Silicone finger vibrator with bullet motor, 10 speeds, waterproof, battery-powered.",colors:["Pink","Purple"],stock:true},
    {id:25,name:"Purple Rose Clitoral Sucker",category:"adult",price:599,sku:"AT-ROSP-025",image:"images/products/rose-vibrator-purple.jpg",description:"Compact rose-shaped air pulse technology, 10 modes, waterproof, rechargeable, discreet.",colors:["Purple","Pink","Red"],stock:true},
    
    // 7. CAR ACCESSORIES
    {id:26,name:"Multi-Function Jump Starter 2000A",category:"car",price:1899,sku:"CA-JUMP-026",image:"images/products/jump-starter.jpg",description:"Portable jump starter with air compressor, tire inflator, LED light, USB ports. For 8L gas engines.",colors:["Blue","Gray"],stock:true},
    {id:27,name:"Hoco E62 FM Transmitter",category:"car",price:399,sku:"CA-HOCO-027",image:"images/products/hoco-fm-transmitter.jpg",description:"Bluetooth FM transmitter, QC3.0 charging, LED display, hands-free calling, SD/USB music playback.",colors:["Black"],stock:true},
    
    // 8. OFFICE SUPPLIES
    {id:28,name:"A4 Paper 80gsm (500 sheets)",category:"office",price:89,sku:"OS-A4PA-028",image:"images/products/a4-paper-typek.jpg",description:"Premium white A4 paper for printers/copiers. Jam-free, high whiteness. Brands: Typek, Rotatrim, Double A.",colors:["White"],stock:true},
    {id:29,name:"CARL RT-200 Rotary Paper Cutter",category:"office",price:599,sku:"OS-CARL-029",image:"images/products/carl-cutter.jpg",description:"18-inch rotary trimmer, grid alignment, replaceable blade. Cuts up to 10 sheets.",colors:["Black","Silver"],stock:true},
    
    // 9. OTHER PRODUCTS
    {id:30,name:"Z6 Mini Android TV Box",category:"other",price:899,sku:"OT-ANDR-030",image:"images/products/android-tv-box.jpg",description:"Android TV box with Google Assistant, 4K streaming, remote, Netflix/YouTube support.",colors:["Black"],stock:true},
    {id:31,name:"7-Drawer Rolling Tool Cabinet",category:"other",price:3499,sku:"OT-TOOL-031",image:"images/products/tool-cabinet.jpg",description:"Rolling cabinet with lock, blue accents, includes tool set (wrenches, screwdrivers). For garage/workshop.",colors:["Gray/Blue","Red"],stock:true},
    {id:32,name:"34\" Curved Gaming Monitor",category:"other",price:7999,sku:"OT-MONI-032",image:"images/products/gaming-monitor.jpg",description:"Ultrawide 144Hz, WQHD resolution, HDR support. Perfect for gaming and productivity.",colors:["Black"],stock:true},
    {id:33,name:"Adjustable Dumbbell Set 20kg",category:"other",price:1299,sku:"OT-DUMB-033",image:"images/products/dumbbell-set.jpg",description:"Cast iron set with bars, plates, and case. Adjustable for home workouts.",colors:["Black"],stock:true},
    {id:34,name:"Solar Livestock GPS Tracker",category:"other",price:1599,sku:"OT-GPS-034",image:"images/products/gps-tracker.jpg",description:"Solar-powered GPS for cattle, 16500mAh battery, real-time location, app integration.",colors:["Black"],stock:true},
    
    // 10. CHARCOAL PRODUCTS (NEW)
    {id:35,name:"Amaren Blue Mix Coconut Charcoal Cubes 250g",category:"charcoal",price:40,sku:"CH-AMR-250",image:"images/products/charcoal-250g.jpg",description:"Premium coconut charcoal cubes for hookah/shisha. Blue Mix variant, 250g pack. Long-lasting burn, minimal ash, excellent heat retention.",colors:["Blue Mix"],stock:true},
    {id:36,name:"Amaren Blue Mix Coconut Charcoal Cubes 1kg",category:"charcoal",price:100,sku:"CH-AMR-1KG",image:"images/products/charcoal-1kg.jpg",description:"Premium coconut charcoal cubes for hookah/shisha. Blue Mix variant, 1kg bulk pack. Long-lasting burn, minimal ash, excellent heat retention. Best value.",colors:["Blue Mix"],stock:true}
];

// Categories for filter buttons
const categories = [
    {id: 'all', name: 'All Products', icon: 'bi-grid-3x3-gap'},
    {id: 'mobility', name: 'Personal Mobility', icon: 'bi-bicycle'},
    {id: 'sewing', name: 'Sewing Machines', icon: 'bi-scissors'},
    {id: 'powerbank', name: 'Power Banks', icon: 'bi-battery-charging'},
    {id: 'powerstation', name: 'Power Stations', icon: 'bi-plug'},
    {id: 'speakers', name: 'Speakers', icon: 'bi-speaker'},
    {id: 'adult', name: 'Adult Toys', icon: 'bi-heart'},
    {id: 'car', name: 'Car Accessories', icon: 'bi-car-front'},
    {id: 'office', name: 'Office Supplies', icon: 'bi-folder'},
    {id: 'other', name: 'Other Products', icon: 'bi-box'},
    {id: 'charcoal', name: 'Charcoal Products', icon: 'bi-fire'}
];