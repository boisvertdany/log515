import os
import random

from PIL import Image, ImageDraw, ImageFont

from src.album.utils import automatic_crop, SupportedFormat, pixel_dimension
from src.analysis.choose import Warmth, choose_photos


def create_album(directory,
                 title="Album",
                 quantity=10,
                 get_specific_warmth=Warmth.WHATEVER,
                 get_sharpest_photo=False):
    dpi = 300
    background_size = (8.5, 11)
    background_color = (255, 255, 255, 255)

    photos_8x10 = []
    photos_5x7 = []
    for image_path in choose_photos(directory, quantity, get_specific_warmth, get_sharpest_photo):
        image = Image.open(image_path, 'r')
        aspect_ratio, cropped = automatic_crop(image, dpi)
        if aspect_ratio == SupportedFormat._8x10:
            photos_8x10.append(cropped)
        elif aspect_ratio == SupportedFormat._5x7:
            photos_5x7.append(cropped)
    
    page_dimension = pixel_dimension(background_size, dpi)
    pages = []
    for photo in photos_8x10:
        page = Image.new('RGB', page_dimension, background_color)
        offset = pixel_dimension((0.25, 0.5), dpi)
        page.paste(photo, offset)
        pages.append(page)

    for i in range(0, len(photos_5x7), 2):
        page = Image.new('RGB', page_dimension, background_color)
        photo1 = photos_5x7[i]

        left_offset = 225
        offset1 = (left_offset, 75)
        page.paste(photo1, offset1)
        if i + 1 < len(photos_5x7):
            photo2 = photos_5x7[i + 1]
            if photo2:
                offset2 = (left_offset, 1725)
                page.paste(photo2, offset2)
        pages.append(page)

    random.shuffle(pages)

    pages.pop().save("album.pdf", save_all=True, append_images=pages)


if __name__ == '__main__':
    create_album(os.path.abspath('../../res'),
        title="Vacance 2018",
        quantity=5,
        get_specific_warmth=Warmth.COLD,
        get_sharpest_photo=True)
