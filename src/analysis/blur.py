# Source:
# https://www.pyimagesearch.com/2015/09/07/blur-detection-with-opencv/

import cv2


def get_blurriness(image):
    # compute the Laplacian of the image and then return the focus
    # measure, which is simply the variance of the Laplacian
    return cv2.Laplacian(image, cv2.CV_64F).var()
