---
draft: false
date: 2020-09-08T09:37:27+01:00
title: The Easiest Way To Generate Fancy Avatars In Python
description: This is a really short article, where I will show you how to generate cool avatars from a given string (email, username...) or from your logo using python.
slug: fancy-avatars-in-python 
tags: python
cover: avatars-logo-mine.png
---


This is a really short article, where I will show you how to generate cool avatars from a given string (email, username...) or from your logo using python.

The idea for this article came to mind while I was working on a project where I have to set a default avatar for each user from the backend, because I was dealing with a backend feeding two frontends, and maybe more in the future. 

So, if you're dealing with a single frontend, you would better consider doing it from the frontend, because it's a lot easier.

Before I start, I want to mention that the professional way to do it, is by not generating the avatar, but instead using static images for default avatars, because It's quicker, simpler, less error-prone, more future-proof, and ultimately looks better than generating them programmatically.

But, if you want to be really fancy like Google and have random colored circles and initials, you’re in the right place 😎

Let’s get started!

# Avatars using initials

```python
# BUILT-IN
import re
import random

# PIP
from cairosvg import svg2png
from xml.sax.saxutils import escape as xml_escape

COLORS = [
    ['#DF7FD7', '#DF7FD7', '#591854'],
    ['#E3CAC8', '#DF8A82', '#5E3A37'],
    ['#E6845E', '#E05118', '#61230B'],
    ['#E0B050', '#E6CB97', '#614C23'],
    ['#9878AD', '#492661', '#C59BE0'],
    ['#787BAD', '#141961', '#9B9FE0'],
    ['#78A2AD', '#104F61', '#9BD1E0'],
    ['#78AD8A', '#0A6129', '#9BE0B3'],
]

INITIALS_SVG_TEMPLATE = """
<svg xmlns="http://www.w3.org/2000/svg" 
    pointer-events="none" 
    width="200" height="200">
  <defs>
    <linearGradient id="grad">
    <stop offset="0%" stop-color="{color1}" />
    <stop offset="100%" stop-color="{color2}" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="0" ry="0" fill="url(#grad)"></rect>
  <text text-anchor="middle" y="50%" x="50%" dy="0.35em"
        pointer-events="auto" fill="{text_color}" font-family="sans-serif"
        style="font-weight: 400; font-size: 80px">{text}</text>
</svg>
""".strip()
INITIALS_SVG_TEMPLATE = re.sub('(\s+|\n)', ' ', INITIALS_SVG_TEMPLATE)

def get_png_avatar(text, output_file):

    initials = ':)'

    text = text.strip()
    if text:
        split_text = text.split(' ')
        if len(split_text) > 1:
            initials = split_text[0][0] + split_text[-1][0]
        else:
            initials = split_text[0][0]

    random_color = random.choice(COLORS)
    svg_avatar = INITIALS_SVG_TEMPLATE.format(**{
        'color1': random_color[0],
        'color2': random_color[1],
        'text_color': random_color[2],
        'text': xml_escape(initials.upper()),
    }).replace('\n', '')

    svg2png(svg_avatar, write_to=output_file)
```

What I did here is that I take a pre-prepared SVG template, I fill it with the initials, and background color, and that is it!!

Let's test it, 

```python
import random
import string
from io import BytesIO
from PIL import Image

from default_avatars import get_png_avatar

rawIO = BytesIO()
get_png_avatar('AymaneMx', rawIO)
byteImg = Image.open(rawIO)
filename = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
byteImg.save(filename + '.png', 'PNG')
```

Run, and the result will be a PNG image like this:

![avatars initials a](https://miro.medium.com/max/700/1*qaJFwAs4AZMKjQBlUyHtUQ.png)

![coool gif](https://miro.medium.com/max/426/1*X4foLqSQYCyPo_vE4xDJGg.gif)

While playing with the SVG template, I discovered that I can make an icon or a logo instead of a text, which brings us to the next part.

# Avatars using your Logo

To use your logo, you need only to change the `text` tag in the previous SVG template with a tag of your logo.

For example, I will use the Twitter logo, I downloaded the SVG version from [Twitter Brand Resources](https://about.twitter.com/en_us/company/brand-resources.html).

After opening it with any editor you will see:

```xml
<svg xmlns="http://www.w3.org/2000/svg" id="Logo_FIXED" data-name="Logo — FIXED" viewBox="0 0 400 400">
    <defs>
        <style>.cls-1{fill:none;}.cls-2{fill:#1da1f2;}</style>
    </defs>
    <title>Twitter_Logo_Blue</title>
    <rect class="cls-1" width="400" height="400"/>
    <path class="cls-2"
          d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/>
</svg>
```

As you may notice, the `path` tag is the one responsible for the logo/icon.

Let's copy that in our SVG template, group it in a `g` tag, and add `fill` argument so we can change the color,

```python
LOGO_SVG_TEMPLATE = """
<svg xmlns="http://www.w3.org/2000/svg" width="400px" height="400px" viewBox="0 0 400 400">
    <rect class="cls-1" width="400" height="400" fill="{color1}" />
    <g width="400px" height="400px">
        <path 
            fill="{logo_color}" 
            d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"
        />
    </g>
    
</svg>
""".strip()
LOGO_SVG_TEMPLATE = re.sub('(\s+|\n)', ' ', LOGO_SVG_TEMPLATE)

def get_png_avatar_from_logo(output_file):

    random_color = random.choice(COLORS)

    svg_avatar = LOGO_SVG_TEMPLATE.format(**{
        'color1': random_color[0],
        'logo_color': random_color[2],
    }).replace('\n', '')

    svg2png(svg_avatar, write_to=output_file)
```

Let's test, 

```python
rawIO = BytesIO()
filename = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
get_png_avatar_from_logo(rawIO)
byteImg = Image.open(rawIO)
byteImg.save(filename + '.png', 'PNG')
```

The result will be something like this:

![avatars logo twitter](https://miro.medium.com/max/700/1*r3OQH63muulNGYGZE7q2PQ.png)

> Now, you are maybe wondering how can I get a SVG file of my logo?

The answer is you can ask your designer gently for it, or you can do it yourself, using Photoshop/Illustrator by exporting your logo as an SVG file.

But the simple way, (which is why you're here) is by using an online tool as [online-convert](https://image.online-convert.com/convert-to-svg), I use it for my shitty logo, and here is the result.

![avatars logo aymaneMx](https://miro.medium.com/max/700/1*O2HAKqluGJlu-S5V0ycvZA.png)

Isn’t so fancy!!

# That's it!

Here you can check out the code, you will find also its Django integration. 

:point_right: https://github.com/aymaneMx/default-avatars
