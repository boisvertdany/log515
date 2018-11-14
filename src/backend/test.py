import sys
import os

appPath = os.path.abspath(os.path.dirname(os.path.realpath(__file__)) + "/../..")
sys.path.append(appPath)

from src.analysis.choose import choose_photos
from src.analysis.choose import Warmth

sauce = choose_photos(appPath + "/res", 5, Warmth.COLD, True)

print(sauce)

for val in sauce:
    print(val)
