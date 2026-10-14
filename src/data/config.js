/* ------------------------------------------------------------------
   ✏️  EDIT EVERYTHING ABOUT THE GIFT HERE
   All the names, photos, diary pages and the letter live in this file.
   Photos: drop your images into /public/images and point to them as
   "/images/your-file.jpg"  (or paste any image URL).
------------------------------------------------------------------- */

const config = {
    // Her name – typed out letter by letter in the hero section
    herName: 'My Love',
  
    // Your name – signs the letter and the ending
    fromName: 'Your Name',
  
    // Hero background image. Paste a link or use "/images/hero.jpg".
    // Leave '' to use the dreamy gradient instead.
    heroImage: '',
  
    // Optional background music (put an mp3 in /public and use "/music.mp3").
    // Leave '' to hide the music button.
    music: '',
  
    /* ---------------- The diary (Memory section) ----------------
       Add as many memories as you like (5+ recommended).
       Each one becomes a photo page + a handwritten page. */
    diary: {
      title: 'Our Little Diary',
      dedication:
        'For the girl who turned my ordinary days into my favourite stories. Every page is for you.',
    },
    memories: [
      {
        date: 'The day we met',
        title: 'Where it all began',
        image: '/images/memory-1.svg',
        text: 'I did not know it yet, but my whole world was about to change. One smile from you and I was already a little bit yours.',
      },
      {
        date: 'Our first date',
        title: 'Butterflies',
        image: '/images/memory-2.svg',
        text: 'I was so nervous I forgot what I wanted to say. You laughed, and suddenly everything felt easy and right.',
      },
      {
        date: 'A random Tuesday',
        title: 'Ordinary magic',
        image: '/images/memory-3.svg',
        text: 'Nothing special happened, and it was perfect. That is the thing about you: even quiet days feel like a celebration.',
      },
      {
        date: 'Our favourite trip',
        title: 'Lost together',
        image: '/images/memory-4.svg',
        text: 'We got lost, got tired, got hungry, and I still would not trade that day for anything. Home is wherever you are.',
      },
      {
        date: 'When you were there',
        title: 'My safe place',
        image: '/images/memory-5.svg',
        text: 'On the hard days you held my hand and never let go. Thank you for loving me the way you do.',
      },
      {
        date: 'Today & always',
        title: 'Still choosing you',
        image: '/images/memory-6.svg',
        text: 'Miles apart, and my heart still knows exactly where to find you. I would choose you in every city, every lifetime.',
      },
    ],
  
    /* ---------------- The love letter ---------------- */
    letter: {
      greeting: 'My dearest love,',
      paragraphs: [
        'Happy birthday, my love. I wish more than anything that I could be standing next to you right now, holding your hand and watching you blow out your candles. Distance took away my arms for today, but it could never take away my heart.',
        'So I built you this little world, one made of the things I love most: your smile, our memories, and every tiny moment that made me fall deeper for you.',
        'Thank you for being patient with me, for believing in me, and for being the kindest, most beautiful soul I know. You make me want to be better every single day.',
        'I hope today wraps you in all the love you give so freely to everyone else. You deserve the whole sky, and I am going to spend my life trying to give it to you.',
      ],
      closing: 'Forever and always yours,',
      // signature uses fromName
    },
  
    /* ---------------- The cake ---------------- */
    candles: 5, // number of candles (1 – 7)
    wishMessage:
      'Wish made. Whatever you wished for, I hope I get to be part of it. Happy birthday, my love! 🎂',
  
    // Shown at the very bottom
    footerNote: 'Made with all my love, just for you.',
  }
  
  export default config