const mongoose = require('mongoose');
const Product = require('./model/product');

const products = [
    {
        name:"MacBook Air Pro",
        img:"https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fEo5eXJQYUhYUlFZfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:90000,
        desc:"Apple MacBook Air 2020 is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i3 processor and it comes with 8GB of RAM. The Apple MacBook Air 2020 packs 256GB of SSD storage. Graphics are powered by Integrated Graphics Processor."
    },
    {
        name:"IPhone 12",
        img:"https://images.unsplash.com/photo-1620286517004-deaf02891df4?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM3fEo5eXJQYUhYUlFZfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:60000,
        desc:"Blast past fast. iPhone 12 now in purple. Buy now. Super Retina XDR display. Six colours. Ceramic Shield. A14 Bionic chip. Services: No-contact free delivery, EMI available, Shop with Specialists."
    },
    {
        name:"Apple Watch",
        img:"https://images.unsplash.com/photo-1486649961855-75838619c131?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXBwJTIwd2F0Y2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:40000,
        desc:"Apple Watch is a wearable smartwatch that allows users to accomplish a variety of tasks, including making phone calls, sending text messages and reading email. ... In addition to using a Bluetooth connection, the watch can also connect with an iPhone if it is on the same Wi-Fi network."
    },
    {
        name:"Google Mini",
        img:"https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z29vZ2xlJTIwbWluaXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:2500,
        desc:"Google's smart speaker just got smaller. ... The Home Mini is a voice-controlled speaker that can be used to play music, control smart home gadgets, answer trivia questions, add things to a shopping list, create calendar appointments, or play video on a Chromecast-enabled screen."
    },
    {
        name:"JBL Speaker",
        img:"https://images.unsplash.com/photo-1610560661462-f381a11970a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8amJsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:4500,
        desc:"JBL is an American company that manufactures audio equipment, including loudspeakers and headphones. ... JBL is owned by Harman International Industries, a subsidiary of Samsung Electronics.A speaker is a term used to describe the user who is giving vocal commands to a software program. ... A computer speaker is an output hardware device that connects to a computer to generate sound. "
    },
    {
        name:"HP Mouse",
        img:"https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bW91c2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:5999,
        desc:"Want to replace your mouse with a new feature-packed alternative which can manifold your productivity? Then checkout HP KY619AA 3 Button Optical Wired Mouse. The power packed wired mouse is designed with 2 buttons and a clickable scroll wheel, which lets you function flawlessly. On the other hand, you can experience accurate results with a super fast data transmission, leading to no delays in displaying results on the screen. It is a durable mouse with textured sides for a better control and also has a rubber scroll for a firm grip. As a result, you can browse with optimum comfort with HP 3 button control mouse."
    },
    {
        name:"Gaming PC",
        img:"https://images.unsplash.com/photo-1619455052599-4cded9ae462a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGdhbWluZyUyMHBjfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:150000,
        desc:"Gaming computers are specialized personal computers designed for playing video games. Gaming computers typically differ from mainstream computers by using high-performance video cards and high core-count central processing units with raw performance.A high-end Windows PC that is suited for gaming. Although available ready built, gaming PCs are often custom made for the serious enthusiast. "
    },
    {
        name:"Apple Keyboard",
        img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a2V5Ym9hcmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:7000,
        desc:"Magic Keyboard combines a sleek design with a built-in rechargeable battery and enhanced key features. With a stable scissor mechanism beneath each key, as well as optimized key travel and a low profile, Magic Keyboard provides a remarkably comfortable and precise typing experience."
    }
]

const seedDB = async()=>{
    await Product.insertMany(products);
    console.log('DB Seeded');
}

module.exports = seedDB;