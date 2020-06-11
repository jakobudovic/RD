#!/usr/bin/env python3 NeoPixel library strandtest example Author: Tony DiCola
#
# Direct port of the Arduino NeoPixel library strandtest example.  Showcases
# various animations on a strip of NeoPixels.

import time
from neopixel import *
import argparse
# import sys
# import argparse

# print(str(sys.argv))
# print(str(sys.argv[1]))
# print(sys.argv[1])

# LED strip configuration:
LED_COUNT = 300      # Number of LED pixels.
LED_PIN = 18      # GPIO pin connected to the pixels (18 uses PWM!).
# LED_PIN        = 10      # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 200     # Set to 0 for darkest and 255 for brightest
# True to invert the signal (when using NPN transistor level shift)
LED_INVERT = False
LED_CHANNEL = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53


# Define functions which animate LEDs in various ways.
def colorWipe(strip, color, wait_ms=50):
    """Wipe color across display a pixel at a time."""
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, color)
        strip.show()
        time.sleep(wait_ms/1000.0)


def theaterChase(strip, color, wait_ms=50, iterations=10):
    """Movie theater light style chaser animation."""
    for j in range(iterations):
        for q in range(3):
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i+q, color)
            strip.show()
            time.sleep(wait_ms/1000.0)
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i+q, 0)


def wheel(pos):
    """Generate rainbow colors across 0-255 positions."""
    if pos < 85:
        return Color(pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return Color(255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return Color(0, pos * 3, 255 - pos * 3)


def rainbow(strip, wait_ms=20, iterations=1):
    """Draw rainbow that fades across all pixels at once."""
    for j in range(256*iterations):
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, wheel((i+j) & 255))
        strip.show()
        time.sleep(wait_ms/1000.0)


def rainbowCycle(strip, wait_ms=20, iterations=5):
    """Draw rainbow that uniformly distributes itself across all pixels."""
    for j in range(256*iterations):
        for i in range(strip.numPixels()):
            strip.setPixelColor(
                i, wheel((int(i * 256 / strip.numPixels()) + j) & 255))
        strip.show()
        time.sleep(wait_ms/1000.0)


def rainbowCycleFaster(strip, wait_ms=20, iterations=5):
    """Draw rainbow that uniformly distributes itself across all pixels."""
    for j in range(256*iterations):
        for i in range(strip.numPixels()/2):
            strip.setPixelColor(
                i, wheel((int(i * 256 / strip.numPixels()) + j) & 255))
        for i in range(strip.numPixels()/2):
            t = strip.numPixels()/2
            strip.setPixelColor(
                i+t, wheel((int((i+t) * 256 / strip.numPixels()) + j) & 255))
        strip.show()
        time.sleep(wait_ms/10000.0)


def theaterChaseRainbow(strip, wait_ms=50):
    """Rainbow movie theater light style chaser animation."""
    for j in range(256):
        for q in range(3):
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i+q, wheel((i+j) % 255))
            strip.show()
            time.sleep(wait_ms/1000.0)
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i+q, 0)


def night(strip, num):
    """
    rgb(252,238,167) - warm white
    rgb(246,205,139) - warm brownish white
    """
    c1 = Color(252, 238, 167)
    c2 = Color(246, 205, 139)

    if num == 1:
        color = c1
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, color)
            strip.setPixelColor(i+1, Color(0, 255, 0))
            strip.setPixelColor(i+2, Color(0, 255, 0))
            strip.show()
            time.sleep(10/1000.0)

    else:
        color = c2
        for i in reversed(range(strip.numPixels())):
            strip.setPixelColor(i, color)
            strip.setPixelColor(i-1, Color(255, 0, 0))
            strip.setPixelColor(i-2, Color(255, 0, 0))
            strip.show()
            time.sleep(10/1000.0)


def chase(c):
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, c)     # Draw new pixel
        strip.setPixelColor(i-4, 0)  # Erase pixel a few steps back
        strip.show()
        time.sleep(10/1000.0)


def setColor(c):
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, c)
        strip.show()


# Main program logic follows:
if __name__ == '__main__':
    # Process arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--clear', action='store_true',
                        help='clear the display on exit')
    args = parser.parse_args()

    # Create NeoPixel object with appropriate configuration.
    strip = Adafruit_NeoPixel(
        LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    # Intialize the library (must be called once before other functions).
    strip.begin()

    print('Press Ctrl-C to quit.')
    if not args.clear:
        print('Use "-c" argument to clear LEDs on exit')

    try:

        while True:
            """
            # print ('Color wipe animations.')
            # colorWipe(strip, Color(255, 0, 0))  # Red wipe
            # colorWipe(strip, Color(0, 255, 0))  # Blue wipe
            # colorWipe(strip, Color(0, 0, 255))  # Green wipe
            print ('Theater chase animations.')
            theaterChase(strip, Color(127, 127, 127))  # White theater chase
            theaterChase(strip, Color(127,   0,   0))  # Red theater chase
            theaterChase(strip, Color(  0,   0, 127))  # Blue theater chase
            """
            # print('rainbow()')
            # rainbow(strip)
            print('rainbowCycle()')
            # rainbowCycle(strip)
            # rainbowCycleFaster(strip, wait_ms=2)

            rainbowCycleFaster(strip, wait_ms=100)
            # setColor(Color(170, 69, 14))

            # chase(Color(255, 0, 0))     #  Red
            # chase(Color(0, 255, 0))     #  Green
            # chase(Color(0, 0, 255))     #  Blue
            # theaterChaseRainbow(strip)
            # print("nigt")
            # night(strip, 1)
            # night(strip, 2)

    except KeyboardInterrupt:
        if args.clear:
            colorWipe(strip, Color(0, 0, 0), 10)
