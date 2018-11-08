from enum import Enum


def is_portrait_oriented(shape):
    return shape[0] < shape[1]


class SupportedFormat(Enum):  # In inches
    _8x10 = 8, 10
    _5x7 = 7, 5


def closest_supported_format(shape):
    return SupportedFormat._8x10 if is_portrait_oriented(shape) else SupportedFormat._5x7


def pixel_dimension(dimension, dpi):
    width, height = dimension
    return int(width * dpi), int(height * dpi)


def automatic_crop(image, dpi):
    original_width, original_height = image.size
    original_ratio = original_width / original_height

    format = closest_supported_format(image.size)
    crop_width, crop_height = format.value
    crop_ratio = crop_width / crop_height

    crop_vertically = original_ratio > crop_ratio
    left = original_width - (original_height * crop_ratio) if crop_vertically else 0
    right = original_width - left
    top = original_height - (original_width * crop_ratio) if not crop_vertically else 0
    bottom = original_height - top

    cropped = image.crop((left, top, right, bottom))
    resized = cropped.resize(pixel_dimension(format.value, dpi))

    return format, resized
